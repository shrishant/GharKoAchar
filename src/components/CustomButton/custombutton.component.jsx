import React from 'react';
import './custombutton.style.scss'

const Submit = (props) => {
    return ( 
        <button 
        type={props.submit}
        >Submit
        </button>
     );
}
 
export default Submit;