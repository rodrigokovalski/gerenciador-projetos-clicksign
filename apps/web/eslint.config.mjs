import { createConfigForNuxt } from "@nuxt/eslint-config";

export default createConfigForNuxt({
  features: {
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
  },
}).append({
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: {
          max: 2,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    "no-console": ["warn"],
  },
});
