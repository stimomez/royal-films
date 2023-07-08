const FilmImg = ({ imgUrl }) => {

  return (
    <div>
      <img className="w-40  mx-auto " src={imgUrl[0]?.imgUrl} alt="" />
    </div>
  );
};

export default FilmImg;
