import React from 'react';
import ReactLoading from 'react-loading';
import SearchBar from './search_bar/';
import DisplayBook from './book/';

const App = () => {
  const [books, setBooks] = React.useState(null);
  const [categories, setCategories] = React.useState(null);
  const [booksDisplay, setBooksDisplay] = React.useState(null);
  const [read, setRead] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);

  const getBooks = () => {
    fetch('https://gist.githubusercontent.com/MathisDYKDan/76bc73ec77481ccb82677cc7c0d8b524/raw/a23c99027b9bfc1bfdb22e22ddcb4301a5f870ee/books.json')
      .then(response => response.json())
      .then(data => {
        setBooks(data.books[0]);
      });
  };

  const getCategories = () => {
    const cats = books.reduce((acc, book) => {       
        book.categories.forEach((categorie) => {
          if (!acc.includes(categorie)) {
            acc.push(categorie);
          }
        });
      return acc;
    }, []);
    cats.sort();
    cats.unshift("All Categories");
    setCategories(cats);
  }

  React.useEffect(() => {
    getBooks();
  }, []);

  React.useEffect(() => {
    if (books) {
      getCategories();
      if (!booksDisplay) {
        setBooksDisplay(books);
      }
    };
  },[books]);

  return (
    <>
      <h1>Bienvenue sur <span>BiblioTakeCare</span></h1>
      {
        categories &&
        <SearchBar
          books={books}
          categories={categories}
          read={read}
          favorites={favorites}
          setBooksDisplay={setBooksDisplay}
        /> ||
        <div className="load">
          <ReactLoading type={'spokes'} color={'orange'} height={'60px'} width={'60px'} />
          <p>Chargement...</p>
        </div>
      }
      {
        booksDisplay &&
        <ul>
          { booksDisplay.map((book, index) => (
            <DisplayBook 
              book={book}
              favorites={favorites}
              setFavorites={setFavorites}
              read={read}
              setRead={setRead}
              key={index.toString()}
            />
          ))}
        </ul>
      }
    </>
  )
};

export default App;