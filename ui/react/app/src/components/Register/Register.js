import React, {useState} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import useToken from "../../hooks/useToken";

async function SendRegisterRequest(credentials) {
  return await fetch('http://localhost:30001/signup', {
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


export default function Register() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [birthdate, setBirthdate] = useState(null);
  const [gender, setGender] = useState(null);

  const [isBadRequest, setIsBadRequest] = useState(false);
  const {token, setToken} = useToken();
  const navigate = useNavigate();

  // Already logged in
  if (token) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await SendRegisterRequest({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      birthdate,
      gender
    });

    // Was there an incorrect login?
    setIsBadRequest(response.status !== 200);

    // Successful login, so store the token
    if (response.status === 200) {
      const newToken = response.headers.get("Authorization");
      setToken(newToken);
      navigate('/');
    }
  }

  return (
    <div>
      <h1>Register</h1>
      {isBadRequest ? <p>FAIL</p> : null}
      <form onSubmit={onSubmit}>
        <div>
          <label title="E-mail">
            E-mail (username)
            <input name="email" type="text" onChange={e => setEmail(e.target.value)} />
          </label>
        </div>
        <div>
          <label title="Password">
            Password
            <input name="password" type="password" onChange={e => setPassword(e.target.value)} />
          </label>
        </div>
        <div>
          <label title="First name">
            First Name
            <input name="first_name" type="text" onChange={e => setFirstName(e.target.value)} />
          </label>
        </div>
        <div>
          <label title="Last name">
            Last Name
            <input name="last_name" type="text" onChange={e => setLastName(e.target.value)} />
          </label>
        </div>
        <div>
          <label title="Birthdate">
            Birthdate
            <input name="birthdate" type="text" onChange={e => setBirthdate(e.target.value)} />
          </label>
        </div>
        <div>
          <label title="Gender">
            Gender
            <select name="gender" onChange={e => setGender(e.target.value)}>
              <option value="none"></option>
              <option key="0" value="0">F</option>
              <option key="1" value="1">M</option>
              <option key="2" value="2">Other</option>
              <option key="3" value="3">Non-binary</option>
            </select>

          </label>
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
