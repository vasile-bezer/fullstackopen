// eslint.config.js
import { FlatCompat } from "@eslint/eslintrc";
import reactPlugin from "eslint-plugin-react";

const compat = new FlatCompat({
  baseDirectory: process.cwd(), // required so “plugin:react/recommended” is found
});

export default [
  // ─────────────────────────────────────────────────
  // 1) Ignore build artifacts and node_modules
  // ─────────────────────────────────────────────────
  {
    ignores: ["node_modules/**", "dist/**"],
  },

  // ─────────────────────────────────────────────────
  // 2) Apply linting rules to all JS/JSX files
  // ─────────────────────────────────────────────────
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        React: "readonly", // for the new JSX transform (React v17+)
      },
    },
    plugins: {
      react: reactPlugin,
    },
    settings: {
      react: {
        version: "detect", // automatically pick up installed React version
      },
    },

    // ─────────────────────────────────────────────────
    // 3) Extend the classic “eslint:recommended” and “plugin:react/recommended”
    //    (FlatCompat lets us pull in those “string‐style” configs)
    // ─────────────────────────────────────────────────
    ...compat.extends("eslint:recommended", "plugin:react/recommended"),

    // ─────────────────────────────────────────────────
    // 4) Your custom rules:
    //    • Tabs only
    //    • Comma‐first
    //    • No trailing commas
    // ─────────────────────────────────────────────────
    rules: {
      // (1) Indent using tabs, not spaces
      indent: ["error", "tab"],

      // (2) Comma‐first style: move commas to start of lines
      "comma-style": ["error", "first"],

      // (3) No trailing commas in objects or arrays
      "comma-dangle": ["error", "never"],

      // ───────────────────────────────────────────────
      // (Optional) If you want single quotes everywhere:
      // "quotes": ["error", "single"],
      //
      // (Optional) If you prefer semicolons at end of statements:
      // "semi": ["error", "always"],
      // ───────────────────────────────────────────────
    },
  },
];
