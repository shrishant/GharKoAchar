import React, { Component } from 'react';
import Card from '../card/Card.component';

import '../../assets/sass/custom/cardList/CardList.style.scss';

var CardList = props => {
  return (
    <div className="cardList">
      {props.searchedCustomers.map(c => (
        <Card key={c.number} Cus={c} />
      ))}
    </div>
  );
};

export default CardList;
