import {  useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Home() {
    const location = useLocation()
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (location.state) {
          setUserData(location.state);
        }
      }, []);

    return(
        <div>
            <h1>Bem-vindo(a) {userData.name}</h1>
            <img src={userData.photo} alt='profile'/>
            <p>E-mail: {userData.email}</p>
            <p>Telefone: {userData.phone}</p>
        </div>
    )
}

export default Home;