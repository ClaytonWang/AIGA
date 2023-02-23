import path from "path";
import { defineConfig } from "umi";

export default defineConfig({
  theme: { "@primary-color": "#7B68EE" },
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