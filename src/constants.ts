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
  INVALID_INPUT = "Запрашиваемый ресурс не найден",
  WRONG_CREATE_CARD_DATA = "Переданы некорректные данные при создании карточки",
  WRONG_CARD_ID = "Некорректный ID карточки",
  CANNOT_DELETE_FOREIGN_CARD = "Нельзя удалять чужую карточку",
  CARD_DELETED = "Карточка удалена",
  CARD_NOT_FOUND = "Карточка не найдена",
  USER_NOT_FOUND_ERROR = "Пользователь не найден",
  USER_CREATE_INVALID_DATA = "Переданы некорректные данные при создании пользователя",
  EMAIL_ALREADY_EXISTS = "Пользователь с таким email уже существует",
  WRONG_USER_ID = "Некорректный ID пользователя",
  USER_UPDATE_AVATAR_INVALID_DATA = "Некорректные данные при обновлении аватара",
  USER_UPDATE_PROFILE_INVALID_DATA = "Некорректные данные при обновлении профиля",
  USER_INVALID_LOGIN_DATA = "Неправильные почта или пароль",
  INCORRECT_REQUEST = "Некорректный запрос",
  FORBIDDEN_REQUEST = "Доступ запрещён",
  AUTH_REQUESTED = "Необходима авторизация",
  WRONG_TOKEN = "Неверный токен",
  INTERNAL_SERVER_ERROR = "На сервере произошла ошибка",
  INVALID_EMAIL = "Некорректный email",
  INVALID_AVATAR_URL = "Некорректный URL аватара",
}

export const urlRegex =
  /^https?:\/\/(www\.)?[\w\\-]+(\.[\w\\-]+)+([\w\-._~:/?#[\]@!$&'()*+,;=]*)#?$/;
