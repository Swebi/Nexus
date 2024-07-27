import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string(),
  MONGODB_URI: z.string(),
  NODE_ENV: z.string(),
});

const env = envSchema.parse(process.env);
export type EnvSchemaType = z.infer<typeof envSchema>;

export default {
  PORT: env.PORT,
  MONGODB_URI: env.MONGODB_URI,
  NODE_ENV: env.NODE_ENV,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
};
