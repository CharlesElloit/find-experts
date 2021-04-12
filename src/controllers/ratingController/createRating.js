const collection = require("../../models");
const { RatingValidate } = require("../../models/Rating.model");

const createRate = async (req, res) => {
  const { error } = RatingValidate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  // TODO: get employerId
  // TODO: get serviceId

  const { rating, comment } = req.body;

  const ratingData = collection.Rating({
    rating,
    comment,
  });

  const createdRating = await collection.Rating.create(ratingData);

  if (!createdRating) {
    return res.status(500).json({
      error: "Can't save the rating data please try again.",
    });
  }

  res.status(201).json({
    message: "Rating created Successfully",
    ratingID: createdRating._id,
  });
};
