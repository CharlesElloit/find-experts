const { isValidObjectId } = require("mongoose");
const collection = require("../../models");

const getContractor = async (req, res) => {
  if (isValidObjectId(req.headers.userId)) {
    const contractor = await collection.Contractor.find().where("userId").equals(req.params.contractorId);
    if (!contractor) {
      return res.status(404).json({
        contractorError: "Contractor not found!",
      });
    }
    res.status(200).json(contractor);
  }
};

module.exports = getContractor;
