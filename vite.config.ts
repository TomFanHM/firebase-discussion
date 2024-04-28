import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: false,
  plugins: [
    react(),
    dts({ rollupTypes: true }),
    // visualizer({ open: true, filename: "bundle-analysis.html" }),
  ],
  preview: {
    port: 3000,
    strictPort: true,
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:3000",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/components/index.tsx"),
      name: "firebase-discussion",
      fileName: "firebase-discussion",
    },
    rollupOptions: {
      external: ["react", "react-dom", "firebase", "react-firebase-hooks"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          firebase: "firebase",
          "react-firebase-hooks": "ReactFirebaseHooks",
        },
      },
    },
  },
});
