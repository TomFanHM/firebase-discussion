import React from "react"
import { useFirebaseDiscussion } from "@/context/firebase-discussion-context"

import {
  AppleOauthButton,
  FacebookOauthButton,
  GithubOauthButton,
  GoogleOauthButton,
  MicrosoftOauthButton,
  TwitterOauthButton,
} from "./oauth-buttons"

const LoginButtonGroup: React.FC = () => {
  const { auth, oauthOptions } = useFirebaseDiscussion()
  return (
    <div className="flex flex-wrap gap-2">
      {oauthOptions.apple && <AppleOauthButton auth={auth} />}
      {oauthOptions.facebook && <FacebookOauthButton auth={auth} />}
      {oauthOptions.github && <GithubOauthButton auth={auth} />}
      {oauthOptions.google && <GoogleOauthButton auth={auth} />}
      {oauthOptions.microsoft && <MicrosoftOauthButton auth={auth} />}
      {oauthOptions.twitter && <TwitterOauthButton auth={auth} />}
    </div>
  )
}
export default LoginButtonGroup
