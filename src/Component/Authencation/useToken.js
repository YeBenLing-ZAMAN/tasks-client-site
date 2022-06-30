import { useEffect, useState } from "react"

const useToken = user => {
    console.log('user useToken', user);
    const [token, setToken] = useState('');
    useEffect(() => {
        const email = user?.email;
        const currentUser = { email: email };
        console.log(currentUser);
        if (email) {
             // console.log('user jeta pachi', user);
            fetch(`http://localhost:5000/user/${email}`,{
                method:"PUT",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(currentUser)
            })
            .then(res => res.json())
            .then(data =>{
                 // console.log('data inside useToken', data);
                const accesstoken = data.token;
                localStorage.setItem('accesstoken',accesstoken);
                setToken (accesstoken);
            })
        }

    }, [user])
    return [token];
}

export default useToken;