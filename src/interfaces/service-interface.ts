import { Document } from "mongoose";

export default interface IService extends Document {
  name: string;
  serviceDate: number;
  serviceTime: number;
  selectContractor: string;
  contractors: string[];
  employerId: string;
  priceRange: number;
  pending: boolean;
  location: object;
}
