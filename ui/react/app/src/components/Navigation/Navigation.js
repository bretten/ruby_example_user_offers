import {Link} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

function Navigation({token}) {
  if (token !== null) {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    )
  }
  return (
    <nav>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  token: PropTypes.string
};

export default Navigation;
