import { Router } from "express"
import {
  createPost,
  getAllPost,
  getMyPost
} from "../controllers/post.controller"
import { authenticate } from "../middleware/auth"
import { requireRole } from "../middleware/role"
import { Role } from "../models/user.model"
import { upload } from "../middleware/upload"

const router = Router()

// create post - authenticated users
router.post(
    "/create", 
    authenticate, 
    requireRole(Role.AUTHOR), 
    upload.single("image"), // form data key name
    createPost
)

// get all posts - public
router.get("/", getAllPost)

// get my posts - authenticated users
router.get("/me", authenticate, requireRole(Role.USER), getMyPost)

export default router