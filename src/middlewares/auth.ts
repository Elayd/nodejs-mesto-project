import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UnauthorizedError from "../errors/UnauthorizedError";
import { AppMessages } from "../constants";

const { JWT_SECRET = "dev-secret" } = process.env;

interface CustomJwtPayload extends JwtPayload {
  _id: string;
}

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError(AppMessages.AUTH_REQUESTED));
  }

  const token = authorization.replace("Bearer ", "");

  try {
    req.user = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
    return next();
  } catch (err) {
    return next(new UnauthorizedError(AppMessages.WRONG_TOKEN));
  }
};
