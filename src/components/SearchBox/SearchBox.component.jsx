import React from 'react';
import '../../assets/sass/custom/searchBox/SearchBox.style.scss';

const SearchBox = props => {
  return <input className="searchBox" type="number" onChange={props.handleChange} />;
};

export default SearchBox;
