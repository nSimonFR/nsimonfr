import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";

export default {
  root: "./src",
  build: {
    outDir: "../nsimon.fr",
  },
  plugins: [wasm(), topLevelAwait()],
};
