import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Login from './Component/Authencation/Login';
import Billpage from './Component/BillingComponent/Billpage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="about" element={<Billpage />} />
      </Routes>

    </div>
  );
}

export default App;
