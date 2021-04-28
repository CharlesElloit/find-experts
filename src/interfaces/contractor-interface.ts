import { Document } from "mongoose";

export default interface IContractor extends Document {
  userId: string;
  occupation: string;
  cellPhone: string;
  location: object;
  status: string;
  bio: string;
  price: number;
}
