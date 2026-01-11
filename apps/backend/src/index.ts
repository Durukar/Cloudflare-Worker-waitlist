import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { drizzle } from 'drizzle-orm/d1'
import { users } from './db/schema'


type Bindings = {
  DB: D1Database
}

const app = new Hono<{Bindings: Bindings}>()

app.use('/*', cors())

const routes = app
  .get('/api/users', async (c) => {
    const db = drizzle(c.env.DB)
    const result = await db.select().from(users).all()
    return c.json(result)
  })

export type AppType = typeof routes

export default app
