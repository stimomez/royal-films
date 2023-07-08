const { Classification } = require('../models/classification.model');
const { FilmImg } = require('../models/filmImg.model');
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const classificationExists = catchAsync(async (req, res, next) => {
  const id = req.params.id || req.body.classificationId;

  const classification = await Classification.findOne({
    where: { id },
  });

  if (!classification) {
    return next(new AppError('Clasificacion no existe', 404));
  }

  req.classification = classification;
  next();
});

module.exports = { classificationExists };
