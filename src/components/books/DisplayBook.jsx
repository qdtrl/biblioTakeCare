import Like from '../likes/Like';
import React from 'react';

// const useStateLike = ({fav_icon}) => {
//   const [isFav, setIsFav] = React.useState(fav_icon);
//   const setInFav = (event) => {
//     setIsFav(!isFav);
//   };
//   return (
//     <>
//     </>
//   );
// };
// const memoizedFav = React.useMemo(() => setFav(book), book);

const DisplayBook = ({book}) => {
  const {title, thumbnailUrl, isFav} = book;
  
  return (
    <div className="book__card">
      <div className="images">
        <img src={thumbnailUrl} alt={title.toLowerCase()}/>
        <Like fav_icon={isFav}/>
      </div>
      <h2>{title}</h2>
    </div>
  );
};



export default DisplayBook;