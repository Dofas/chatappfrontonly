import React from "react";
import { NavLink } from "react-router-dom";

const NavBarItem = ({ activeLink, itemLink, itemPath, itemText }) => {
  return (
    <li className={activeLink === itemLink ? "active-header-nav-bar-link" : ""}>
      <NavLink to={itemPath}>{itemText}</NavLink>
    </li>
  );
};

export default NavBarItem;
