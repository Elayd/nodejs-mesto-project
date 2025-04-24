import { Request, Response } from "express";
import Card from "../models/card";
import { HttpStatuses } from "../constants";
import { AppMessages } from "../constants";

export const unLikeCard = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    if (!req.user || !req.user._id) {
      return res
        .status(HttpStatuses.UNAUTHORIZED)
        .send({ message: AppMessages.AUTH_REQUIRED });
    }

    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      // @ts-ignore
      { $pull: { likes: req.user._id } },
      { new: true }
    );

    if (!card) {
      return res
        .status(HttpStatuses.NOT_FOUND)
        .send({ message: AppMessages.CARD_NOT_FOUND });
    }

    return res.status(HttpStatuses.OK).send(card);
  } catch {
    return res
      .status(HttpStatuses.BAD_REQUEST)
      .send({ message: AppMessages.INVALID_CARD_ID });
  }
};

export const likeCard = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    if (!req.user || !req.user._id) {
      return res
        .status(HttpStatuses.UNAUTHORIZED)
        .send({ message: AppMessages.AUTH_REQUIRED });
    }

    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      // @ts-ignore
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );

    if (!card) {
      return res
        .status(HttpStatuses.NOT_FOUND)
        .send({ message: AppMessages.CARD_NOT_FOUND });
    }

    return res.status(HttpStatuses.OK).send(card);
  } catch {
    return res
      .status(HttpStatuses.BAD_REQUEST)
      .send({ message: AppMessages.INVALID_CARD_ID });
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);
    if (!card) {
      return res
        .status(HttpStatuses.NOT_FOUND)
        .send({ message: AppMessages.CARD_NOT_FOUND });
    }

    return res.status(HttpStatuses.OK).send(card);
  } catch {
    return res
      .status(HttpStatuses.BAD_REQUEST)
      .send({ message: AppMessages.INVALID_CARD_ID });
  }
};

export const getAllCards = async (_req: Request, res: Response) => {
  try {
    const cards = await Card.find();
    return res.status(HttpStatuses.OK).send(cards);
  } catch {
    return res
      .status(HttpStatuses.INTERNAL_SERVER_ERROR)
      .send({ message: AppMessages.INTERNAL_SERVER_ERROR });
  }
};

export const createCard = async (req: Request, res: Response) => {
  console.log(req);
  try {
    // @ts-ignore
    if (!req.user || !req.user._id) {
      return res
        .status(HttpStatuses.UNAUTHORIZED)
        .send({ message: AppMessages.AUTH_REQUIRED });
    }

    const { name, link } = req.body;
    // @ts-ignore
    const owner = req.user._id;
    const card = await Card.create({ name, link, owner });
    return res.status(HttpStatuses.CREATED).send(card);
  } catch {
    return res
      .status(HttpStatuses.BAD_REQUEST)
      .send({ message: AppMessages.INVALID_INPUT });
  }
};
