export enum HttpStatuses {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export enum AppMessages {
  AUTH_REQUIRED = "Authorization required",
  LOGIN_SUCCESS = "Login successful",
  LOGOUT_SUCCESS = "Logout successful",
  USER_EXISTS = "A user with this email already exists",
  USER_NOT_FOUND = "Requested user not found",
  INVALID_INPUT = "All fields must be filled in or be correct",
  CARD_NOT_FOUND = "Card not found",
  CARD_DELETED = "Card deleted successfully",
  FORBIDDEN_ACTION = "You are not allowed to delete this card",
  NOT_FOUND = "Page not found",
  INTERNAL_SERVER_ERROR = "Internal Server Error",
  INVALID_CARD_ID = "Wrong card id",
  USER_NOT_FOUND_ERROR = "User doesn't exists",
  INVALID_USER_ID = "Wrong user id",
  USER_VALIDATION_ERROR = "User's data isn't valid",
}
