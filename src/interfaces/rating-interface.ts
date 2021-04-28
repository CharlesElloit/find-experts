import { Document } from "mongoose";

export default interface RatingInterface extends Document {
  userId: string;
  rating: number;
  created: object;
  updated: object;
}
