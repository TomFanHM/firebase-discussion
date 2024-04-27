import type { Preview } from "@storybook/react";

import "../src/styles/globals.css";

export const parameters = {
  darkMode: {
    classTarget: "html",
    current: "light",
    darkClass: "dark",
    lightClass: "light",
  },
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        // The label to show for this toolbar item
        title: "Theme",
        icon: "circlehollow",
        // Array of plain string values or MenuItem shape (see below)
        items: ["light", "dark"],
        // Change title based on selected value
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
