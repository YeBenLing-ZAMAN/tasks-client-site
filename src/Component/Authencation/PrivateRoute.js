import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../App';


const PrivateRoute = () => {
    const [authToggle] = useContext(AuthContext);
    const user = authToggle;
    console.log(authToggle);
    if (!user) {
        return <Navigate to='/login' replace />
    }
    return <Outlet />;
};

export default PrivateRoute;