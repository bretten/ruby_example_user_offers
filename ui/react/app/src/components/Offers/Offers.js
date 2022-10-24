import React, {useEffect, useState} from 'react';
import useToken from "../../hooks/useToken";
import {useNavigate} from "react-router-dom";

export default function Offers() {
  const {token, setToken, clearToken} = useToken();
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