import { readFileSync } from "fs";
import path from "path";
import react from "@vitejs/plugin-react";
// import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const packageJson = JSON.parse(
  readFileSync("./package.json", { encoding: "utf-8" })
);

const globals = {
  ...(packageJson.dependencies || {}),
};

function resolve(str: string) {
  return path.resolve(__dirname, str);
}

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: false,
  plugins: [
    react(),
    dts({ rollupTypes: true }),
    // visualizer({ open: true, filename: "bundle-analysis.html" }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: resolve("./src/components/index.tsx"),
      name: "firebase-discussion",
      fileName: "firebase-discussion",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "firebase",
        "firebase/firestore",
        "react-firebase-hooks",
        "react-firebase-hooks/auth",
        ...Object.keys(globals),
      ],
    },
  },
});
