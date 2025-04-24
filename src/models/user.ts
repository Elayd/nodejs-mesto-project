import { Schema, model, Document } from "mongoose";
import validator from "validator";

export interface IUser extends Document {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Field "name" is required'],
      minlength: [2, 'Field "name" must be at least 2 characters'],
      maxlength: [30, 'Field "name" must be less than 30 characters'],
    },
    about: {
      type: String,
      required: [true, 'Field "about" is required'],
      minlength: [2, 'Field "about" must be at least 2 characters'],
      maxlength: [200, 'Field "about" must be less than 200 characters'],
    },
    avatar: {
      type: String,
      required: [true, 'Field "avatar" is required'],
      validate: {
        validator: validator.isURL,
        message: 'Field "avatar" must contain a valid URL',
      },
    },
  },
  { versionKey: false }
);

export default model<IUser>("user", userSchema);
