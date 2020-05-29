import React, { Component } from 'react';
import FormInput from '../formInput/FormInput.component';
import CustomButton from '../customButton/CustomButton.component';

import '../../assets/sass/custom/enterUserDetails/EnterUserDetails.style.scss';

import { db, firebase } from '../../utils/firebase.util';

class EnterUserDetails extends Component {
  constructor(props) {
    super(props);
    const {
      name,
      number,
      address,
      action,
      createdDate,
      delivaryCharge,
      Discount,
      acharBought,
    } = this.props.location.state.customer;

    this.state = {
      //props for adding new user from header component
      action: action,
      address: address,
      createdDate: createdDate,
      name: name,
      number: number,
      delivaryCharge: delivaryCharge,
      Discount: Discount,
      //achar comes from backend, acharStrength.
      acharStrength: [],
      acharBought: acharBought,

      customers: [],
    };
  }

  componentDidMount() {
    //Getting data from backend from table acharStrength
    let acharStrengths = [];
    let acharBoughts = [];
    db.collection('acharStrength')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          acharStrengths.push(doc.data());
        });
        var { name, number, address, delivaryCharge, Discount, createdDate, action, acharBought } = this.state;
        if (this.state.action === 'edit') {
          for (let i = 0; i < acharBought.length; i++) {
            for (let j = 0; j < acharStrengths.length; j++) {
              if (acharBought[i].name == acharStrengths[j].id) {
                acharStrengths[j].value = acharBought[i].bought;
                continue;
              }
            }
          }
        }

        //copying amount and name from acharStrength to acharBought
        acharStrengths.forEach(acharObject => {
          acharBoughts.push({ name: acharObject.id, amount: acharObject.amountOfAchar });
        });
        //this.setState is being used because, we need achars array in the state
        if (this.state.action === 'add') {
          let customers = [];
          db.collection('customerDetails')
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                customers.push(doc.data());
              });
            })
            .catch(err => {
              console.log('Error getting documents', err);
            });
          this.setState({
            name: name,
            number: number,
            address: address,
            delivaryCharge: delivaryCharge,
            Discount: Discount,
            createdDate: createdDate,
            action: action,
            acharStrength: acharStrengths,
            acharBought: acharBoughts,
            customers: customers,
          });
        } else {
          this.setState({
            name: name,
            number: number,
            address: address,
            delivaryCharge: delivaryCharge,
            Discount: Discount,
            createdDate: createdDate,
            action: action,
            acharStrength: acharStrengths,
            acharBought: acharBought,
          });
        }
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });

    var {
      name,
      number,
      address,
      delivaryCharge,
      Discount,
      createdDate,
      acharBought,
      acharStrength,
      customers,
    } = this.state;
    if (!this.props.match.isExact) {
      //if statement runs when user clicks edit
      this.setState({
        name: name,
        number: number,
        address: address,
        delivaryCharge: delivaryCharge,
        Discount: Discount,
        createdDate: createdDate,
        action: 'edit',
        acharStrength: acharStrength,
        acharBought: acharBought,
      });
    } else {
      //when user adds new value
      this.setState({
        name: '',
        number: '',
        address: '',
        delivaryCharge: '',
        Discount: '',
        createdDate: '',
        action: 'add',
        acharStrength: acharStrength,
        acharBought: acharBought,
        customer: customers,
      });
    }
  }

  handleUpdate = e => {
    if (this.state.action === 'edit') {
      this.state.acharStrength.forEach(ach => {
        if (ach.id === e.target.name) {
          ach.value = e.target.value;
        }
      });

      this.state.acharBought.forEach(ach => {
        if (ach.name === e.target.name) {
          ach.bought = e.target.value;
        }
      });

      this.setState({
        [e.target.name]: e.target.value,
        acharStrength: this.state.acharStrength,
        acharBought: this.state.acharBought,
      });
    } else if (this.state.action === 'add') {
      this.state.acharBought.forEach(ach => {
        if (ach.name === e.target.name) {
          ach.bought = e.target.value;
        }
      });
      this.setState({
        [e.target.name]: e.target.value,
        acharBought: this.state.acharBought,
      });
    } else {
      console.error('There is a error');
    }
  };

  dateTimeForCreate() {
    var today = new Date();
    var date = today.getFullYear() + 'XXX' + (today.getMonth() + 1) + 'AAA' + today.getDate();
    var time = today.getHours() + 'CDE' + today.getMinutes() + '1Do2' + today.getSeconds();
    var dateTimeForCreate = date + '$' + time;
    return dateTimeForCreate;
  }

  addUser = e => {
    let cusDetail = [];
    e.preventDefault();
    this.state.customers.forEach(cus => {
      if (cus.number == this.state.number) {
        cusDetail = cus;
      }
    });

    if (cusDetail.length == 0) {
      const dateTimeForCreate = this.dateTimeForCreate();
      var {
        name,
        number,
        address,
        delivaryCharge,
        Discount,
        createdDate,
        action,
        acharBought,
        achar,
        ...otherprops
      } = this.state;

      var userRef = db.collection('customerDetails').doc(dateTimeForCreate).set({
        name: name,
        number: number,
        address: address,
        delivaryCharge: delivaryCharge,
        Discount: Discount,
        createdDate: dateTimeForCreate,
        acharBought: acharBought,
      });
    } else {
      cusDetail.acharBought.forEach(ach => {
        this.state.acharBought.forEach(SAB => {
          if (ach.name == SAB.name) {
            SAB.bought = Number(SAB.bought) + Number(ach.bought);
          }
        });
      });

      let Ref = db.collection('customerDetails').doc(cusDetail.createdDate);
      var { name, number, address, delivaryCharge, Discount, createdDate } = cusDetail;
      var updateSingle = Ref.update({
        name: name,
        number: number,
        address: address,
        delivaryCharge: delivaryCharge,
        Discount: Discount,
        createdDate: createdDate,
        acharBought: this.state.acharBought,
      });
    }
    this.setState({
      name: '',
      number: '',
      address: '',
      delivaryCharge: '',
      Discount: '',
      createdDate: '',
      action: 'add',
      acharBought: acharBought,
    });
  };

  updateUser = e => {
    e.preventDefault();
    let Ref = db.collection('customerDetails').doc(this.state.createdDate);
    var {
      name,
      number,
      address,
      delivaryCharge,
      Discount,
      acharBought,
      acharStrength,
      createdDate,
      ...otherprops
    } = this.state;
    var updateSingle = Ref.update({
      name: name,
      number: number,
      address: address,
      delivaryCharge: delivaryCharge,
      Discount: Discount,
      createdDate: createdDate,
      acharBought: acharBought,
    });

    this.setState({
      name: '',
      number: '',
      address: '',
      delivaryCharge: '',
      Discount: '',
      createdDate: '',
      action: 'add',
    });
  };

  render() {
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
          type="text"
          label="number"
          minLength={10}
          maxLength={10}
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
          {this.state.acharStrength.map(pickel => (
            <FormInput
              name={pickel.id}
              type="number"
              label={pickel.id}
              handleUpdate={this.handleUpdate}
              value={pickel.value}
              key={pickel.id}
              required
            />
          ))}
        </div>
        <FormInput
          name="delivaryCharge"
          type="number"
          label="delivary Charge"
          handleUpdate={this.handleUpdate}
          value={this.state.delivaryCharge}
          required
        />
        <FormInput
          name="Discount"
          type="number"
          label="Discount"
          handleUpdate={this.handleUpdate}
          value={this.state.Discount}
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
