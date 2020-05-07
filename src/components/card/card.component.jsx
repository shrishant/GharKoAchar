import React, { Component } from 'react';
import './card.styles.scss';
import {Link} from "react-router-dom";
import DeleteButton from '../DeleteButton/deleteButton.component';
import {db} from '../../firebase';

const Card = (props ) => {

    const {Name,Surname,Number,Address,Bought,Reviews} = props.Cus;
    return ( 
    <div className="card-container">
        <h3>NAME : {Name} {Surname}</h3>
        <p>NUMBER : {Number}</p>
        <p>ADDRESS: {Address}</p>
        <p>BOUGHT: {Bought}</p>
        <p>REVIEWS: {Reviews}</p>
        <DeleteButton Number={Number}/>
        <Link to={{
                pathname: `/EnterUserDetails/: + {props}`,
                state:{
                    Customer:{"Name":Name,
                                        "Surname":Surname,
                                        "Number":Number,
                                        "Address": Address,
                                        "Bought":Bought,
                                        "Reviews":Reviews,
                                        "bool":1 }
                }
        }}>
        <button className="updatedata" >
        <i className="fa fa-pencil-square-o"></i>
        </button>
        </Link>
    </div>
     );
}
 
export default Card;
