import { useEffect, useState } from 'react';
import axios from 'axios';
import FilmImg from '../components/FilmImg';
import { Link } from 'react-router-dom';

const Films = () => {
  const [films, setFilms] = useState([]);

  console.log(films);
  useEffect(() => {
    const request = async () => {
      try {
        const res = await axios.get('http://localhost:3520/api/v1/films');
        setFilms(res.data.films);
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }, []);
  const getAllFilms = async () => {
    try {
      const res = await axios.get('http://localhost:3520/api/v1/films');
      setFilms(res.data.films);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFilm = async id => {
    try {
      await axios.delete(`http://localhost:3520/api/v1/films/${id}`);
      getAllFilms();
    } catch (error) {
      alert('error insperado');
    }
  };
  return (
    <div className="text-center ">
      <h3 className="text-4xl font-extrabold text-blue-800 mb-2 ">
        Listado de peliculas
      </h3>
      <ul className="container mx-auto grid-responsive p-4 gap-4">
        {films.map(film => (
          <li className="border bg-gray-600 p-5 rounded-xl flex flex-col justify-between" key={film.id}>
            <h3 className="uppercase text-xl font-bold text-yellow-400">
              {film.name}
            </h3>
            <p className=" flex flex-col text-justify   items-center p-3 ">
              <span className="text-xl text-yellow-300">Sinopsis: </span>{' '}
              <span>{film.sinopsis}</span>
            </p>
            <p className=" flex  flex-col  justify-around">
              <span className="text-yellow-300">Reparto: </span>{' '}
              <span>{film.reparto}</span>
            </p>
            <p className=" flex flex-col   justify-center item-center">
              <span className="text-yellow-300">Trailer: </span>{' '}
              <a className="lg:text-xs" href={film.trailerUrl}>
                {film.trailerUrl}
              </a>
            </p>
            <p className="flex   justify-between">
              <span className="text-yellow-300"> Lenguaje: </span>{' '}
              <span>{film.language}</span>
            </p>{' '}
            <p className=" flex   justify-between">
              <span className="text-yellow-300"> Clasificacion: </span>{' '}
              <span>{film.classification.type}</span>
            </p>
            <p className=" flex   justify-between">
              <span className="text-yellow-300">Duracion: </span>{' '}
              <span>{film.duration} mins</span>
            </p>
            <p className=" flex   justify-between">
              <span className="text-yellow-300">Fecha de extreno: </span>
              <span>{new Date(film.releaseDate).toLocaleDateString()}</span>
            </p>
            <p className=" flex   justify-between">
              <span className="text-yellow-300">Director: </span>{' '}
              <span>{film.filmDirector}</span>
            </p>{' '}
            <div className="mx-auto">
              <FilmImg imgUrl={film.filmImgs} />
            </div>
            <div className="mt-3 flex gap-3 justify-center">
              <Link to={`/update-film/${film.id}`}>
                <button className="p-2">Editar</button>
              </Link>
              <button
                onClick={() => {
                  deleteFilm(film.id);
                }}
                className="bg-red-500 p-2"
              >
                Eliminar
              </button>
              <Link to={`/create-film`}>
                <button className="bg-green-500 p-2">Nueva</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Films;
