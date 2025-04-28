import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserProfileAvatar,
  getCurrentUser,
} from "../controllers/users";
import {
  validateUserId,
  validateProfileUpdate,
  validateAvatarUpdate,
} from "../middlewares/validators";

const router = Router();

router.get("/me", getCurrentUser);
router.get("/", getAllUsers);
router.get("/:userId", validateUserId, getUserById);
router.patch("/me/avatar", validateAvatarUpdate, updateUserProfileAvatar);
router.patch("/me", validateProfileUpdate, updateUserProfile);

export default router;
