import React, { Component } from 'react';
import FormInput from '../formInput/formInput.component';
import cardList from '../cardList/cardList.component';
import CustomButton from '../customButton/customButton.component';

import '../../assets/sass/custom/enterUserDetails/enterUserDetails.style.scss';

import firebase from '../../utils/firebase.util';

class AddStrength extends Component {
  constructor() {
    super();
    this.state = {
      productName: '',
      weightOfAchar: '',
      amountOfAchar: '',
    };
  }

  handleUpdateBox = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addStrengthVal = e => {
    e.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true,
    });

    let id = this.state.productName + ' ' + this.state.weightOfAchar + ' ' + this.state.productName;
    id = id.split(' ').join('').toLowerCase();
    const acharRef = db.collection('acharStrength').doc(id).set({
      productName: this.state.productName,
      weightOfAchar: this.state.weightOfAchar,
      amountOfAchar: this.state.amountOfAchar,
      id: id,
    });
    this.setState({
      productName: '',
      weightOfAchar: '',
      amountOfAchar: '',
    });
  };

  render() {
    return (
      <form className="userDetailForm" onSubmit={this.addStrengthVal}>
        <h1>Enter Achar Details</h1>
        <FormInput
          name="productName"
          type="text"
          label="Name of Achar"
          handleUpdateBox={this.handleUpdateBox}
          value={this.state.productName}
          required
        />
        <FormInput
          name="weightOfAchar"
          type="text"
          label="Weight of Achar"
          handleUpdateBox={this.handleUpdateBox}
          value={this.state.weightOfAchar}
          required
        />
        <FormInput
          name="amountOfAchar"
          type="number"
          label="Amount"
          handleUpdateBox={this.handleUpdateBox}
          value={this.state.amountOfAchar}
          required
        />
        <CustomButton type="submit" value="submitForm">
          Submit
        </CustomButton>
      </form>
    );
  }
}

export default AddStrength;
