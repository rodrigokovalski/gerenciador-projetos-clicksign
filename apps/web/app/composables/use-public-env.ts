import { z } from "zod";

const publicEnvSchema = z.object({
  NUXT_PUBLIC_API_BASE_URL: z
    .string()
    .min(1, { message: "Defina NUXT_PUBLIC_API_BASE_URL no .env" }),
});

export type PublicEnv = z.infer<typeof publicEnvSchema>;

export function usePublicEnv(): PublicEnv {
  const { public: pub } = useRuntimeConfig();
  return publicEnvSchema.parse({ NUXT_PUBLIC_API_BASE_URL: pub.apiBaseUrl });
}
