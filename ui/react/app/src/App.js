import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import useToken from "./hooks/useToken";
import Logout from "./components/Logout/Logout";

function App() {
  const {token, setToken, clearToken} = useToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
