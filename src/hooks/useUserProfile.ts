import { useEffect, useState } from "react";
import { Profile } from "@/types";
import { type Firestore } from "firebase/firestore";

import { getDocument } from "@/lib/getDocument";

const useUserProfile = (
  firestore: Firestore,
  collection: string,
  uid: string
) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const profile = await getDocument({ firestore, collection, uid });
        const parse = Profile.parse(profile);
        setProfile(parse);
      } catch (error) {
        console.log("🚀 ~ getProfile ~ error:", error);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [firestore, collection, uid]);
  return { profile, loading };
};

export default useUserProfile;
