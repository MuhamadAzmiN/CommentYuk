import express from "express"
import { publicRouter } from "../route/public-api.js"
import { api } from "../route/api.js"
import cookieParser from "cookie-parser"
export const web = express()

web.use(cookieParser())
web.use(express.json())
web.use(publicRouter)
web.use(api)