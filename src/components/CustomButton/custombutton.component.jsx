import React from 'react';
import '../../assets/sass/custom/customButton/CustomButton.style.scss';

const Submit = props => {
  return (
    <button className="customButton" type={props.submit}>
      Submit
    </button>
  );
};

export default Submit;
