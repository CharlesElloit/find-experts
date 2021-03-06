import { Document } from "mongoose";

export default interface IUser extends Document {
  name: string;
  email: string;
  isContractor: boolean;
  password: string;
  generateAccessToken: Function;
}
