import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { transformWithOxc } from "vite";

export default defineConfig({
  plugins: [
    {
      // Next.js accepte le JSX dans .js ; Vite doit le traiter explicitement.
      name: "next-jsx-in-js",
      enforce: "pre",
      transform(code, id) {
        if (/\/src\/.*\.js$/.test(id)) {
          return transformWithOxc(code, id, {
            lang: "jsx",
            jsx: { runtime: "automatic" },
          });
        }
      },
    },
    react(),
  ],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.js"],
    include: ["src/tests/**/*.{test,spec}.{js,jsx}"],
    restoreMocks: true,
  },
});
