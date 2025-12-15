import React from "react";
import { NavLink } from "react-router-dom";

function Header({ cartCount = 0 }) {
  return (
    <header className="header">
      <div className="logo">Balena</div>

      <nav className="nav">
        <NavLink to="/" >Home</NavLink>
        <NavLink to="/shop" >Shop</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/login" >Login</NavLink>
        <NavLink to="/search" >Search</NavLink>
        <NavLink to="/admin" >Admin</NavLink>
        
      </nav>
    </header>
  );
}

export default Header;
