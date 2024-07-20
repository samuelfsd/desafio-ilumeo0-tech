import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import { rules } from "eslint-config-prettier";


export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.node }},
  {rules: {
    "camelcase": "off",
    "no-useless-constructor": "off"
  }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];