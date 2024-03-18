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

type LoginButtonGroupProps = {}

const LoginButtonGroup: React.FC<LoginButtonGroupProps> = () => {
  const { auth } = useFirebaseDiscussion()
  return (
    <div className="flex gap-2">
      <AppleOauthButton auth={auth} />
      <FacebookOauthButton auth={auth} />
      <GithubOauthButton auth={auth} />
      <GoogleOauthButton auth={auth} />
      <MicrosoftOauthButton auth={auth} />
      <TwitterOauthButton auth={auth} />
    </div>
  )
}
export default LoginButtonGroup
