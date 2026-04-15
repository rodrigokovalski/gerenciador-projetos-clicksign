// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL ?? "",
    },
  },
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
