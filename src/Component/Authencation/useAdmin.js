import React, { useEffect, useState } from 'react';

const useAdmin = () => {
    const [admin, setAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);
    useEffect(() => {
        const email = user?.email;
        // console.log(email);
        if (email) {
            fetch(`http://localhost:5000/user/${email}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accesstoken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    // console.log('admin data', data);
                    setAdmin(data.admin);
                    setAdminLoading(false);
                })
        }
    }, [user])
    return [admin, adminLoading];
};

export default useAdmin;