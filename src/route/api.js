import express  from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { checkAuth, logout } from "../controller/AuthController.js"
import { profile, userPost, UserPostDelete, UserPostProfileUpdate } from "../controller/UserController.js"
import { create, get, getPostCategory, detail, deleteAllPost } from "../controller/PostController.js"
import { createCategory, getCategory } from "../controller/CategoryController.js"
const api = new express.Router()


api.use(authMiddleware)
api.get("/api/users/profile",authMiddleware, profile);
api.get("/api/check-auth", authMiddleware, checkAuth)
api.post("/api/logout", logout)
api.get("/api/profile/daftar-post", userPost)
api.delete("/api/profile/posts/:id", UserPostDelete)
api.put("/api/profile/update-profile",UserPostProfileUpdate)
// POST ROUTER
api.post("/api/posts", authMiddleware, create);
api.get("/api/posts", get);
api.get("/api/posts/:id", detail);
api.get("/api/posts/:slug", getPostCategory);
api.delete("/api/posts", deleteAllPost)

// CATEGORY ROUTER
api.post("/api/categories", createCategory)
api.get("/api/categories", getCategory)

export {
    api
}