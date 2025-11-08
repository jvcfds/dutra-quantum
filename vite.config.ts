import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 👇 Esta linha garante execução em ESM
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    target: "esnext",
  },
  esbuild: {
    jsx: "automatic",
  },
});
