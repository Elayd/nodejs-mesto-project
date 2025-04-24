import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import cardRoutes from "./routes/cards";
import { AppMessages, HttpStatuses } from "./constants";

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/mestodb")
  .then(() => {
    console.log("MongoDb connection established");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use((req: Request, _res: Response, next: NextFunction) => {
  req.user = {
    _id: "680a4ba55838b36d9182352d",
  };
  next();
});

app.use("/users", userRoutes);
app.use("/cards", cardRoutes);

app.use("*", (_req: Request, res: Response) => {
  res
    .status(HttpStatuses.NOT_FOUND)
    .send({ message: AppMessages.INVALID_INPUT });
});

app.use((err: Error, _req: Request, res: Response) => {
  console.error(err.stack);
  res
    .status(HttpStatuses.INTERNAL_SERVER_ERROR)
    .send({ message: AppMessages.INTERNAL_SERVER_ERROR });
});

app.listen(PORT, () => {
  console.log(`Server listening port: ${PORT}`);
});
