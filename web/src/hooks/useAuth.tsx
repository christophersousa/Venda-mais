import { useState, useEffect } from 'react';
import { decodeToken } from 'react-jwt';

import api from '../api/api.js';
import { User } from '../interfaces/User.js';





interface PropsLoginUser{
    email: string;
    password: string;
}

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [use, setUse] = useState<User>();
    const [message, setMessage] = useState('')

    useEffect(() => {
        const tokenAcesso = localStorage.getItem('token');
        console.log(tokenAcesso? 'login': 'logout');
        if (tokenAcesso ) {
            const token:User = JSON.parse(localStorage.getItem('token')||'')
            api.defaults.headers.Authorization = `Bearer ${JSON.stringify(token)}`;
            setAuthenticated(true);
            setUse(token);
            console.log("usuario ", use);
        }
        setLoading(false);
    }, []);

    async function handleLogin(dataLogin:PropsLoginUser) {
         api.post(`/usuario/logar`,{
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
            },
            email: dataLogin.email,
            password: dataLogin.password
         }).then((response) => {
            const token:User = response.data
            // const tokenUser = decodeToken<User>(response.data)
            console.log(token.status);
            if(token.status === "sucess"){
                localStorage.setItem('token', JSON.stringify(token));

                setUse(token);

                api.defaults.headers.Authorization = `Bearer ${token}`;
                setAuthenticated(true);
                window.location.href="/"
            }


        }).catch((error) => {
            console.log("erro: " + error);
            setMessage("Erro")
            return error.message
        });

        return message;
    }

    function handleLogout() {
        setAuthenticated(false);
        localStorage.removeItem('token');
        api.defaults.headers.Authorization = '';
        window.location.href="/"
    }

    return { authenticated, loading, handleLogin, handleLogout, setAuthenticated, use};
}