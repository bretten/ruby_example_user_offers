import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";

function Logout({clearToken}) {
  clearToken();
  return (<Navigate to='/' />);
}

Logout.propTypes = {
  clearToken: PropTypes.func.isRequired
};

export default Logout;
