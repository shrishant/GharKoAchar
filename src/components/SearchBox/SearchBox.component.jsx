import React from 'react';
import './SearchBox.component.scss'

const SearchBox = (props) => {
        return (  
            <input  
            className="search"
            type="number"
            onChange = {props.handleChange}
             />
        );
}
 
export default SearchBox;