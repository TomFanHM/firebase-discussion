import { Meta, StoryObj } from "@storybook/react"

import Example from "."

const meta: Meta<typeof Example> = {
  title: "Components/Example",
  component: Example,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Example>

export const Default: Story = {
  args: {
    theme: "light",
    // Oauth options
    oauthApple: true,
    oauthGoogle: true,
    oauthGithub: true,
    oauthTwitter: true,
    oauthFacebook: true,
    oauthMicrosoft: true,
  },
}
