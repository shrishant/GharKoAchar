import React, { Component } from 'react';
import FormInput from '../formInput/formInput.component';
import CustomButton from '../customButton/customButton.component';

import '../../assets/sass/custom/enterUserDetails/enterUserDetails.style.scss';

import firebase from '../../firebase';

class EnterUserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      number: '',
      address: '',
      bought: '',
      reviews: '',
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

    let Ref = db.collection('users').doc(this.state.number);
    let updateSingle = Ref.update({
      name: this.state.name,
      surname: this.state.surname,
      number: this.state.number,
      address: this.state.address,
      bought: this.state.bought,
      reviews: this.state.reviews,
    });
    this.setState({
      name: '',
      surname: '',
      number: '',
      address: '',
      bought: '',
      reviews: '',
    });
  };

  addUser = e => {
    e.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true,
    });
    const userRef = db.collection('users').doc(this.state.number).set({
      name: this.state.name,
      surname: this.state.surname,
      number: this.state.number,
      address: this.state.address,
      bought: this.state.bought,
      reviews: this.state.reviews,
    });
    this.setState({
      name: '',
      surname: '',
      number: '',
      address: '',
      bought: '',
      reviews: '',
    });
  };

  componentDidMount() {
    if (!this.props.match.isExact) {
      const { name, surname, number, address, bought, reviews, bool } = this.props.location.state.customer;
      this.setState({
        name: name,
        surname: surname,
        number: number,
        address: address,
        bought: bought,
        reviews: reviews,
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
          name="surname"
          type="text"
          label="surname"
          handleUpdate={this.handleUpdate}
          value={this.state.surname}
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
          name="bought"
          type="number"
          label="bought"
          handleUpdate={this.handleUpdate}
          value={this.state.bought}
          required
        />
        <FormInput
          name="reviews"
          type="text"
          label="reviews"
          handleUpdate={this.handleUpdate}
          value={this.state.reviews}
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
