import React from 'react';

const Toggle = ({toggleVal, setToggleVal, key}) => {
  const handleChange = () => {
    setToggleVal(!toggleVal);
  }
  
  return (
    <label class="switch">
      <input type="checkbox" onChange={handleChange}/>
      <span class="slider"></span>
    </label>
  )
}

export default Toggle;