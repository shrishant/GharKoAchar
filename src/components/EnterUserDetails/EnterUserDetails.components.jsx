import React, { Component } from 'react';
import FormInput from '../FormInput/FormInput.component';
import './EnterUserDetails.style.scss';
import CustomButton from '../CustomButton/custombutton.component';
import firebase from "../../firebase";

class EnterUserDetails extends Component {
    constructor(){
        super();
        this.state = { 
            Name:'',
            Surname:'',
            Number:'' ,
            Address :"",
            Bought:"",
            Reviews:""
         }
    }

    handleUpdate = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
      }
      addUser = e => {
        e.preventDefault();
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        const userRef = db.collection('users').add({
            Name: this.state.Name,
            Surname: this.state.Surname,
            Number: this.state.Number,
            Address: this.state.Address,
            Bought: this.state.Bought,
            Reviews: this .state.Reviews
        });  
        this.setState({
            Name:'',
            Surname:'',
            Number:'' ,
            Address :"",
            Bought:"",
            Reviews:""
        });
      };

    render() { 
        return ( 
                <form className="UserDetailForm" onSubmit={this.addUser}>
                <h1>Enter User Data</h1>
                <FormInput
                name="Name" 
                type="text"
                label='name'
                handleUpdate={this.handleUpdate}
                value={this.state.Name}
                required/>
                <FormInput
                name="Surname" 
                type="text"
                label='Surname'
                handleUpdate={this.handleUpdate}
                value={this.state.Surname}
                required/>
                <FormInput
                name="Number" 
                type="number"
                label='number'
                handleUpdate={this.handleUpdate}
                value={this.state.Number}
                required/>
                <FormInput
                name="Address" 
                type="text"
                label='Address'
                handleUpdate={this.handleUpdate}
                value={this.state.Address}
                required/>
                <FormInput
                name="Bought" 
                type="number"
                label='Bought'
                handleUpdate={this.handleUpdate}
                value={this.state.Bought}
                required/>
                <FormInput
                name="Reviews" 
                type="text"
                label='Reviews'
                handleUpdate={this.handleUpdate}
                value={this.state.Reviews}
                required/>
                <CustomButton type='submit' value='submit form' >
                    Submit
                </CustomButton>
                </form>
         );
    }
}
 
export default EnterUserDetails;