import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import DeleteButton from '../deleteButton/DeleteButton.component';

import { db } from '../../utils/firebase.util';

import '../../assets/sass/custom/card/Card.style.scss';

class Card extends Component {
  constructor(props) {
    super(props);
    var { name, number, address, delivaryCharge, Discount, createdDate, acharBought } = props.Cus;
    this.state = {
      name: name,
      number: number,
      address: address,
      delivaryCharge: delivaryCharge,
      createdDate: createdDate,
      acharBought: acharBought,
      Discount: Discount,
      totalCost: 0,
    };
  }

  handleDelete = e => {
    e.stopPropagation();
    db.collection('customerDetails').doc(this.state.createdDate).delete();
    this.setState({
      name: '',
      number: '',
      address: '',
      delivaryCharge: '',
      Discount: '',
      createdDate: '',
      acharBought: [],
      delete: true,
    });
  };
  calculateTotal() {
    let totalCost = this.state.delivaryCharge - this.state.Discount;
    for (let i = 0; i < this.state.acharBought.length; i++) {
      totalCost = totalCost + parseInt(this.state.acharBought[i].bought) * parseInt(this.state.acharBought[i].amount);
    }
    return totalCost;
  }

  render() {
    var { number, name, address, delivaryCharge, Discount, acharBought, bought, createdDate, totalCost } = this.state;
    return (
      <div className={`${this.state.delete === true ? 'cardDelete' : ''} cardContainer`}>
        <h3>{name.toUpperCase()}</h3>
        <h4>{number} </h4>
        <p>ADDRESS: {address}</p>
        {acharBought.map(achar => (
          <p key={achar.name}>
            {achar.name} : {achar.bought}
          </p>
        ))}
        <p>Delivary Charge: {delivaryCharge}</p>
        <p>Discount: {Discount}</p>
        <h3>TotalCost: {this.calculateTotal()}</h3>

        <DeleteButton createdDate={createdDate} handleDelete={this.handleDelete} />
        <Link
          to={{
            pathname: `/enterUserDetails/: + props.name`,
            state: {
              customer: {
                name: name,
                number: number,
                address: address,
                delivaryCharge: delivaryCharge,
                Discount: Discount,
                action: 'edit',
                createdDate: createdDate,
                acharBought: acharBought,
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
  }
}

export default Card;
