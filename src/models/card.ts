import { Schema, model, Document } from "mongoose";
import validator from "validator";

const VALIDATION_MESSAGES = {
  NAME_REQUIRED: 'Field "name" is required',
  NAME_MIN: 'Field "name" must be at least 2 characters',
  NAME_MAX: 'Field "name" must be less than 30 characters',

  LINK_REQUIRED: 'Field "link" is required',
  LINK_INVALID: 'Field "link" must contain a valid URL',
};

export interface ICard extends Document {
  name: string;
  link: string;
  owner: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const cardSchema = new Schema<ICard>(
  {
    name: {
      type: String,
      required: [true, VALIDATION_MESSAGES.NAME_REQUIRED],
      minlength: [2, VALIDATION_MESSAGES.NAME_MIN],
      maxlength: [30, VALIDATION_MESSAGES.NAME_MAX],
    },
    link: {
      type: String,
      required: [true, VALIDATION_MESSAGES.LINK_REQUIRED],
      validate: {
        validator: validator.isURL,
        message: VALIDATION_MESSAGES.LINK_INVALID,
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    likes: {
      type: [Schema.Types.ObjectId],
      default: [],
      ref: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

export default model<ICard>("card", cardSchema);
