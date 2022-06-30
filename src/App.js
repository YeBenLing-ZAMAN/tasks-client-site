import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Login from './Component/Authencation/Login';
import Billpage from './Component/BillingComponent/Billpage';
import Signup from './Component/Authencation/Signup';
import PageNotFound from './Component/PageNotFound';
import Layout from './Component/LayoutComonent/Layout';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="about" element={<Billpage />} />
        <Route path="layout" element={<Layout />} />
        <Route path="*" element={<PageNotFound />} />
        
      </Routes>

    </div>
  );
}

export default App;
