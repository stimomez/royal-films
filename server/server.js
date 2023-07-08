const { app } = require('./app');
const { Classification } = require('./models/classification.model');
const { Film } = require('./models/film.model');
const { FilmImg } = require('./models/filmImg.model');
const { db } = require('./utils/dataBase.util');

db.authenticate()
  .then(() => 'Db authenticated')
  .catch(err => console.log(err));
// relacion de tablas
Film.hasMany(FilmImg);
FilmImg.belongsTo(Film);

Classification.hasMany(Film);
Film.belongsTo(Classification);

db.sync()
  .then(() => console.log('Db synced'))
  .catch(err => console.log(err));

PORT = 3520;

app.listen(PORT, () => console.log('Express app running!!!', PORT));
