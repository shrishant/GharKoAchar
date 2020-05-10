import React, { Component } from 'react';
import FormInput from '../formInput/formInput.component';
import CustomButton from '../customButton/customButton.component';

import '../../assets/sass/custom/enterUserDetails/enterUserDetails.style.scss';

import firebase from '../../utils/firebase.util';

class EnterUserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: '',
      address: '',
      amount: '',
      bool: 0,
    };
    console.log(props);
  }

  handleUpdate = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  updateUser = e => {
    e.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true,
    });

    let Ref = db.collection('customerDetails').doc(this.state.number);
    let updateSingle = Ref.update({
      name: this.state.name,
      number: this.state.number,
      address: this.state.address,
      amount: this.state.amount,
    });
    this.setState({
      name: '',
      number: '',
      address: '',
      amount: '',
    });
  };

  addUser = e => {
    e.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true,
    });
    const userRef = db.collection('customerDetails').doc(this.state.number).set({
      name: this.state.name,
      number: this.state.number,
      address: this.state.address,
      amount: this.state.amount,
    });
    this.setState({
      name: '',
      number: '',
      address: '',
      amount: '',
    });
  };

  componentDidMount() {
    if (!this.props.match.isExact) {
      const { name, number, address, amount, bool } = this.props.location.state.customer;
      this.setState({
        name: name,
        number: number,
        address: address,
        amount: amount,
        bool: bool,
      });
    }
  }
  render() {
    return (
      <form className="userDetailForm" onSubmit={this.state.bool === 1 ? this.updateUser : this.addUser}>
        <h1>Enter User Data</h1>
        <FormInput
          name="name"
          type="text"
          label="name"
          handleUpdate={this.handleUpdate}
          value={this.state.name}
          required
        />
        <FormInput
          name="number"
          type="number"
          label="number"
          handleUpdate={this.handleUpdate}
          value={this.state.number}
          required
        />
        <FormInput
          name="address"
          type="text"
          label="address"
          handleUpdate={this.handleUpdate}
          value={this.state.address}
          required
        />
        <FormInput
          name="amount"
          type="number"
          label="amount"
          handleUpdate={this.handleUpdate}
          value={this.state.amount}
          required
        />
        <CustomButton type="submit" value="submitForm">
          Submit
        </CustomButton>
      </form>
    );
  }
}

export default EnterUserDetails;
