import React, { Component } from 'react';
import FormInput from '../formInput/formInput.component';
import CustomButton from '../customButton/customButton.component';

import '../../assets/sass/custom/enterUserDetails/enterUserDetails.style.scss';

import { db, firebase } from '../../utils/firebase.util';

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
      achar: [],
    };
  }

  handleUpdate = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state);
  };

  updateUser = e => {
    e.preventDefault();
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
    db.settings({
      timestampsInSnapshots: true,
    });
    const { name, number, address, amount, bool, createdDate, achar, ...otherprops } = this.state;
    const userRef = db
      .collection('customerDetails')
      .doc(dateTimeForCreate)
      .set({
        name: name,
        number: number,
        address: address,
        amount: amount,
        createdDate: dateTimeForCreate,
        acharBought: { ...otherprops },
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
    let achars = [];
    db.collection('acharStrength')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          achars.push(doc.data());
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    if (!this.props.match.isExact) {
      //if statement runs when user clicks edit
      const { name, number, address, amount, bool, createdDate } = this.props.location.state.customer;
      this.setState({
        name: name,
        number: number,
        address: address,
        amount: amount,
        createdDate: createdDate,
        bool: 0,
        achar: achars,
      });
    } else {
      this.setState({
        name: '',
        number: '',
        address: '',
        amount: '',
        createdDate: '',
        bool: 0,
        achar: achars,
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
        <div className="userBoughtAchar">
          {this.state.achar.map(pickel => (
            <FormInput
              name={pickel.productName + '-' + pickel.weightOfAchar}
              type="number"
              label={pickel.productName + '-' + pickel.weightOfAchar}
              handleUpdate={this.handleUpdate}
              required
            />
          ))}
        </div>
        <FormInput
          name="amount"
          type="text"
          label="amount"
          handleUpdate={this.handleUpdate}
          value={this.state.amount}
          readonly
        />
        <CustomButton type="submit" value="submitForm">
          Submit
        </CustomButton>
      </form>
    );
  }
}

export default EnterUserDetails;
