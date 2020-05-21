import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import DeleteButton from '../deleteButton/deleteButton.component';

import { db } from '../../utils/firebase.util';

import '../../assets/sass/custom/card/card.styles.scss';

class Card extends Component {
  constructor(props) {
    super(props);
    const { name, number, address, amount, createdDate, acharBought } = props.Cus;
    this.state = {
      name: name,
      number: number,
      address: address,
      amount: amount,
      createdDate: createdDate,
      acharBought: acharBought,
    };
  }

  handleDelete = e => {
    e.stopPropagation();
    db.collection('customerDetails').doc(this.state.createdDate).delete();
    this.setState({
      name: '',
      number: '',
      address: '',
      amount: '',
      createdDate: '',
      acharBought: [],
      delete: true,
    });
  };

  render() {
    return (
      <div className={`${this.state.delete === true ? 'cardDelete' : ''} cardContainer`}>
        <h3>{this.state.name.toUpperCase()}</h3>
        <p>NUMBER : {this.state.number}</p>
        <p>ADDRESS: {this.state.address}</p>
        <p>AMOUNT: {this.state.amount}</p>
        {this.state.acharBought.map(achar => (
          <p>
            {achar.name} : {achar.value}
          </p>
        ))}
        <DeleteButton createdDate={this.state.createdDate} handleDelete={this.handleDelete} />
        <Link
          to={{
            pathname: `/enterUserDetails/: + props.name`,
            state: {
              customer: {
                name: this.state.name,
                number: this.state.number,
                address: this.state.address,
                amount: this.state.amount,
                action: 'edit',
                createdDate: this.state.createdDate,
                acharBought: this.state.acharBought,
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

// const Card = props => {
//   const { name, number, address, amount, createdDate, acharBought } = props.Cus;

//   return (
//     <div className="cardContainer">
//       <h3>{name.toUpperCase()}</h3>
//       <p>NUMBER : {number}</p>
//       <p>ADDRESS: {address}</p>
//       <p>AMOUNT: {amount}</p>
//       {acharBought.map(achar => (
//         <p>
//           {achar.name} : {achar.value}
//         </p>
//       ))}
//       <DeleteButton createdDate={createdDate} />
//       <Link
//         to={{
//           pathname: `/enterUserDetails/: + props.name`,
//           state: {
//             customer: {
//               name: name,
//               number: number,
//               address: address,
//               amount: amount,
//               action:"edit",
//               createdDate: createdDate,
//               acharBought:acharBought
//             },
//           },
//         }}
//       >
//         <button className="upDateData">
//           <i className="fa fa-pencil-square-o"></i>
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default Card;
