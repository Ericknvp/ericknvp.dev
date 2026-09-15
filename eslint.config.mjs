import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Foreign trees living inside this repo that aren't part of the app:
    ".agents/**",
    ".claude/**",
    ".codex/**",
    ".impeccable/**",
    "monedo-screenshots/**",
    "assets/**",
  ]),
]);

export default eslintConfig;
