import { Meta, StoryObj } from "@storybook/react";

import Example from ".";

const meta: Meta<typeof Example> = {
  title: "Components/Example",
  component: Example,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Example>;

export const Default: Story = {
  args: {
    theme: "dark",
    appleProvider: true,
    facebookProvider: true,
    githubProvider: true,
    googleProvider: true,
    microsoftProvider: true,
    twitterProvider: true,
  },
};
