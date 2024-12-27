import express  from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { logout } from "../controller/AuthController.js"
import { profile, userPost, UserPostDelete } from "../controller/UserController.js"
import { create, get, getPostCategory } from "../controller/PostController.js"
import { createCategory, getCategory } from "../controller/CategoryController.js"
const api = new express.Router()


api.use(authMiddleware)
api.get("/api/users/profile", profile);
api.post("/api/logout", logout)
api.get("/api/profile/daftar-post", userPost)
api.delete("/api/profile/posts/:id", UserPostDelete)
// POST ROUTER
api.post("/api/posts", create);
api.get("/api/posts", get);
api.get("/api/posts/:slug", getPostCategory);

// CATEGORY ROUTER
api.post("/api/categories", createCategory)
api.get("/api/categories", getCategory)

export {
    api
}