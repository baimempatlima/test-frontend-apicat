import React from "react";
import logo from "../logo.png";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-light bg-primary">
        <a className="navbar-brand" href="/#">
          <img src={logo} width="30" height="30" alt="" />
        </a>
      </nav>
    </div>
  );
};

export default Navbar;
