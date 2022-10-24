import React from 'react';
import Offers from "../Offers/Offers";
import Navigation from "../Navigation/Navigation";
import PropTypes from "prop-types";

function Home({token, clearToken}) {
  return (
    <div>
      <div>
        <h1>Navigation</h1>
        <Navigation token={token} />
      </div>
      <div>
        <h1>Content</h1>
        {
          token !== null ? (
            <Offers token={token} clearToken={clearToken} />
          ) : (<span>Please register or login</span>)
        }
      </div>
    </div>
  );
}

Home.propTypes = {
  token: PropTypes.string,
  clearToken: PropTypes.func.isRequired
};

export default Home;
