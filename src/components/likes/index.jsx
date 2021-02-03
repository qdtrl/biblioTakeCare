const Like = ({favorites, id, setFavorites}) => {
  const handleFav = (event) => {
    if (favorites.includes(id)) {
      favorites.splice(favorites.indexOf(id), 1);
      event.target.className = "likeBtn";
      setFavorites(favorites);
    } else {
      event.target.className = "likeBtn red";
      setFavorites([...favorites, id]);
    }
  };

  return (
      <div className={"likeBtn"} onClick={handleFav}></div>
  );
};

export default Like;