// https://nuxt.com/docs/api/configuration/nuxt-config

/** Evita `base + "/api/..."` virar `//api/...` quando a env termina com `/`. */
function normalizePublicApiBaseUrl(raw: string | undefined): string {
  return (raw ?? "").trim().replace(/\/+$/, "");
}

function hostnameFromApiBase(): string | null {
  const raw = normalizePublicApiBaseUrl(process.env.NUXT_PUBLIC_API_BASE_URL);
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
      apiBaseUrl: normalizePublicApiBaseUrl(process.env.NUXT_PUBLIC_API_BASE_URL),
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
