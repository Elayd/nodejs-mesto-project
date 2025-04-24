import { Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
import User from "../models/user";
import { HttpStatuses } from "../constants";
import { AppMessages } from "../constants";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find({});
    return res.status(HttpStatuses.OK).send(users);
  } catch {
    return res
      .status(HttpStatuses.INTERNAL_SERVER_ERROR)
      .send({ message: AppMessages.INTERNAL_SERVER_ERROR });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    return res.status(HttpStatuses.CREATED).send(user);
  } catch (err: unknown) {
    if (err instanceof MongooseError.ValidationError) {
      return res
        .status(HttpStatuses.BAD_REQUEST)
        .send({ message: AppMessages.USER_VALIDATION_ERROR });
    }

    return res
      .status(HttpStatuses.INTERNAL_SERVER_ERROR)
      .send({ message: AppMessages.INTERNAL_SERVER_ERROR });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res
        .status(HttpStatuses.NOT_FOUND)
        .send({ message: AppMessages.USER_NOT_FOUND_ERROR });
    }

    return res.status(HttpStatuses.OK).send(user);
  } catch (err: unknown) {
    if (err instanceof MongooseError.CastError) {
      return res
        .status(HttpStatuses.BAD_REQUEST)
        .send({ message: AppMessages.INVALID_USER_ID });
    }

    return res
      .status(HttpStatuses.INTERNAL_SERVER_ERROR)
      .send({ message: AppMessages.INTERNAL_SERVER_ERROR });
  }
};

export const updateUserProfileAvatar = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    if (!req.user || !req.user._id) {
      return res
        .status(HttpStatuses.UNAUTHORIZED)
        .send({ message: AppMessages.AUTH_REQUIRED });
    }

    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      // @ts-ignore
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res
        .status(HttpStatuses.NOT_FOUND)
        .send({ message: AppMessages.USER_NOT_FOUND_ERROR });
    }

    return res.status(HttpStatuses.OK).send(user);
  } catch (err: unknown) {
    if (err instanceof MongooseError.ValidationError) {
      return res
        .status(HttpStatuses.BAD_REQUEST)
        .send({ message: AppMessages.USER_VALIDATION_ERROR });
    }

    return res
      .status(HttpStatuses.INTERNAL_SERVER_ERROR)
      .send({ message: AppMessages.INTERNAL_SERVER_ERROR });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    if (!req.user || !req.user._id) {
      return res
        .status(HttpStatuses.UNAUTHORIZED)
        .send({ message: AppMessages.AUTH_REQUIRED });
    }

    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      // @ts-ignore
      req.user._id,
      { name, about },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res
        .status(HttpStatuses.NOT_FOUND)
        .send({ message: AppMessages.USER_NOT_FOUND_ERROR });
    }

    return res.status(HttpStatuses.OK).send(user);
  } catch (err: unknown) {
    if (err instanceof MongooseError.ValidationError) {
      return res
        .status(HttpStatuses.BAD_REQUEST)
        .send({ message: AppMessages.USER_VALIDATION_ERROR });
    }

    return res
      .status(HttpStatuses.INTERNAL_SERVER_ERROR)
      .send({ message: AppMessages.INTERNAL_SERVER_ERROR });
  }
};
