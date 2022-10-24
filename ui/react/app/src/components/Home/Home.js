import React from 'react';
import useToken from "../../hooks/useToken";
import Offers from "../Offers/Offers";
import Navigation from "../Navigation/Navigation";

export default function Home() {
  const {token} = useToken();

  return (
    <div>
      <div>
        <h1>Navigation</h1>
        <Navigation />
      </div>
      <div>
        <h1>Content</h1>
        {
          token !== null ? (
            <Offers />
          ) : (<span>Please register or login</span>)
        }
      </div>
    </div>
  );
}
