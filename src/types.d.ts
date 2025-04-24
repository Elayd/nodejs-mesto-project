import { ObjectId } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string | number | ObjectId | ObjectIdLike | Buffer | Uint8Array;
      };
    }
  }
}
