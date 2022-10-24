import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import useToken from "./hooks/useToken";
import Logout from "./components/Logout/Logout";
import NotFound from "./components/NotFound/NotFound";

function App() {
  const {token, setToken, clearToken} = useToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home token={token} clearToken={clearToken} />} />
        <Route path="/login" element={<Login token={token} setToken={setToken} />} />
        <Route path="/register" element={<Register token={token} setToken={setToken} />} />
        <Route path="/logout" element={<Logout clearToken={clearToken} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
