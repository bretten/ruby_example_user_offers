import React, {useState} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {Alert, Box, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";

async function SendRegisterRequest(credentials) {
  return await fetch(process.env.REACT_APP_OFFERS_BASE_URL + '/signup', {
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


function Register({token, setToken}) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [birthdate, setBirthdate] = useState(null);
  const [gender, setGender] = useState(0);

  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  // Already logged in
  if (token) {
    return <Navigate to="/" />;
  }

  const handleBirthdateChange = (newValue) => {
    setBirthdate(newValue);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await SendRegisterRequest({
      email,
      password,
      password_confirmation: passwordConfirmation,
      first_name: firstName,
      last_name: lastName,
      birthdate,
      gender
    });

    // Successful login, so store the token
    if (response.status === 200) {
      const newToken = response.headers.get("Authorization");
      setToken(newToken);
      navigate('/');
    } else {
      const errorResponse = (await response.json()).message;
      const validationMessages = [];
      Object.keys(errorResponse).forEach((fieldName, index) => {
        errorResponse[fieldName].forEach(msg => {
          const fieldAndMessage = fieldName + " " + msg;
          if (validationMessages.indexOf(fieldAndMessage) === -1) {
            validationMessages.push(fieldAndMessage);
          }
        })
      });

      setErrorMessage(validationMessages.join(", "));
    }
  }

  return (
    <div>
      <h1>Register</h1>
      {
        errorMessage !== null ?
          (
            <div>
              <Alert severity="error">{errorMessage}</Alert>
            </div>
          )
          : null
      }
      <form onSubmit={onSubmit}>
        <Box display="flex" flexDirection="column" alignItems="stretch" padding={1}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            label="E-mail"
            InputProps={{
              name: 'email',
              type: 'text',
            }} />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="stretch" padding={1}>
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            InputProps={{
              name: 'password',
              type: 'password',
            }} />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="stretch" padding={1}>
          <TextField
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            label="Confirm Password"
            InputProps={{
              name: 'password_confirmation',
              type: 'password',
            }} />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="stretch" padding={1}>
          <TextField
            onChange={(e) => setFirstName(e.target.value)}
            label="First Name"
            InputProps={{
              name: 'first_name',
              type: 'text',
            }} />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="stretch" padding={1}>
          <TextField
            onChange={(e) => setLastName(e.target.value)}
            label="Last Name"
            InputProps={{
              name: 'last_name',
              type: 'text',
            }} />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="stretch" padding={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Birthdate"
              inputFormat="YYYY-MM-DD"
              value={birthdate}
              onChange={handleBirthdateChange}
              renderInput={(params) => <TextField {...params} />}
              InputProps={{
                name: 'birthdate',
                type: 'text',
              }} />
          </LocalizationProvider>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="stretch" padding={1}>
          <FormControl fullWidth>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender-select"
              value={gender}
              label="Age"
              onChange={e => setGender(e.target.value)}
            >
              <MenuItem value={0}>F</MenuItem>
              <MenuItem value={1}>M</MenuItem>
              <MenuItem value={2}>Other</MenuItem>
              <MenuItem value={3}>Non-binary</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="stretch" padding={1}>
          <Button variant="outlined" type="submit">Register</Button>
        </Box>
      </form>
    </div>
  );
}

Register.propTypes = {
  token: PropTypes.string,
  setToken: PropTypes.func.isRequired
};

export default Register;
