const { Film } = require('../models/film.model');
const { FilmImg } = require('../models/filmImg.model');
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const filmExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const film = await Film.findOne({
    where: { id },
    include: {
      model: FilmImg,
      attributes: ['id', 'imgUrl', 'publicId', 'filmId'],
    },
  });
  //   console.log(film);
  if (!film) {
    return next(new AppError('Pelicula no existe', 404));
  }

  req.film = film;
  next();
});

module.exports = { filmExists };
