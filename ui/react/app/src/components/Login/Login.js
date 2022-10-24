import React, {useState} from 'react';
import PropTypes from "prop-types";
import {Navigate, useNavigate} from "react-router-dom";
import useToken from "../../hooks/useToken";

async function SendLoginRequest(credentials) {
  return await fetch('http://localhost:30001/login', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      user: credentials
    })
  });
}


export default function Login(props) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isIncorrectLogin, setIsIncorrectLogin] = useState(false);
  const {token, setToken} = useToken();
  const navigate = useNavigate();

  // Already logged in
  if (token) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    // Send the login request
    const response = await SendLoginRequest({
      email,
      password
    });

    // Was there an incorrect login?
    setIsIncorrectLogin(response.status === 401);

    // Successful login, so store the token
    if (response.status === 200) {
      const newToken = response.headers.get("Authorization");
      props.setToken(newToken);
      navigate('/');
    }
  }

  return (
    <div>
      <h1>Login</h1>
      {isIncorrectLogin ? <p>FAIL</p> : null}
      <form onSubmit={onSubmit}>
        <label title="E-mail">
          <input name="email" type="text" onChange={e => setEmail(e.target.value)} />
        </label>
        <label title="Password">
          <input name="password" type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};