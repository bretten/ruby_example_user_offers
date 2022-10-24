import React from 'react';
import Offers from "../Offers/Offers";
import PropTypes from "prop-types";

function Home({token, clearToken}) {
  return (
    <div>
      {
        token !== null ? (
          <div>
            <h1>Welcome back!</h1>
            <Offers token={token} clearToken={clearToken} />
          </div>
        ) : (
          <div>
            <h1>Greetings!</h1>
            <p>Please login or register.</p>
          </div>
        )
      }
    </div>
  );
}

Home.propTypes = {
  token: PropTypes.string,
  clearToken: PropTypes.func.isRequired
};

export default Home;
