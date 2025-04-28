import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import { AppMessages, HttpStatuses } from "../constants";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ConflictError from "../errors/ConflictError";
import BadRequestError from "../errors/BadRequestError";
import UnauthorizedError from "../errors/UnauthorizedError";

const { JWT_SECRET = "dev-secret" } = process.env;

export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await User.find({});
    res.status(HttpStatuses.OK).send(users);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, about, avatar, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    const response = newUser.toObject();
    delete response.password;

    res.status(HttpStatuses.CREATED).send(response);
  } catch (err: any) {
    if (err.code === 11000) {
      next(new ConflictError(AppMessages.EMAIL_ALREADY_EXISTS));
    } else if (err.name === "ValidationError") {
      next(new BadRequestError(AppMessages.USER_CREATE_INVALID_DATA));
    } else {
      next(err);
    }
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      next(new BadRequestError(AppMessages.USER_NOT_FOUND_ERROR));
      return;
    }

    res.status(HttpStatuses.OK).send(user);
  } catch (err: any) {
    if (err.name === "CastError") {
      next(new BadRequestError(AppMessages.WRONG_USER_ID));
    } else {
      next(err);
    }
  }
};

export const updateUserProfileAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      { avatar },
      { new: true, runValidators: true }
    );

    if (!user) {
      next(new BadRequestError(AppMessages.USER_NOT_FOUND_ERROR));
      return;
    }

    res.status(HttpStatuses.OK).send(user);
  } catch (err: any) {
    if (err.name === "ValidationError") {
      next(new BadRequestError(AppMessages.USER_UPDATE_AVATAR_INVALID_DATA));
    } else {
      next(err);
    }
  }
};

export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      { name, about },
      { new: true, runValidators: true }
    );

    if (!user) {
      next(new BadRequestError(AppMessages.USER_NOT_FOUND_ERROR));
      return;
    }

    res.status(HttpStatuses.OK).send(user);
  } catch (err: any) {
    if (err.name === "ValidationError") {
      next(new BadRequestError(AppMessages.USER_UPDATE_PROFILE_INVALID_DATA));
    } else {
      next(err);
    }
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      next(new UnauthorizedError(AppMessages.USER_INVALID_LOGIN_DATA));
      return;
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.send({ token });
  } catch (err) {
    next(err);
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id);

    if (!user) {
      next(new BadRequestError(AppMessages.USER_NOT_FOUND_ERROR));
      return;
    }

    res.status(HttpStatuses.OK).json(user);
  } catch (err) {
    next(err);
  }
};
