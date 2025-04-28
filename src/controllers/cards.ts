import { NextFunction, Request, Response } from "express";
import Card from "../models/card";
import { HttpStatuses } from "../constants";
import { AppMessages } from "../constants";
import NotFoundError from "../errors/NotFoundError";
import BadRequestError from "../errors/BadRequestError";
import ForbiddenError from "../errors/ForbiddenError";

export const unLikeCard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user?._id } },
      { new: true }
    );

    if (!card) {
      next(new NotFoundError(AppMessages.CARD_NOT_FOUND));
      return;
    }

    res.status(HttpStatuses.OK).send(card);
  } catch (err: any) {
    if (err.name === "CastError") {
      next(new BadRequestError(AppMessages.WRONG_CARD_ID));
    } else {
      next(err);
    }
  }
};

export const likeCard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user?._id } },
      { new: true }
    );

    if (!card) {
      next(new NotFoundError(AppMessages.CARD_NOT_FOUND));
      return;
    }

    res.status(HttpStatuses.OK).send(card);
  } catch (err: any) {
    if (err.name === "CastError") {
      next(new BadRequestError(AppMessages.WRONG_CARD_ID));
    } else {
      next(err);
    }
  }
};

export const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const card = await Card.findById(req.params.cardId);

    if (!card) {
      next(new NotFoundError(AppMessages.CARD_NOT_FOUND));
      return;
    }

    if (card.owner.toString() !== req.user?._id) {
      next(new ForbiddenError(AppMessages.CANNOT_DELETE_FOREIGN_CARD));
      return;
    }

    await card.deleteOne();

    res.status(HttpStatuses.OK).json({ message: AppMessages.CARD_DELETED });
  } catch (err: any) {
    if (err.name === "CastError") {
      next(new BadRequestError(AppMessages.WRONG_CARD_ID));
    } else {
      next(err);
    }
  }
};

export const getAllCards = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cards = await Card.find();
    res.status(HttpStatuses.OK).send(cards);
  } catch (err) {
    next(err);
  }
};

export const createCard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, link } = req.body;
    const owner = req.user?._id;

    const card = await Card.create({ name, link, owner });
    res.status(HttpStatuses.CREATED).send(card);
  } catch (err: any) {
    if (err.name === "ValidationError") {
      next(new BadRequestError(AppMessages.WRONG_CREATE_CARD_DATA));
    } else {
      next(err);
    }
  }
};
