import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.string().optional(),
  DATABASE_URL: z.string(),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  S3_ENDPOINT: z.string().default('http://localhost:9000'),
  S3_ACCESS_KEY: z.string().default('minioadmin'),
  S3_SECRET_KEY: z.string().default('minioadmin'),
  S3_BUCKET: z.string().default('tool-jockey'),
  KEYCLOAK_ISSUER: z.string().default('http://localhost:8080/realms/tool-jockey'),
  KEYCLOAK_CLIENT_ID: z.string().default('tool-jockey-web'),
  KEYCLOAK_CLIENT_SECRET: z.string().default('development-secret'),
  WEB_ORIGIN: z.string().default('http://localhost:3001'),
});

type ConfigSchema = z.infer<typeof schema>;

export default registerAs('app', (): Record<string, unknown> => {
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(`Invalid configuration: ${parsed.error.message}`);
  }
  const env: ConfigSchema = parsed.data;
  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT ? Number(env.PORT) : 3000,
    database: {
      url: env.DATABASE_URL,
    },
    redis: {
      url: env.REDIS_URL,
    },
    s3: {
      endpoint: env.S3_ENDPOINT,
      accessKey: env.S3_ACCESS_KEY,
      secretKey: env.S3_SECRET_KEY,
      bucket: env.S3_BUCKET,
    },
    oidc: {
      issuer: env.KEYCLOAK_ISSUER,
      clientId: env.KEYCLOAK_CLIENT_ID,
      clientSecret: env.KEYCLOAK_CLIENT_SECRET,
    },
    web: {
      origin: env.WEB_ORIGIN,
    },
  };
});
