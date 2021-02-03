const DisplayCategorie = ({categories}, {key}) => {
  return (
    <>
    <p>Filtrer par catégorie</p>
    <select name="categories" id={`categories${key}`}>
      {categories.map((categorie) => (
        <option value={categorie}>{categorie}</option>
      ))}
    </select>
    </>

  )
};

export default DisplayCategorie;