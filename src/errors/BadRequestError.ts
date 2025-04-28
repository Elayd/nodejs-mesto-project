import { AppMessages, HttpStatuses } from "../constants";

class BadRequestError extends Error {
  statusCode: number;

  constructor(message = AppMessages.INCORRECT_REQUEST) {
    super(message);
    this.statusCode = HttpStatuses.BAD_REQUEST;
  }
}

export default BadRequestError;
