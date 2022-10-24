import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

function Offers({token, clearToken}) {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      const response = await fetch('http://localhost:30001/offers/index',
        {
          headers: {
            'Authorization': token
          }
        });
      if (response.status === 401) {
        clearToken();
        navigate('/login');
        return;
      }
      const json = await response.json();
      setData(json);
    };

    fetchOffers();
  }, [token]);

  return (
    <div>
      <h1>Offers list</h1>
      <div>
        {data ? (
          <div>{JSON.stringify(data)}</div>
        ) : null}
      </div>
    </div>
  );
}

Offers.propTypes = {
  token: PropTypes.string,
  clearToken: PropTypes.func.isRequired
};

export default Offers;
