import React, { Component } from 'react';
import './MainPage.style.scss'
import SearchBox from '../SearchBox/SearchBox.component';
import Cardlist from '../cardlist/cardlist.component'
import {firebase,db} from '../../firebase';

class MainPage extends Component {
    constructor(){
        super();
        this.state = { 
          Customer:[
          ],
          searchValue: ''
       }
    }
    
      componentDidMount(){
        let Customers=[];
        db.collection('users').get()
            .then((snapshot) => {
            snapshot.forEach((doc) => {
              Customers.push(doc.data())
              this.setState({
                Customer:Customers,
                searchValue: ''
              })
              });
            })
            .catch((err) => {
              console.log('Error getting documents', err);
            });
      }

       handleChange=(e) => {
        this.setState({searchValue : e.target.value}) 
      }

    render() {

      const SearchedCustomers = this.state.Customer.filter(cus =>
        cus.Number.includes(this.state.searchValue)
        )
        return (
            <div className="MainPage">
             <SearchBox 
             handleChange={this.handleChange}
             />
            <Cardlist 
            SearchedCustomers={SearchedCustomers} />
           </div>
          );
    }
}
 
export default MainPage;