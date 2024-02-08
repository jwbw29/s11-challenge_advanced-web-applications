// vite.config.js
// import image from "@rollup/plugin-image";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  plugins: [
    // image(),
    react(),
    createHtmlPlugin({
      entry: "/frontend/index.jsx",
      template: "/frontend/index.html",
      inject: {
        data: {
          title: "index",
          injectScript: `<script src="./inject.js"></script>`,
        },
      },
    }),
  ],
});
