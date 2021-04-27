import Joi from "joi";
import collection from "../../models";
import { Request, Response } from "express";

const contractorValidator = (data: Object) => {
  const schema = Joi.object({
    occupation: Joi.string().required().trim().strip(),
    cellPhone: Joi.string().required().trim().strip(),
    status: Joi.string().required().trim().strip(),
    price: Joi.number().required(),
    bio: Joi.string().required().trim().strip(),
  });

  return schema.validate(data);
};

const createContractor = async (
  req: Request,
  res: Response,
): Promise<Object> => {
  // validation
  const { error } = contractorValidator(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  const { userId } = req.headers;

  const newContractor = collection.Contractor({
    userId,
    occupation: req.body.occupation,
    cellPhone: req.body.cellPhone,
    location: req.body.location,
    status: req.body.status,
    price: req.body.price,
    bio: req.body.bio,
  });

  const createdContractor:Boolean = await collection.Contractor.create(newContractor);

  if (!createdContractor) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }

  res.status(201).json({
    message: "Successfully Created",
    contractorId: newContractor._id,
  });
};

export default createContractor;
