import { HttpStatuses } from "../constants";

export default class ConflictError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HttpStatuses.CONFLICT;
  }
}
