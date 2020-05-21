import React, { Component } from 'react';

import { db } from '../../utils/firebase.util';

const DeleteButton = props => {
  return (
    <button className="deleteButton" onClick={props.handleDelete}>
      <i className="fa fa-trash"></i>
    </button>
  );
};

export default DeleteButton;
