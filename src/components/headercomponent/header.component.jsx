import React from 'react';
import Logo from '../../assets/images/GharKoAchar.jpg';
import './header.styles.scss';
import {Link} from "react-router-dom";

const Header = () => {
    return ( 
        <div className="headerStyle">
            <img src={Logo}/>
            <div className="NavBar">
                <Link to="/">Home</Link>
                <Link to="/EnterUserDetails">Enter</Link>
            </div>
        </div>
     );
}
 
export default Header;