import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import plugin from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  plugins: [plugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "^/swagger": {
        target: "http://localhost:5100/",
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
      },
      "^/Device/": {
        target: "http://localhost:5100/",
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
      },
      "^/InvoiceRequest/": {
        target: "http://localhost:5100/",
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
      },
      "^/Auth/": {
        target: "http://localhost:5100/",
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
      },
      "^/Party/": {
        target: "http://localhost:5100/",
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
      },
      "^/User/": {
        target: "http://localhost:5100/",
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
      },
    },
    port: 5173,
  },
});
