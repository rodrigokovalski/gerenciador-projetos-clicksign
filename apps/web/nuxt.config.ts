// https://nuxt.com/docs/api/configuration/nuxt-config

function hostnameFromApiBase(): string | null {
  const raw = process.env.NUXT_PUBLIC_API_BASE_URL?.trim();
  if (!raw)
    return null;
  try {
    return new URL(raw).hostname;
  }
  catch {
    return null;
  }
}

const apiHost = hostnameFromApiBase();

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL ?? "",
    },
  },
  image: {
    domains: apiHost ? [apiHost] : [],
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
