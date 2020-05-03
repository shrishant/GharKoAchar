import React, { Component } from 'react';
import './MainPage.style.scss'
import SearchBox from '../SearchBox/SearchBox.component';
import Cardlist from '../cardlist/cardlist.component'

class MainPage extends Component {
    constructor(){
        super();
        this.state = { 
          Customer:[
            {id:1,Name:"Shri",Lastname:"Banskota",Number:"9863",Address:"Kalikasthan",Bought:"3",Reviews:"Good"},
            {id:2,Name:"Asmin",Lastname:"Buda",Number:"7809",Address:"Butwol",Bought:"5",Reviews:"Nice"},
            {id:3,Name:"GOD",Lastname:"Barney",Number:"1234",Address:"kalanki",Bought:"23",Reviews:"Great"},
            {id:4,Name:"Barney",Lastname:"Stinson",Number:"9863",Address:"Kalikasthan",Bought:"3",Reviews:"Good"},
            {id:5,Name:"Snoop",Lastname:"Dogg",Number:"4554",Address:"Butwol",Bought:"5",Reviews:"Nice"},
            {id:6,Name:"E",Lastname:"Thon",Number:"5612",Address:"kalanki",Bought:"23",Reviews:"Great"}
          ],
          searchValue: ''
       }
    }
       handleChange=(e) => {
        this.setState({searchValue : e.target.value}) 
        console.log(e.target.value)
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
            // searchValue={this.state.searchValue}
            SearchedCustomers={SearchedCustomers} />
           </div>
          );
    }
}
 
export default MainPage;