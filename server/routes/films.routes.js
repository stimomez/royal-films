const express = require('express');

const { upload } = require('../utils/upload.util');
const {
  getAllFilms,
  createFilm,
  updateFilm,
  deleteFilm,
  createClassification,
  getAllClassification,
  deleteClassification,
  getFilmById,
} = require('../controllers/film.controller');
const { filmExists } = require('../middlewares/film.middleware');
const {
  classificationExists,
} = require('../middlewares/classification.middleware');

const filmRouter = express.Router();

filmRouter.get('/classification', getAllClassification);

filmRouter.post('/classification', createClassification);

filmRouter.delete(
  '/classification/:id',
  classificationExists,
  deleteClassification
);

filmRouter.get('/', getAllFilms);

filmRouter.post(
  '/',
  upload.array('filmImg', 3),
  classificationExists,
  createFilm
);

filmRouter
  .route('/:id')
  .get(filmExists, getFilmById)
  .patch(upload.array('filmImg', 3), filmExists, updateFilm)
  .delete(filmExists, deleteFilm);

module.exports = { filmRouter };
