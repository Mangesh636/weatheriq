import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { prettyJSON } from 'hono/pretty-json'
import { logger } from 'hono/logger'
import { compress } from 'hono/compress'
import {cors} from 'hono/cors'
import { search } from './search/routes'
import { env } from '@/config/env'

const app = new Hono().basePath('/api')


app.use(prettyJSON())
app.use(logger())
app.use(compress())
app.use("/api/*",cors({
    origin: env.NEXT_PUBLIC_BASE_URL,
    maxAge: 600,
}))

app.route('/search', search)

export const GET = handle(app)
export const POST = handle(app)