import path from "path";
import { defineConfig } from "umi";

export default defineConfig({
  routes: [{ path: "/", component: "Index" }],
  npmClient: "yarn",
  headScripts: [
    "/src/polyfills.bundle.js",
    "/src/system.bundle.js",
    {
      src: "/src/import-map.json",
      type: "systemjs-importmap",
    },
  ],
  alias: {
    "@": path.resolve(__dirname, "src"),
  },
});
