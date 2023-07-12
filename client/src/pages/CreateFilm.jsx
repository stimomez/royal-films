import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CreateFilm = () => {
  const [classifications, setClassifications] = useState([]);
  const [newClassification, setNewClassification] = useState('');
  const [btnCreateClassification, setBtnCreateClassification] = useState(false);
  const [classificationSelected, setClassificationSelected] = useState('');
  const [classificationId, setClassificationId] = useState('');

  const [films, setFilms] = useState({
    name: '',
    // classification: '',
    language: '',
    duration: '',
    releaseDate: '',
    sinopsis: '',
    trailerUrl: '',
    filmDirector: '',
    filmImg: null,
    reparto: '',
  });

  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    requestClassifications();
    (async () => {
      try {
        if (params.id) {
          const res = await axios.get(
            `http://localhost:3520/api/v1/films/${params.id}`
          );

          setFilms(res.data.film);
        }
      } catch (error) {
        alert('Error');
      }
    })();
  }, [params]);

  const schema = Yup.object().shape({
    name: Yup.string().required('El nombre  es requerido'),
    language: Yup.string().required('El idioma es requerido'),
    duration: Yup.number().required('La duracion es requerida'),
    releaseDate: Yup.date().required('La fecha  es requerida'),
    sinopsis: Yup.string().required('La sinopsis es requerida'),
    trailerUrl: Yup.string().required('La url del trailer es requerido'),
    // filmImg: Yup.string().required('El nombre  es requerido'),
    filmDirector: Yup.string().required('Este campo  es requerido'),
    reparto: Yup.string().required('El reparto es requerida'),
  });

  const requestCreateFilms = async data => {
    const form = new FormData();
    console.log(data);

    // transforma en formulario
    for (let key in data) {
      form.append(key, data[key]);
    }
    try {
      {
        params.id
          ? await axios.patch(
              `http://localhost:3520/api/v1/films/${params.id}`,
              form,
              {
                headers: { 'Content-Type': 'multipart/form-data' },
              }
            )
          : await axios.post('http://localhost:3520/api/v1/films', form, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
      }

      navigate('/films');
    } catch (error) {
      alert('Error');
      console.log(error);
    }
  };

  const requestClassifications = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3520/api/v1/films/classification`
      );
      setClassifications(res.data.classification);
    } catch (error) {
      alert('Error');
    }
  };

  const createClassification = async () => {
    try {
      await axios.post(`http://localhost:3520/api/v1/films/classification`, {
        type: newClassification,
      });
      requestClassifications();
    } catch (error) {
      alert('Error');
      console.log(error);
    }
  };

  const deleteClassification = async id => {
    try {
      await axios.delete(
        `http://localhost:3520/api/v1/films/classification/${id}`
      );
      requestClassifications();
    } catch (error) {
      alert('Error');
      console.log(error);
    }
  };

  return (
    <div className="text-center  p-4">
      <h3 className="text-3xl font-extrabold">Crear pelicula</h3>
      <Formik
        initialValues={films}
        validationSchema={schema}
        onSubmit={values => {
          // , action

          if (!classificationSelected) {
            alert('selecione clasificacion');
          } else {
            values.classificationId = classificationId;
            requestCreateFilms(values);
          }
        }}
        enableReinitialize={true}
      >
        {({ handleSubmit, setFieldValue }) => (
          <Form
            className="bg-gray-600 text-white  container mx-auto text-center w-1/2 p-5 rounded-xl mt-3"
            onSubmit={handleSubmit}
          >
            <div>
              <div className="mx-auto relative border border-gray-400  rounded mb-3   ">
                <Field
                  name="name"
                  placeholder="Nombre"
                  className="w-full h-full px-2 py-3 outline-darkblue_notiEmpleo "
                />
              </div>

              <ErrorMessage
                component="p"
                className="text-red-400 text-sm -mt-3 "
                name="name"
              />
            </div>
            <div className="drop-down-list ">
              <h2 className="text-lg" htmlFor="classification">
                Clasificacion
              </h2>

              <div required name="classification" id="classification">
                <input type="checkbox"  id="checkbox-list" />

                <label htmlFor="checkbox-list" className="cursor-pointer">
                  <span>
                    {classificationSelected
                      ? classificationSelected
                      : 'Seleccione'}
                  </span>

                  <i className="fa-solid fa-caret-down ml-2"></i>
                </label>

                <ul>
                  {classifications.map(classification => (
                    <div
                      className="flex justify-between  "
                      key={classification.id}
                    >
                      <label
                        className="cursor-pointer block hover:text-lg mx-auto hover:text-gray-200"
                        htmlFor="checkbox-list"
                        onClick={() => {
                          setClassificationSelected(classification.type);
                          setClassificationId(classification.id);
                        }}
                      >
                        {classification.type}
                      </label>
                      {/* 
                      <i
                        onClick={() => deleteClassification(classification.id)}
                        className="fa-sharp fa-solid fa-trash cursor-pointer"
                      ></i> */}
                    </div>
                  ))}
                  <li
                    className="cursor-pointer  hover:border w-full mx-auto text-gray-700 mb-3"
                    onClick={() =>
                      setBtnCreateClassification(!btnCreateClassification)
                    }
                  >
                    {btnCreateClassification ? 'Cerrar' : 'Nueva '}
                  </li>
                  {btnCreateClassification && (
                    <div className="flex flex-col item-center justify-center">
                      <input
                        required
                        onChange={e => setNewClassification(e.target.value)}
                        className="w-1/2 mx-auto"
                        type="text"
                      />
                      <button
                        className="w-28 h-9 mx-auto"
                        onClick={createClassification}
                        type="button"
                      >
                        Crear
                      </button>
                    </div>
                  )}
                </ul>
              </div>
            </div>
            <div>
              <div className="mx-auto relative border border-gray-400  rounded mb-3   ">
                <Field
                  name="language"
                  placeholder="Idioma"
                  className="w-full h-full px-2 py-3 "
                />
              </div>

              <ErrorMessage
                component="p"
                className="text-red-400 text-sm -mt-3 "
                name="language"
              />
            </div>
            <div>
              <div className="mx-auto relative border border-gray-400  rounded mb-3   ">
                <Field
                  title="Solo escribe el numero de minutos de la pelicula"
                  type="number"
                  min="1"
                  name="duration"
                  placeholder="Duracion de la pelicula en minutos"
                  className="w-full h-full px-2 py-3 outline-darkblue_notiEmpleo "
                />
              </div>

              <ErrorMessage
                component="p"
                className="text-red-400 text-sm -mt-3 "
                name="duration"
              />
            </div>
            <div>
              <label htmlFor="releaseDate"> Fecha de extreno</label>
              <div className="mx-auto relative border border-gray-400  rounded mb-3   ">
                <Field
                  type="date"
                  name="releaseDate"
                  placeholder="Fecha de extreno"
                  className="w-full h-full px-2 py-3 outline-darkblue_notiEmpleo "
                />
              </div>

              <ErrorMessage
                component="p"
                className="text-red-400 text-sm -mt-3 "
                name="releaseDate"
              />
            </div>
            <div>
              <div className="mx-auto relative border border-gray-400  rounded mb-3   ">
                <Field
                  type="url"
                  name="trailerUrl"
                  placeholder="Url del trailer"
                  className="w-full h-full px-2 py-3 outline-darkblue_notiEmpleo "
                />
              </div>

              <ErrorMessage
                component="p"
                className="text-red-400 text-sm -mt-3 "
                name="trailerUrl"
              />
            </div>{' '}
            <div>
              <div className="mx-auto relative border border-gray-400  rounded mb-3   ">
                <Field
                  name="filmDirector"
                  placeholder="Director"
                  className="w-full h-full px-2 py-3 "
                />
              </div>

              <ErrorMessage
                component="p"
                className="text-red-400 text-sm -mt-3 "
                name="filmDirector"
              />
            </div>{' '}
            <div>
              <label htmlFor="filmImg"> Imagen de la pelicula</label>
              <div className="mx-auto relative border border-gray-400  rounded mb-3   ">
                <input
                  name="filmImg"
                  type="file"
                  className="w-full h-full px-2 py-3 "
                  onChange={e => setFieldValue('filmImg', e.target.files[0])}
                />
              </div>

              <ErrorMessage
                component="p"
                className="text-red-400 text-sm -mt-3 "
                name="filmImg"
              />
            </div>
            <div className=" ">
              <label htmlFor="reparto">Reparto</label>
              <Field
                className="w-full mb-3  resize-none   px-2 py-3 rounded"
                as="textarea"
                name="reparto"
                placeholder="Nombre de los actores "
              />

              <ErrorMessage
                component="p"
                className="text-red-400 text-sm -mt-5 "
                name="reparto"
              />
            </div>
            <div className="mx-auto relative rounded mb-3   ">
              <label htmlFor="sinopsis">Sinopsis</label>

              <Field
                as="textarea"
                name="sinopsis"
                placeholder="sinopsis"
                className="w-full h-full px-2 py-3 rounded"
              />
              <div>
                <ErrorMessage
                  component="p"
                  className="text-red-400 text-sm "
                  name="sinopsis"
                />
              </div>
            </div>
            <div className='flex gap-3 justify-center'>
              <button className="py-2 px-4" type="submit">
                {' '}
                {params.id ? 'Editar' : 'Guardar'}
              </button>
              
              <button onClick={()=> navigate('/films')} className="py-2 px-4" type="button">
                Ver peliculas
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateFilm;
