import { Space } from "antd";
import "./App.css";
import Home from "./Home";
import LoginAccount from "./Pages/Login/Login";
import RegisterAccount from "./Pages/Register/Register";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  
  return (
    <div className="App"> 
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/login" element={<LoginAccount />} />
            <Route path="/register" element={<RegisterAccount />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>  
    </div>
  );
}

export default App;

