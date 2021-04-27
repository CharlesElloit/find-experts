import { isValidObjectId } from "mongoose";
import collection from "../../models";
import { Request, Response } from "express";

//Promise<ContractorArray[]>
const getContractor = async (req: Request, res: Response): Promise<T> => {
  if (isValidObjectId(req.headers.userId)) {
    const contractor: [] = await collection.Contractor.find()
      .where("userId")
      .equals(req.params.contractorId);
    if (!contractor) {
      return res.status(404).json({
        contractorError: "Contractor not found!",
      });
    }
    res.status(200).json(contractor);
  }
};

export default getContractor;
