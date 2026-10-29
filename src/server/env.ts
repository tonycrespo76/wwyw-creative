import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  SPIKE_SECRET: z.string().min(16).optional(),
  MEDIA_ROOT: z.string().min(1).optional(),
  TURNSTILE_SECRET_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().min(1).optional(),
});

export type Env = z.infer<typeof schema>;

export function readEnv(source: Record<string, string | undefined> = process.env): Env {
  return schema.parse(source);
}
