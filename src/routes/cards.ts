import { Router } from "express";
import {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unLikeCard,
} from "../controllers/cards";
import { validateCardCreate, validateCardId } from "../middlewares/validators";

const router = Router();

router.get("/", getAllCards);
router.post("/", validateCardCreate, createCard);
router.delete("/:cardId", validateCardId, deleteCard);
router.put("/:cardId/likes", validateCardId, likeCard);
router.delete("/:cardId/likes", validateCardId, unLikeCard);

export default router;
