import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    minify: "terser", // Utilise Terser pour minifier le JS
    terserOptions: {
      compress: {
        drop_console: true, // Supprime les console.log
        drop_debugger: true, // Supprime les debugger
      },
      format: {
        comments: false, // Supprime les commentaires
      },
    },
    lib: {
      entry: path.resolve(__dirname, "src/main.tsx"),
      name: "ReactWidgets",
      fileName: "index",
    },
    rollupOptions: {
      input: path.resolve(__dirname, "src/main.tsx"),
    },
    outDir: path.resolve(__dirname, "../dist/front-app"),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@types": path.resolve(__dirname, "src/types"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".scss"],
  },
  define: {
    "process.env": {}, // Ajoute un polyfill pour `process.env`
  },
  css: {
    modules: {
      localsConvention: "camelCase", // Utilise le format camelCase pour les classes CSS
    },
  },
});
