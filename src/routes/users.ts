import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserProfileAvatar,
} from "../controllers/users";

const router = Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.patch("/me/avatar", updateUserProfileAvatar);
router.patch("/me", updateUserProfile);

export default router;
