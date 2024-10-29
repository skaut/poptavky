import js from "@eslint/js";
import eslintComments from "@eslint-community/eslint-plugin-eslint-comments";
import commentsConfig from "@eslint-community/eslint-plugin-eslint-comments/configs";
import compat from "eslint-plugin-compat";
import jest from "eslint-plugin-jest";
import perfectionist from "eslint-plugin-perfectionist";
import preferArrowFunctions from "eslint-plugin-prefer-arrow-functions";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import react from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

/* eslint-disable @typescript-eslint/naming-convention -- Not applicable to this file */

export default tseslint.config(
  js.configs.recommended,
  prettierRecommended,
  commentsConfig.recommended,
  compat.configs["flat/recommended"],
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  perfectionist.configs["recommended-natural"],
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.js"],
          defaultProject: "tsconfig.json",
        },
      },
    },
    plugins: {
      "eslint-comments": eslintComments,
      jest,
      "prefer-arrow-functions": preferArrowFunctions,
    },
    rules: {
      "@typescript-eslint/array-type": ["error", { default: "generic" }],
      "@typescript-eslint/class-methods-use-this": "error",
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/default-param-last": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-member-accessibility": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/init-declarations": "error",
      "@typescript-eslint/method-signature-style": ["error", "method"],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          filter: {
            match: false,
            regex: "^(help-issue-label|short-description)$",
          },
          format: ["camelCase"],
          leadingUnderscore: "allow",
          selector: "default",
          trailingUnderscore: "allow",
        },
        {
          format: ["camelCase", "PascalCase"],
          selector: "import",
        },
        {
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
          selector: "variable",
          trailingUnderscore: "allow",
        },
        {
          format: ["PascalCase"],
          selector: "typeLike",
        },
      ],
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/no-unnecessary-parameter-property-assignment":
        "error",
      "@typescript-eslint/no-unnecessary-qualifier": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-use-before-define": "error",
      "@typescript-eslint/no-useless-empty-export": "error",
      "@typescript-eslint/parameter-properties": "error",
      "@typescript-eslint/prefer-enum-initializers": "error",
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/promise-function-async": "error",
      "@typescript-eslint/require-array-sort-compare": "error",
      "@typescript-eslint/strict-boolean-expressions": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/typedef": "error",
      "array-callback-return": "error",
      "arrow-body-style": ["error", "as-needed"],
      "block-scoped-var": "error",
      "consistent-return": "error",
      "default-case": "error",
      "default-case-last": "error",
      eqeqeq: "error",
      "eslint-comments/no-unused-disable": "error",
      "eslint-comments/require-description": [
        "error",
        {
          ignore: ["eslint-enable"],
        },
      ],
      "guard-for-in": "error",
      "logical-assignment-operators": "error",
      "new-cap": "error",
      "no-alert": "error",
      "no-await-in-loop": "error",
      "no-console": "error",
      "no-constructor-return": "error",
      "no-duplicate-imports": "error",
      "no-else-return": "error",
      "no-eval": "error",
      "no-extend-native": "error",
      "no-extra-bind": "error",
      "no-inner-declarations": "error",
      "no-invalid-this": "error",
      "no-iterator": "error",
      "no-lone-blocks": "error",
      "no-lonely-if": "error",
      "no-multi-assign": "error",
      "no-new-func": "error",
      "no-object-constructor": "error",
      "no-param-reassign": "error",
      "no-promise-executor-return": "error",
      "no-return-assign": "error",
      "no-self-compare": "error",
      "no-sequences": "error",
      "no-template-curly-in-string": "error",
      "no-unreachable-loop": "error",
      "no-useless-call": "error",
      "no-useless-computed-key": "error",
      "no-useless-concat": "error",
      "no-useless-return": "error",
      "no-warning-comments": "warn",
      "object-shorthand": "error",
      "operator-assignment": "error",
      "perfectionist/sort-union-types": [
        "error",
        {
          groups: [
            "literal",
            "function",
            "import",
            "operator",
            "conditional",
            "object",
            "tuple",
            "intersection",
            "union",
            "named",
            "keyword",
            "nullish",
            "unknown",
          ],
        },
      ],
      "prefer-arrow-functions/prefer-arrow-functions": [
        "error",
        {
          allowNamedFunctions: true,
        },
      ],
      "prefer-exponentiation-operator": "error",
      "prefer-object-spread": "error",
      "prefer-regex-literals": "error",
      "prefer-template": "error",
      radix: "error",
      "react/button-has-type": "error",
      "react/checked-requires-onchange-or-readonly": "error",
      "react/default-props-match-prop-types": "error",
      "react/destructuring-assignment": "error",
      "react/forbid-foreign-prop-types": "error",
      "react/function-component-definition": [
        "error",
        { namedComponents: "arrow-function" },
      ],
      "react/hook-use-state": "error",
      "react/iframe-missing-sandbox": "error",
      "react/jsx-boolean-value": "error",
      "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
      "react/jsx-fragments": "error",
      "react/jsx-handler-names": "error",
      "react/jsx-no-bind": "error",
      "react/jsx-no-constructed-context-values": "error",
      "react/jsx-no-leaked-render": "error",
      "react/jsx-no-script-url": "error",
      "react/jsx-no-useless-fragment": "error",
      "react/jsx-pascal-case": "error",
      "react/jsx-props-no-spread-multi": "error",
      "react/no-access-state-in-setstate": "error",
      "react/no-adjacent-inline-elements": "error",
      "react/no-array-index-key": "error",
      "react/no-arrow-function-lifecycle": "error",
      "react/no-danger": "error",
      "react/no-did-mount-set-state": "error",
      "react/no-did-update-set-state": "error",
      "react/no-invalid-html-attribute": "error",
      "react/no-multi-comp": "error",
      "react/no-namespace": "error",
      "react/no-object-type-as-default-prop": "error",
      "react/no-redundant-should-component-update": "error",
      "react/no-set-state": "error",
      "react/no-this-in-sfc": "error",
      "react/no-typos": "error",
      "react/no-unknown-property": ["error", { ignore: ["css"] }],
      "react/no-unstable-nested-components": "error",
      "react/no-unused-class-component-methods": "error",
      "react/no-unused-prop-types": "error",
      "react/no-unused-state": "error",
      "react/no-will-update-set-state": "error",
      "react/prefer-exact-props": "error",
      "react/prefer-read-only-props": "error",
      "react/prefer-stateless-function": "error",
      "react/require-default-props": [
        "error",
        { functions: "defaultArguments" },
      ],
      "react/require-optimization": "error",
      "react/self-closing-comp": "error",
      "react/sort-comp": "error",
      "react/sort-default-props": "error",
      "react/sort-prop-types": "error",
      "react/static-property-placement": "error",
      "react/style-prop-object": "error",
      "react/void-dom-elements-no-children": "error",
      "require-atomic-updates": "error",
      "require-unicode-regexp": "error",
      strict: ["error", "never"],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    ...jest.configs["flat/recommended"],
    ...jest.configs["flat/style"],
    files: ["__tests__/**/*.test.ts", "__test__/**/*.test.tsx"],
    rules: {
      ...jest.configs["flat/recommended"].rules,
      ...jest.configs["flat/style"].rules,
      "jest/consistent-test-it": ["error", { withinDescribe: "test" }],
      "jest/no-conditional-in-test": "error",
      "jest/no-confusing-set-timeout": "error",
      "jest/no-duplicate-hooks": "error",
      "jest/no-test-return-statement": "error",
      "jest/no-untyped-mock-factory": "error",
      "jest/padding-around-all": "error",
      "jest/prefer-called-with": "error",
      "jest/prefer-comparison-matcher": "error",
      "jest/prefer-each": "error",
      "jest/prefer-equality-matcher": "error",
      "jest/prefer-expect-assertions": [
        "error",
        {
          onlyFunctionsWithAsyncKeyword: true,
          onlyFunctionsWithExpectInCallback: true,
          onlyFunctionsWithExpectInLoop: true,
        },
      ],
      "jest/prefer-expect-resolves": "error",
      "jest/prefer-hooks-in-order": "error",
      "jest/prefer-hooks-on-top": "error",
      "jest/prefer-jest-mocked": "error",
      "jest/prefer-mock-promise-shorthand": "error",
      "jest/prefer-spy-on": "error",
      "jest/prefer-strict-equal": "error",
      "jest/require-hook": "error",
      "jest/require-to-throw-message": "error",
      "jest/unbound-method": "error",
    },
  },
  {
    files: ["*.config.js", "*.config.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.js"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
  },
);

/* eslint-enable @typescript-eslint/naming-convention */
