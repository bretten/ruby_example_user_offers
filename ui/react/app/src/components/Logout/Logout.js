import useToken from "../../hooks/useToken";
import {Navigate} from "react-router-dom";

export default function Logout() {
  const {token, setToken, clearToken} = useToken();

  clearToken();
  return <Navigate to='/' />;
}