import React from 'react';
import './FormInput.styles.scss'

const FormInput = (props) => {
    {console.log(props)}
    return ( 
        <div className="group">
            <label className="form-input-label">{props.label.toUpperCase()}</label>
            <input className='form-input' type={props.type} onChange={props.handleUpdate}  {...props}/>
        </div>
     );
}
export default FormInput;