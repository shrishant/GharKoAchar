import React from 'react';
import Card from '../card/card.component';
import './cardlist.style.scss';

const CardList = (props) => {
    return (             
    <div className="card-list">
    {props.SearchedCustomers
        .map(c=>(
        <Card key={c.Number} Cus={c}/>    
    ))}
</div> 
);
}
 
export default CardList;