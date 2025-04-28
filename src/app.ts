import express, { Request, Response } from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import cardRoutes from "./routes/cards";
import { AppMessages, HttpStatuses } from "./constants";
import dotenv from "dotenv";
import { errorLogger, requestLogger } from "./middlewares/logger";
import { createUser, login } from "./controllers/users";
import { validateSignin, validateSignup } from "./middlewares/validators";
import auth from "./middlewares/auth";
import { errors } from "celebrate";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

const { PORT = 3000, DB_ADDRESS = "mongodb://localhost:27017/mestodb" } =
  process.env;

const app = express();

app.use(express.json());

app.use(requestLogger);

app.post("/signup", validateSignup, createUser);
app.post("/signin", validateSignin, login);

app.use(auth);

app.use("/users", userRoutes);
app.use("/cards", cardRoutes);

app.use("*", (_req: Request, res: Response) => {
  res
    .status(HttpStatuses.NOT_FOUND)
    .send({ message: AppMessages.INVALID_INPUT });
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose
  .connect(DB_ADDRESS)
  .then(() => {
    console.log("MongoDb connection established");
    app.listen(PORT, () => {
      console.log(`Server listening port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
