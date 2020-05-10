import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import DeleteButton from '../deleteButton/deleteButton.component';

import { db } from '../../utils/firebase.util';

import '../../assets/sass/custom/card/card.styles.scss';

const Card = props => {
  const { name, surname, number, address, bought, reviews } = props.Cus;
  return (
    <div className="cardContainer">
      <h3>
        NAME : {name} {surname}
      </h3>
      <p>NUMBER : {number}</p>
      <p>ADDRESS: {address}</p>
      <p>BOUGHT: {bought}</p>
      <p>REVIEWS: {reviews}</p>
      <DeleteButton number={number} />
      <Link
        to={{
          pathname: `/EnterUserDetails/: + {props}`,
          state: {
            customer: {
              name: name,
              surname: surname,
              number: number,
              address: address,
              bought: bought,
              reviews: reviews,
              bool: 1,
            },
          },
        }}
      >
        <button className="upDateData">
          <i className="fa fa-pencil-square-o"></i>
        </button>
      </Link>
    </div>
  );
};

export default Card;
