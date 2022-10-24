import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";
import {useEffect} from "react";

function Logout({clearToken}) {
  useEffect(() => {
    clearToken();
  });
  return (<Navigate to='/' />);
}

Logout.propTypes = {
  clearToken: PropTypes.func.isRequired
};

export default Logout;
