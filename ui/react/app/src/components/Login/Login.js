import React, {useState} from 'react';
import PropTypes from "prop-types";
import {Navigate, useNavigate} from "react-router-dom";

async function SendLoginRequest(credentials) {
  return await fetch(process.env.REACT_APP_OFFERS_BASE_URL + '/login', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
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


function Login({token, setToken}) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isIncorrectLogin, setIsIncorrectLogin] = useState(false);
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
      setToken(newToken);
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
  token: PropTypes.string,
  setToken: PropTypes.func.isRequired
};

export default Login;
