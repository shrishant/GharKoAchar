import React, { Component } from 'react';
import './headerCart.style.scss'

class HeaderCart extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="headerCart">
                <i class="fa fa-shopping-cart"></i>
                <select className="selectOptions">
                <option value="empty">Empty</option>
                <option value="add">Add</option>
                </select>
            </div>
         );
    }
}
 
export default HeaderCart;