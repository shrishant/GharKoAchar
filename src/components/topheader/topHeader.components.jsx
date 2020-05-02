import './topHeader.style.css'
import React, { Component } from 'react';
import HeaderCart from '../headerCart/headerCart.component';
import CurrencySelect from '../CurrencySelect/currencySelect.component';

class TopHeader extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="headerComponent">
                <CurrencySelect/>
                <div className='InnerHeaderComponent'>
                <div className="itmes">Register</div>
                <div className="itmes">Sign In</div>
                <HeaderCart/>
                </div>
            </div>
         );
    }
}
 
export default TopHeader;