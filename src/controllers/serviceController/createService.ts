const collection = require("../../models");

const createService = async (req, res, next) => {
  console.log(req.user);
};

module.exports = createService;
