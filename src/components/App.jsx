import React from 'react';
import ReactLoading from 'react-loading';

import DisplayBook from './books/DisplayBook';
import DisplayCategorie from './categories/DisplayCategorie';

const App = () => {
  const [books, setBooks] = React.useState(null);
  const [booksDisplay, setBooksDisplay] = React.useState(null);
  const [search, setSearch] = React.useState(null);
  const [categories, setCategories] = React.useState(null);
  const [favorites, setFavorites] = React.useState(null);

  const handleFav = (id) => {
    setFavorites([...favorites, id]);
  };


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
  }, [books]);

  const updateDisplayBySearch = (event) => {
    const searchBarValue = event.target.value.toLowerCase();
    if (searchBarValue === "") {
      setBooksDisplay(books);
    } else {
      
      const regeX = RegExp(`${searchBarValue}.`)
      const booksSearch = books.reduce(
        (acc, book) => { 
        if(-1 !== (book.title.toLowerCase().search(regeX))) {
          acc.push(book);
          console.log(acc);
        };
        return acc;
      }, []);
      console.log(booksSearch);
      setBooksDisplay(booksSearch);
    }
  };

  const updateDisplayByCategories = (event) => {
    const cat = event.target.value;
    if (cat === "All Categories") {
      setBooksDisplay(books);
    } else {
      const booksCat = [];
      books.forEach((book) => {       
        if(book.categories.includes(cat)) {
          booksCat.push(book);
        }
      });
      setBooksDisplay(booksCat);
    }
  };

  return (
    <>
      <h1>Bienvenue sur BiblioTakeCare</h1>
      <nav>
        {(booksDisplay) &&
        <div className="searchBar">
          <p>Recherche par titre</p> 
          <input type="text" onChange={updateDisplayBySearch}/>
        </div> }
        {(categories) && 
        <form >
          <DisplayCategorie categories={categories} onChange={updateDisplayByCategories} key={Math.random()}/>
        </form>}
      </nav>
      
      {((booksDisplay) &&
      <section>
        { booksDisplay.map((book, index) => (
          <DisplayBook book={book} key={index.toString()}/>
        ))}
      </section>)
     || <div className="load"><ReactLoading type={'spokes'} color={'orange'} height={'60px'} width={'60px'} /><p>Chargement...</p></div>}
    </>
  )
};

export default App;