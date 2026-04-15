import "./app/lib/env";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/image",
    "@vee-validate/nuxt",
  ],
  devtools: { enabled: true },
  css: [
    "./app/assets/css/main.css",
    "@clicksign/tokens/theme.css",
  ],
  compatibilityDate: "2025-07-15",
});
