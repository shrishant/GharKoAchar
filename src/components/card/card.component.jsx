import React, { Component } from 'react';
import './card.styles.scss'

const Card = (props)  => {
        return ( 
            <div className="card-container">
                <h3>NAME : {props.Cus.Name} {props.Cus.Surname}</h3>
                <p>NUMBER : {props.Cus.Number}</p>
                <p>ADDRESS: {props.Cus.Address}</p>
                <p>BOUGHT: {props.Cus.Bought}</p>
                <p>REVIEWS: {props.Cus.Reviews}</p>
            </div>
         );
}
 
export default Card;