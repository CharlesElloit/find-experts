const collection = require("../../models");
// const { contractorValidator } = require("../../models/Contractor.model");

const createContractor = async (req, res) => {
  // validation
  // const { error } = contractorValidator(req.body);
  // if (error) {
  //   return res.status(400).json({
  //     error: error.details[0].message,
  //   });
  // }

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

  const createdContractor = await collection.Contractor.create(newContractor);

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

module.exports = createContractor;
