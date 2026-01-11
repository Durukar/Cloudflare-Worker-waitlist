import { hc } from "hono/client";
import type {AppType} from '../../backend/src/index'

const url = import.meta.env.PROD
  ? 'https://backend.nightdavila.workers.dev'
  : '/'

export const client = hc<AppType>(url)