import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './Component/Authencation/Login';
import Signup from './Component/Authencation/Signup';
import PageNotFound from './Component/PageNotFound';
import Layout from './Component/LayoutComonent/Layout';
import PrivateRoute from './Component/Authencation/PrivateRoute';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="layout" element={<Layout />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />

      </Routes>

    </div>
  );
}

export default App;
