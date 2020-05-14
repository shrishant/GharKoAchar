import React, { Component } from 'react';
import FormInput from '../formInput/formInput.component';

import '../../assets/sass/custom/userBoughtAchar/userBoughtAchar.style.scss';

import { db, firebase } from '../../utils/firebase.util';

const UserBoughtAchar = props => {
  return (
    <div className="userBoughtAchar">
      {props.acharTypes.map(pickel => (
        <FormInput
          key={pickel.id}
          name="name"
          type="number"
          label={pickel.productName + '-' + pickel.weightOfAchar}
          handleUpdateBox={props.handleUpdateBox}
          value={props.acharTypes.productName}
          required
        />
      ))}
    </div>
  );
};

export default UserBoughtAchar;
