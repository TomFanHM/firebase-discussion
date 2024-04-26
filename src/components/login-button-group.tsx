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
  const {
    auth,
    appleProvider,
    facebookProvider,
    githubProvider,
    googleProvider,
    microsoftProvider,
    twitterProvider,
    customLoginButton,
  } = useFirebaseDiscussion()
  return (
    <div className="flex flex-wrap gap-2">
      {customLoginButton !== undefined && customLoginButton}
      {appleProvider && <AppleOauthButton auth={auth} />}
      {facebookProvider && <FacebookOauthButton auth={auth} />}
      {githubProvider && <GithubOauthButton auth={auth} />}
      {googleProvider && <GoogleOauthButton auth={auth} />}
      {microsoftProvider && <MicrosoftOauthButton auth={auth} />}
      {twitterProvider && <TwitterOauthButton auth={auth} />}
    </div>
  )
}
export default LoginButtonGroup
