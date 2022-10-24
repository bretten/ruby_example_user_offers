import {useState} from "react";

export default function useToken() {
  const getToken = () => {
    return sessionStorage.getItem('token');
  }

  const [token, setToken] = useState(getToken());

  const storeToken = (token) => {
    sessionStorage.setItem('token', token);
    setToken(token);
  }

  const clearToken = () => {
    sessionStorage.removeItem('token');
  }

  return {
    setToken: storeToken,
    token,
    clearToken
  };
}