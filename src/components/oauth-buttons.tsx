import React from "react"
import type { Auth } from "firebase/auth"
import {
  useSignInWithApple,
  useSignInWithFacebook,
  useSignInWithGithub,
  useSignInWithGoogle,
  useSignInWithMicrosoft,
  useSignInWithTwitter,
} from "react-firebase-hooks/auth"

import {
  AppleSvg,
  FacebookSvg,
  GithubSvg,
  GoogleSvg,
  MicrosoftSvg,
  TwitterSvg,
} from "./svg"
import { Button } from "./ui/button"

type OauthButtonProps = {
  auth: Auth
}

const AppleOauthButton: React.FC<OauthButtonProps> = ({ auth }) => {
  const [signInWithApple, _, loading] = useSignInWithApple(auth)
  return (
    <Button
      variant="default"
      size="icon"
      onClick={() => signInWithApple()}
      disabled={loading}
    >
      <span className="sr-only">Sign in with Apple</span>
      <AppleSvg aria-hidden="true" className="h-4 w-4 fill-current" />
    </Button>
  )
}

const FacebookOauthButton: React.FC<OauthButtonProps> = ({ auth }) => {
  const [signInWithFacebook, _, loading] = useSignInWithFacebook(auth)
  return (
    <Button
      variant="default"
      size="icon"
      onClick={() => signInWithFacebook()}
      disabled={loading}
    >
      <span className="sr-only">Sign in with Facebook</span>
      <FacebookSvg aria-hidden="true" className="h-4 w-4 fill-current" />
    </Button>
  )
}

const GithubOauthButton: React.FC<OauthButtonProps> = ({ auth }) => {
  const [signInWithGithub, _, loading] = useSignInWithGithub(auth)
  return (
    <Button
      variant="default"
      size="icon"
      onClick={() => signInWithGithub()}
      disabled={loading}
    >
      <span className="sr-only">Sign in with Github</span>
      <GithubSvg aria-hidden="true" className="h-4 w-4 fill-current" />
    </Button>
  )
}

const GoogleOauthButton: React.FC<OauthButtonProps> = ({ auth }) => {
  const [signInWithGoogle, _, loading] = useSignInWithGoogle(auth)
  return (
    <Button
      variant="default"
      size="icon"
      onClick={() => signInWithGoogle()}
      disabled={loading}
    >
      <span className="sr-only">Sign in with Google</span>
      <GoogleSvg aria-hidden="true" className="h-4 w-4 fill-current" />
    </Button>
  )
}

const MicrosoftOauthButton: React.FC<OauthButtonProps> = ({ auth }) => {
  const [signInWithMicrosoft, _, loading] = useSignInWithMicrosoft(auth)
  return (
    <Button
      variant="default"
      size="icon"
      onClick={() => signInWithMicrosoft()}
      disabled={loading}
    >
      <span className="sr-only">Sign in with Microsoft</span>
      <MicrosoftSvg aria-hidden="true" className="h-4 w-4 fill-current" />
    </Button>
  )
}

const TwitterOauthButton: React.FC<OauthButtonProps> = ({ auth }) => {
  const [signInWithTwitter, _, loading] = useSignInWithTwitter(auth)
  return (
    <Button
      variant="default"
      size="icon"
      onClick={() => signInWithTwitter()}
      disabled={loading}
    >
      <span className="sr-only">Sign in with Twitter</span>
      <TwitterSvg aria-hidden="true" className="h-4 w-4 fill-current" />
    </Button>
  )
}

export {
  AppleOauthButton,
  FacebookOauthButton,
  GithubOauthButton,
  GoogleOauthButton,
  MicrosoftOauthButton,
  TwitterOauthButton,
}
