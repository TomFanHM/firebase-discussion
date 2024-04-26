import { useEffect, useState } from "react"
import {
  doc,
  onSnapshot,
  type DocumentData,
  type Firestore,
} from "firebase/firestore"

type UseDocumentProps<T> = {
  firestore: Firestore
  collectionName: string
  docId: string
  parser: (el: DocumentData) => T
}

const useDocument = <T>({
  firestore,
  collectionName,
  docId,
  parser,
}: UseDocumentProps<T>) => {
  const [docData, setDocData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const documentRef = doc(firestore, collectionName, docId)

    const unsubscribe = onSnapshot(
      documentRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          try {
            const data = parser(docSnapshot.data() as DocumentData)
            setDocData(data)
            setLoading(false)
          } catch (error) {
            setError(error as Error)
            setLoading(false)
          }
        } else {
          setError(new Error("Document does not exist"))
          setLoading(false)
        }
      },
      (err) => {
        setError(err)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [firestore, collectionName, docId, parser])

  return { docData, loading, error }
}

export default useDocument
