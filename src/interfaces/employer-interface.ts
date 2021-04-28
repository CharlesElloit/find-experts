import { Document } from "mongoose";

export default interface EmployerInterface extends Document {
  userId: string;
  cellPhone: string;
  officeOrHomeNo: string;
  location: object;
}
