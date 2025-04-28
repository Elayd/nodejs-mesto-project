import { AppMessages, HttpStatuses } from "../constants";

class NotFoundError extends Error {
  statusCode: number;

  constructor(message = AppMessages.INVALID_INPUT) {
    super(message);
    this.statusCode = HttpStatuses.NOT_FOUND;
  }
}

export default NotFoundError;
