import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center flex flex-col item-center justify-center mt-40">
      <h2 className="text-4xl py-5">Royal films</h2>
      <div className="flex justify-center item-center">
        <button
          className="py-7 px-10 rounded-xl mr-5"
          onClick={() => {
            navigate('/create-film');
          }}
        >
          Crear Pelicula
        </button>
        <button
          className="py-7 px-10 rounded-xl"
          onClick={() => {
            navigate('/films');
          }}
        >
          Ver Peliculas
        </button>
      </div>
    </div>
  );
};

export default Home;
