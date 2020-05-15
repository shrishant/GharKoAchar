import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import DeleteButton from '../deleteButton/deleteButton.component';

import { db } from '../../utils/firebase.util';

import '../../assets/sass/custom/card/card.styles.scss';

const Card = props => {
  const { name, number, address, amount, createdDate, acharBought } = props.Cus;
  const acharBoughtArray = Object.entries(acharBought);

  return (
    <div className="cardContainer">
      <h3>{name.toUpperCase()}</h3>
      <p>NUMBER : {number}</p>
      <p>ADDRESS: {address}</p>
      <p>AMOUNT: {amount}</p>
      {acharBoughtArray.map(achar => (
        <p>
          {achar[0]} : {achar[1]}
        </p>
      ))}
      <DeleteButton number={number} />
      <Link
        to={{
          pathname: `/EnterUserDetails/: + {props}`,
          state: {
            customer: {
              name: name,
              number: number,
              address: address,
              amount: amount,
              bool: 1,
              createdDate: createdDate,
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
