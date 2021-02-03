import React from 'react';

const Like = ({fav_icon}) => {
  const [isFav, setIsFav] = React.useState(fav_icon);

  const setInFav = (event) => {
    console.log(isFav);
    setIsFav((!isFav));
    console.log(isFav);
  };
  return (
    <>
      <div className={`fav-icon${isFav ? '__red' : ''}`} onClick={setInFav}></div>
    </>
  );
};

export default Like;