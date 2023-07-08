const { catchAsync } = require('../utils/catchAsync.util');
const { uploadImage, deleteImage } = require('../utils/cloudinary.util');

const { AppError } = require('../utils/appError.util');
const { Film } = require('../models/film.model');
const { Classification } = require('../models/classification.model');
const { FilmImg } = require('../models/filmImg.model');
const { removeImgLocal } = require('../utils/extra.util');

const createClassification = catchAsync(async (req, res, next) => {
  const { type } = req.body;

  const newClassification = await Classification.create({
    type,
  });

  return res.status(200).json({
    status: 'success',
    newClassification,
  });
});

const getAllClassification = catchAsync(async (req, res, next) => {
  const classification = await Classification.findAll({});
  return res.status(200).json({
    status: 'success',
    classification,
  });
});

const deleteClassification = catchAsync(async (req, res, next) => {
  const { classification } = req;

  await classification.destroy({});

  await res.status(204).json({
    status: 'success',
  });
});

const createFilm = catchAsync(async (req, res, next) => {
  const { classification } = req;
  const {
    name,
    language,
    duration,
    releaseDate,
    trailerUrl,
    sinopsis,
    filmDirector,
    reparto,
  } = req.body;
  console.log(req.body);

  const newFilm = await Film.create({
    name,
    duration,
    language,
    trailerUrl,
    duration,
    filmDirector,
    classificationId: classification.id,
    sinopsis,
    releaseDate: new Date(releaseDate),
    reparto,
  });

  const urlImgs = [];
  // sube las imagenes a cloudinary
  if (req.files.length > 0) {
    const folder = `Poster`;

    const promiseFiles = req.files.map(async file => {
      const uploadResult = await uploadImage(folder, file.path);

      await removeImgLocal(file.path);

      const newFilmImg = await FilmImg.create({
        imgUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        filmId: newFilm.id,
      });
      urlImgs.push(newFilmImg);
    });
    await Promise.all(promiseFiles);
  }

  return res.status(200).json({
    status: 'success',
    newFilm,
    urlImgs,
  });
});

const getAllFilms = catchAsync(async (req, res, next) => {
  const films = await Film.findAll({
    include: [
      {
        model: FilmImg,
        attributes: ['id', 'imgUrl', 'publicId'],
        required: false,
      },
      { model: Classification, attributes: ['id', 'type'] },
    ],
  });
  return res.status(200).json({
    status: 'success',
    films,
  });
});

const updateFilm = catchAsync(async (req, res, next) => {
  const { film } = req;
  const {
    name,
    language,
    classification,
    duration,
    releaseDate,
    trailerUrl,
    sinopsis,
    filmDirector,
    reparto,
  } = req.body;

  if (req.files.length > 0) {
    const folder = `Poster`;

    //  para saber si hay imagenes
    if (film.filmImgs.length > 0) {
      await Promise.all(
        // elimina las imagenes existentes
        film.filmImgs.map(async img => {
          const res = await deleteImage(img.publicId);
          console.log(img);
        })
      );
    }

    // Guarda las imagenes nuevas
    const promiseFiles = req.files.map(async file => {
      const uploadResult = await uploadImage(folder, file.path);

      await removeImgLocal(file.path);

      const newFilmImg = await FilmImg.update(
        {
          imgUrl: uploadResult.secure_url,
          publicId: uploadResult.public_id,
        },
        { where: { filmId: film.id } }
      );
      // urlImgs.push(newFilmImg);
    });
    await Promise.all(promiseFiles);
  }
  const newFilm = {
    name,
    language,
    classification,
    duration,
    trailerUrl,
    sinopsis,
    filmDirector,
    reparto,
  };

  //Para controlar que la fecha si viene vacia
  releaseDate ? (newFilm.releaseDate = new Date(releaseDate)) : '';

  await film.update(newFilm);

  return res.status(204).json({
    status: 'success',
  });
});

const deleteFilm = catchAsync(async (req, res, next) => {
  const { film } = req;

  //  para saber si hay imagenes
  if (film.filmImgs.length > 0) {
    await Promise.all(
      // elimina las imagenes existentes
      film.filmImgs.map(async img => {
        await deleteImage(img.publicId);
      })
    );
  }

  await film.destroy({});

  await res.status(204).json({
    status: 'success',
  });
});

const getFilmById = catchAsync(async (req, res, next) => {
  const { film } = req;

  await res.status(200).json({
    status: 'success',
    film,
  });
});

module.exports = {
  createFilm,
  getAllFilms,
  updateFilm,
  deleteFilm,
  getFilmById,

  createClassification,
  getAllClassification,
  deleteClassification,
};
