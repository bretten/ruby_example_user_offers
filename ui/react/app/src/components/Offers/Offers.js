import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {List} from "@mui/material";
import Offer from "../Offer/Offer";

function Offers({token, clearToken}) {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      const response = await fetch(process.env.REACT_APP_OFFERS_BASE_URL + '/offers/index',
        {
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'omit',
          headers: {
            'Authorization': token
          }
        });
      if (response.status === 401) {
        clearToken();
        navigate('/login');
        return;
      }
      setData((await response.json()).message);
    };

    fetchOffers();
  }, [token]);

  return (
    <div>
      <h2>Your personalized offers are below...</h2>
      <div>
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
          }}>
          {data && data.length > 0 ?
            data.map((item) => (
              <Offer id={item.offer.id} description={item.offer.description} />
            )) : (
              <span>There are no offers in our system that match your age and gender.</span>
            )
          }
        </List>
      </div>
    </div>
  );
}

Offers.propTypes = {
  token: PropTypes.string,
  clearToken: PropTypes.func.isRequired
};

export default Offers;
