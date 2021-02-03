import React from 'react';
import Toggle from '../toggle/';
const SearchBar = ({books,categories,favorites,read,setBooksDisplay}) => {
  const [toggleFav, setToggleFav] = React.useState(false);
  const [toggleRead, setToggleRead] = React.useState(false);

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
        };
        return acc;
      }, []);
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

  const updateDisplayByFavorites = () => {
    if (!toggleFav) {
      setBooksDisplay(books);
    } else { 
      const booksSearch = books.reduce(
        (acc, book) => { 
        if(favorites.includes(book.isbn)) {
          acc.push(book);
        };
        return acc;
      }, []);
      setBooksDisplay(booksSearch);
    }
  }

  const updateDisplayByRead = () => {
    if (!toggleRead) {
      setBooksDisplay(books);
    } else { 
      const booksSearch = books.reduce(
        (acc, book) => { 
        if(read.includes(book.isbn)) {
          acc.push(book);
        };
        return acc;
      }, []);
      setBooksDisplay(booksSearch);
    }
  }

  React.useEffect(() => {
    updateDisplayByFavorites();
  }, [toggleFav]);

  React.useEffect(() => {
    updateDisplayByRead();
  }, [toggleRead]);

  return (
      <nav className="searchBar">
        <p>Recherche par titre</p> 
        <input type="text" onChange={updateDisplayBySearch}/>
        <p>Selection par catégorie</p>
        <select name="categories" onChange={updateDisplayByCategories}>
          {categories.map((categorie) => (
            <option value={categorie}>{categorie}</option>
          ))}
        </select>
        <p>Sélection par lu</p>
        <Toggle
          toggleVal={toggleRead}
          setToggleVal={setToggleRead}
          key="read"
        />
        <p>Sélection par favoris</p>
        <Toggle
          toggleVal={toggleFav}
          setToggleVal={setToggleFav}
          key="fav"
        />
      </nav>
  )
};

export default SearchBar;
