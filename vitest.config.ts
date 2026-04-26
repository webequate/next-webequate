import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: [
      // Replace Next.js image/link with lightweight test stubs so components
      // that import them can render in jsdom without the Next.js runtime.
      {
        find: /^next\/image$/,
        replacement: resolve(__dirname, "__tests__/mocks/next-image.tsx"),
      },
      {
        find: /^next\/link$/,
        replacement: resolve(__dirname, "__tests__/mocks/next-link.tsx"),
      },
    ],
  },
});
