import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './Component/Authencation/Login';
import Signup from './Component/Authencation/Signup';
import PageNotFound from './Component/PageNotFound';
import Layout from './Component/LayoutComonent/Layout';
import PrivateRoute from './Component/Authencation/PrivateRoute';
import { createContext, useState } from 'react';

export const AuthContext = createContext(false);

function App() {
  const [authToggle, setAuthToggle] = useState(true);

  return (
    <div>
      <AuthContext.Provider value={[authToggle, setAuthToggle]}>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="layout" element={<Layout />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthContext.Provider>

    </div>
  );
}

export default App;
