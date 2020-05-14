import React from 'react';
import '../../assets/sass/custom/formInput/formInput.styles.scss';

const FormInput = props => {
  return (
    <div className="group">
      <label className="formInputLabel">{props.label.toUpperCase()}</label>
      <input className="formInput" type={props.type} onChange={props.handleUpdateBox} value={props.value} {...props} />
    </div>
  );
};
export default FormInput;
