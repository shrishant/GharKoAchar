import React, { Component } from 'react';
import Card from '../card/card.component';

import '../../assets/sass/custom/cardlist/cardlist.style.scss';

const CardList = props => {
  return (
    <div className="cardList">
      {props.searchedCustomers.map(c => (
        <Card key={c.number} Cus={c} />
      ))}
    </div>
  );
};

export default CardList;
