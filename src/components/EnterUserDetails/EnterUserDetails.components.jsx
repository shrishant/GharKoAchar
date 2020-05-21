import React, { Component } from 'react';
import FormInput from '../formInput/formInput.component';
import CustomButton from '../customButton/customButton.component';

import '../../assets/sass/custom/enterUserDetails/enterUserDetails.style.scss';

import { db, firebase } from '../../utils/firebase.util';

class EnterUserDetails extends Component {
  constructor(props) {
    super(props);
    const { name, number, address, amount, action, createdDate, acharBought } = this.props.location.state.customer;
    this.state = {
      name: name,
      number: number,
      address: address,
      amount: amount,
      createdDate: createdDate,
      action: action,
      achar: [],
      acharBought: acharBought,
    };
  }
  onEditFields = e => {
    if (this.state.action == 'add') {
      this.setState({
        [e.target.name]: e.target.value,
      });
    } else {
      for (let i = 0; i < this.state.acharBought.length; i++) {
        if (e.target.name == this.state.acharBought[i].name) {
          this.state.acharBought[i].value = e.target.value;
          this.state.achar[i].value = e.target.value;
        } else {
          //put those value which are in achar but not in acharBought
          console.log('....');
        }
      }

      this.setState({
        acharBought: this.state.acharBought,
        achar: this.state.achar,
      });
    }
  };

  handleUpdate = e => {
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
    const { name, number, address, amount, acharBought, createdDate, ...otherprops } = this.state;
    console.log({ ...otherprops });
    let updateSingle = Ref.update({
      name: name,
      number: number,
      address: address,
      amount: amount,
      createdDate: createdDate,
      acharBought: acharBought,
    });
    this.setState({
      name: '',
      number: '',
      address: '',
      amount: '',
      createdDate: '',
      bool: 0,
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
    const { name, number, address, amount, createdDate, action, acharBought, achar, ...otherprops } = this.state;
    let acharObj = [];
    for (let key in { ...otherprops }) {
      if ({ ...otherprops }.hasOwnProperty(key)) {
        acharObj.push({ name: key, value: { ...otherprops }[key] });
      }
    }
    const userRef = db.collection('customerDetails').doc(dateTimeForCreate).set({
      name: name,
      number: number,
      address: address,
      amount: amount,
      createdDate: dateTimeForCreate,
      acharBought: acharObj,
    });
    this.setState({
      name: '',
      number: '',
      address: '',
      amount: '',
      createdDate: '',
      action: 'add',
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
        const { name, number, address, amount, createdDate, action, acharBought } = this.state;
        //this.setState is being used because, we need achars array in the state
        if (this.state.action === 'edit') {
          for (let i = 0; i < acharBought.length; i++) {
            for (let j = 0; j < achars.length; j++) {
              if (acharBought[i].name == achars[j].productName + '-' + achars[j].weightOfAchar) {
                achars[j].value = acharBought[i].value;
                continue;
              }
            }
          }
        }

        this.setState({
          name: name,
          number: number,
          address: address,
          amount: amount,
          createdDate: createdDate,
          action: action,
          achar: achars,
        });
        const character = Object.assign(this.state, acharBought);
        this.setState(character);
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });

    const { name, number, address, amount, createdDate, acharBought } = this.state;
    if (!this.props.match.isExact) {
      //if statement runs when user clicks edit
      this.setState({
        name: name,
        number: number,
        address: address,
        amount: amount,
        createdDate: createdDate,
        action: 'edit',
        achar: achars,
      });

      const character = Object.assign(this.state, acharBought);
      this.setState(character);
    } else {
      this.setState({
        name: '',
        number: '',
        address: '',
        amount: '',
        createdDate: '',
        action: 'add',
        achar: achars,
      });
    }
  }

  render() {
    // console.log(this.state.achar)
    return (
      <form className="userDetailForm" onSubmit={this.state.action == 'edit' ? this.updateUser : this.addUser}>
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
              // handleUpdate={this.handleUpdate}
              onChange={this.onEditFields}
              value={pickel.value}
              key={pickel.id}
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
