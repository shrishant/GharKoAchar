import React, { Component } from 'react';
import './card.styles.scss';
import {Link} from "react-router-dom";
import DeleteButton from '../DeleteButton/deleteButton.component';
import {db} from '../../firebase';

const Card = (props) => {
    return ( 
    <div className="card-container">
        <h3>NAME : {props.Cus.Name} {props.Cus.Surname}</h3>
        <p>NUMBER : {props.Cus.Number}</p>
        <p>ADDRESS: {props.Cus.Address}</p>
        <p>BOUGHT: {props.Cus.Bought}</p>
        <p>REVIEWS: {props.Cus.Reviews}</p>
        <DeleteButton Number={props.Cus.Number}/>
        <Link to="/EnterUserDetails">
        <button className="updatedata">
        <i class="fa fa-pencil-square-o"></i>
        </button>
        </Link>
    </div>
     );
}
 
export default Card;
