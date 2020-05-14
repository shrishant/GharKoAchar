import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/GharKoAchar.png.png';

import '../../assets/sass/custom/headerComponent/headerComponent.styles.scss';

const Header = () => {
  return (
    <div className="headerStyle">
      <img src={Logo} />
      <div className="navBar">
        <Link to="/">Home</Link>
        <Link to="/enterUserDetails">Enter User</Link>
        <Link to="/addStrength">Add Strength</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Header;
