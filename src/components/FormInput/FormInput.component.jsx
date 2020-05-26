import React from 'react';
import '../../assets/sass/custom/formInput/FormInput.style.scss';

const FormInput = props => {
  return (
    <div className="group">
      <label className="formInputLabel">{props.label.toUpperCase()}</label>
      <input className="formInput" type={props.type} onChange={props.handleUpdate} {...props} />
    </div>
  );
};
export default FormInput;
