const Read = ({read, id, setRead}) => {
  const handleFav = (event) => {
    if (read.includes(id)) {
      read.splice(read.indexOf(id), 1);
      event.target.className = "readBtn";
      setRead(read);
    } else {
      event.target.className = "readBtn green";
      setRead([...read, id]);
    }
  };

  return (
      <div className={"readBtn"} onClick={handleFav}></div>
  );
};

export default Read;