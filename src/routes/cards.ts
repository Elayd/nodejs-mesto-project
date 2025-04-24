import { Router } from "express";
import {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unLikeCard,
} from "../controllers/cards";

const router = Router();

router.post("/", createCard);
router.get("/", getAllCards);
router.delete("/:cardId", deleteCard);

router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", unLikeCard);

export default router;
