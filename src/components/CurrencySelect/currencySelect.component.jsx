import React, { Component } from 'react';
import './currencySelect.style.css'

class CurrencySelect extends Component {
    constructor(){
        super();
        this.state = { 
            currency : [
                {id:1,name:'CBP'},
                {id:2,name:'NEP'},
                {id:3,name:'DOL'}
            ]
         }
    }
    render() { 
        return (
            <div className="Currency">
                    <label for="curr">Currency:</label>
                    <select id="curr">
                    {this.state.currency.map((money)=> 
                        <option className="options" key={money.id}>{money.name}</option>
                    )}
                    </select>
            </div>
          );
    }
}
 
export default CurrencySelect;