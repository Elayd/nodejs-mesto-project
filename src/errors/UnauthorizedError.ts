import { AppMessages, HttpStatuses } from "../constants";

class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message = AppMessages.AUTH_REQUESTED) {
    super(message);
    this.statusCode = HttpStatuses.UNAUTHORIZED;
  }
}

export default UnauthorizedError;
