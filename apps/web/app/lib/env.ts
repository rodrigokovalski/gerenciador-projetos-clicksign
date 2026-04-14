import { z } from "zod";

const EnvSchema = z.object({
API_BASE_URL: z.string("Defina API_BASE_URL no .env"),
});

export type Env = z.infer<typeof EnvSchema>;

export default EnvSchema.parse({
  API_BASE_URL: process.env.API_BASE_URL ?? "http://localhost:3001",
});
