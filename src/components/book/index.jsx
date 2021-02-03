import Like from '../likes/';
import Read from '../read/';

const DisplayBook = ({book, favorites, setFavorites, read, setRead}) => {
  const {title, thumbnailUrl, isbn} = book;

  return (
    <li className="book__card">
      <div className="images">
        <img src={thumbnailUrl} alt={title.toLowerCase()}/>
        <Like 
          favorites={favorites}
          id={isbn}
          setFavorites={setFavorites}
        />
        <Read 
          read={read}
          id={isbn}
          setRead={setRead}
        />
      </div>
      <h2>{title}</h2>
    </li>
  );
};



export default DisplayBook;