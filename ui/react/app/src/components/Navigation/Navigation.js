import useToken from "../../hooks/useToken";
import {Link} from "react-router-dom";
import React from "react";

export default function Navigation() {
  const {token} = useToken();

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