import { Document } from "mongoose";

export default interface IReview extends Document {
  userId: string;
  comment: string;
}
