import { defineConfig, globalIgnores} from "eslint/config";
// import globals from "globals";
// import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig([
  { files: ["**/*.{mjs,cjs,ts}"], ignores: ["dist/**"] },
  // { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  // { files: ["**/*.{mjs,cjs,ts}"], languageOptions: { globals: globals.browser } },
  // { files: ["**/*.{mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] }, 
  tseslint.configs.recommended,
  globalIgnores(["dist/"])
]);