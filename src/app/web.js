import express from "express"
import { publicRouter } from "../route/public-api.js"
import { api } from "../route/api.js"
import cookieParser from "cookie-parser"
import cors from "cors"
export const web = express()

web.use(express.json({limit : "50mb"}))
web.use(express.urlencoded({limit : "50mb", extended : true}))
web.use(cookieParser())
web.use(
    cors({
    origin: "http://localhost:5173",
    credentials: true
}))
web.use(publicRouter)
web.use(api)