import { Request, Response } from "express";
import { AppMessages, HttpStatuses } from "../constants";

export default function errorHandler(err: any, _: Request, res: Response) {
  const { statusCode = HttpStatuses.INTERNAL_SERVER_ERROR, message } = err;

  res.status(statusCode).json({
    message:
      statusCode === HttpStatuses.INTERNAL_SERVER_ERROR
        ? AppMessages.INTERNAL_SERVER_ERROR
        : message,
  });
}
