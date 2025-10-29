import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['prod', 'dev', 'test']),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_USERNAME: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('⚠ Environments variables not found', _env.error.message)
  throw _env.error
}

export const env = _env.data
