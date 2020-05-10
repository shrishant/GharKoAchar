import React, { Component } from 'react';
import Cardlist from '../cardList/cardList.component';
import SearchBox from '../searchBox/searchBox.component';

import '../../assets/sass/custom/mainPage/mainPage.style.scss';

import { firebase, db } from '../../utils/firebase.util';

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      customer: [],
      searchValue: '',
    };
  }

  componentDidMount() {
    let customers = [];
    db.collection('customerDetails')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          customers.push(doc.data());
        });
        this.setState({
          customer: customers,
          searchValue: '',
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  handleChange = e => {
    this.setState({ searchValue: e.target.value });
  };

  render() {
    const searchedCustomers = this.state.customer.filter(cus => cus.number.includes(this.state.searchValue));
    return (
      <div className="mainPage">
        <SearchBox handleChange={this.handleChange} />
        <Cardlist searchedCustomers={searchedCustomers} />
      </div>
    );
  }
}

export default MainPage;
