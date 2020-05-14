import React, { Component } from 'react';
import FormInput from '../formInput/formInput.component';
import CustomButton from '../customButton/customButton.component';
// import UserBoughtAchar from '../userBoughtAchar/userBoughtAchar.component'

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

  handleUpdateBox = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
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

    const userRef = db.collection('customerDetails').doc(dateTimeForCreate).set({
      name: this.state.name,
      number: this.state.number,
      address: this.state.address,
      amount: this.state.amount,
      createdDate: dateTimeForCreate,
      acharName: this.state.achar.productName,
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
    let achars = this.state.achar;
    if (!this.props.match.isExact) {
      //if statement runs when user clicks edit
      console.log('edit');
      const { name, number, address, amount, bool, createdDate } = this.props.location.state.customer;
      this.setState({
        name: name,
        number: number,
        address: address,
        amount: amount,
        createdDate: createdDate,
        bool: bool,
        achar: achars,
      });
    } else {
      console.log('not edit');
      this.setState({
        achar: achars,
        name: '',
        number: '',
        address: '',
        amount: '',
        createdDate: '',
      });
    }
  }

  componentWillMount() {
    //only using componentWill mount because the following code is asyncronous... if possible, make in didMount
    let achars = [];
    db.collection('acharStrength')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          achars.push(doc.data());
        });
        this.setState({
          achar: achars,
          name: this.state.name,
          number: this.state.number,
          address: this.state.address,
          amount: this.state.amount,
          createdDate: this.state.createdDate,
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  render() {
    return (
      <form className="userDetailForm" onSubmit={this.state.bool === 1 ? this.updateUser : this.addUser}>
        <h1>Enter User Data</h1>
        <FormInput
          name="name"
          type="text"
          label="name"
          handleUpdateBox={this.handleUpdateBox}
          value={this.state.name}
          required
        />
        <FormInput
          name="number"
          type="number"
          label="number"
          handleUpdateBox={this.handleUpdateBox}
          value={this.state.number}
          required
        />
        <FormInput
          name="address"
          type="text"
          label="address"
          handleUpdateBox={this.handleUpdateBox}
          value={this.state.address}
          required
        />
        <div className="userBoughtAchar">
          {this.state.achar.map(pickel => (
            <FormInput
              key={pickel.id}
              name="name"
              type="number"
              label={pickel.productName + '-' + pickel.weightOfAchar}
              handleUpdateBox={this.state.handleUpdateBox}
              value={this.state.achar.productName}
              required
            />
          ))}
        </div>
        <FormInput
          name="amount"
          type="text"
          label="amount"
          handleUpdateBox={this.handleUpdateBox}
          value={this.state.amount}
        />
        <CustomButton type="submit" value="submitForm">
          Submit
        </CustomButton>
      </form>
    );
  }
}

export default EnterUserDetails;
