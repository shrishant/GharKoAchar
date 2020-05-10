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
      createdDate: '',
      bool: 0,
    };
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

    let Ref = db.collection('customerDetails').doc(this.state.createdDate);
    let updateSingle = Ref.update({
      name: this.state.name,
      number: this.state.number,
      address: this.state.address,
      amount: this.state.amount,
      createdDate: this.state.createdDate,
    });
    this.setState({
      name: '',
      number: '',
      address: '',
      amount: '',
      createdDate: '',
    });
  };

  addUser = e => {
    var today = new Date();
    var date = today.getFullYear() + 'XXX' + (today.getMonth() + 1) + 'AAA' + today.getDate();
    var time = today.getHours() + 'CDE' + today.getMinutes() + '1Do2' + today.getSeconds();
    var dateTimeForCreate = date + '$' + time;
    e.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true,
    });
    const userRef = db.collection('customerDetails').doc(dateTimeForCreate).set({
      name: this.state.name,
      number: this.state.number,
      address: this.state.address,
      amount: this.state.amount,
      createdDate: dateTimeForCreate,
    });
    this.setState({
      name: '',
      number: '',
      address: '',
      amount: '',
      createdDate: '',
    });
  };

  componentDidMount() {
    if (!this.props.match.isExact) {
      const { name, number, address, amount, bool, createdDate } = this.props.location.state.customer;
      this.setState({
        name: name,
        number: number,
        address: address,
        amount: amount,
        createdDate: createdDate,
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
