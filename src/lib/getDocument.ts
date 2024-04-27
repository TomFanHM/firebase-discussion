import type { Firestore } from "firebase/firestore";
import { doc, DocumentData, getDoc } from "firebase/firestore";

type GetDocumentParams = {
  firestore: Firestore;
  collection: string;
  uid: string;
};

export async function getDocument({
  firestore,
  collection,
  uid,
}: GetDocumentParams): Promise<DocumentData | null> {
  try {
    const docRef = doc(firestore, collection, uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
  return null;
}
