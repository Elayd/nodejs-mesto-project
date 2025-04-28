import { AppMessages, HttpStatuses } from "../constants";

class ForbiddenError extends Error {
  statusCode: number;

  constructor(message = AppMessages.FORBIDDEN_REQUEST) {
    super(message);
    this.statusCode = HttpStatuses.FORBIDDEN;
  }
}

export default ForbiddenError;
