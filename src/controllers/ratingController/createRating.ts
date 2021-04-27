import Joi from "joi";
import collection from "../../models";
import { Request, Response } from "express";

const RatingValidate = (data) => {
  const schema = Joi.object({
    rating: Joi.number().required().min(0).max(5),
  });
  return schema.validate(data);
};

const createRating = async (req: Request, res: Response): Promise<T> => {
  const { error } = RatingValidate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  const ratingData = collection.Rating({
    userId: req.params.userId,
    rating: req.body.rating,
    created: {
      created_by: req.user.userId,
    },
  });

  const userRatings = await collection.Rating.find({})
    .where("userId")
    .equals(req.params.userId);

  if (userRatings.length > 0) {
    userRatings.forEach(async (rating) => {
      if (
        JSON.stringify(rating.created.created_by) ===
        JSON.stringify(req.user.userId)
      ) {
        return res.status(400).json({
          error: "You can only give rating once.",
        });
      }
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
    });
  } else {
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
  }
};

export default createRating;
