import React, { Component } from 'react';

import { db } from '../../utils/firebase.util';

const DeleteButton = props => {
  let handleDelete = e => {
    e.stopPropagation();
    db.collection('users').doc(props.number).delete();
  };
  return (
    <button className="deleteButton" onClick={handleDelete}>
      <i className="fa fa-trash"></i>
    </button>
  );
};

export default DeleteButton;
