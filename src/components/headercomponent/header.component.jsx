import React from 'react';
import Logo from '../../assets/images/GharKoAchar.jpg';
import './header.styles.scss'

const Header = () => {
    return ( 
        <div className="headerStyle">
            <img src={Logo}/>
            <div className="NavBar">
                <div>Home</div>
                <div>Enter</div>
            </div>
        </div>
     );
}
 
export default Header;