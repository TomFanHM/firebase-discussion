import type { Preview } from "@storybook/react"

import "../src/styles/globals.css"

export const parameters = {
  darkMode: {
    classTarget: "html",
    current: "light",
    darkClass: "dark",
    lightClass: "light",
  },
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
