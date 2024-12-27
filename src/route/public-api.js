import express  from "express"
import { register, login } from "../controller/AuthController.js"
const publicRouter = new express.Router()

publicRouter.post("/api/register", register)
publicRouter.post("/api/login", login)


export {
    publicRouter
}