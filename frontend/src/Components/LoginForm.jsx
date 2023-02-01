import styles from '../Pages/Login.module.css';
import { useState } from 'react';
import api from '../Services/api.js';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Alert } from '@material-ui/lab';
import { FiLogIn } from 'react-icons/fi';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const history = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        if(!email || !password) {
            setShowAlert(true)
            return;
        }

        try {
            await api.post('/auth/login', {
                email,
                password
            })
            .then(res=>{
                if(res.data!=="Usuário não encontrado!"){
                    api.get(`/users/${email}`)
                    .then(res => {
                        history("/inicio", {state: {name: res.data.name, email: res.data.email, phone: res.data.phone, photo: res.data.photo}})
                    })
                } else if(res.data==="Usuário não encontrado!"){
                    alert("Usuário não encontrado!")
                }
            }).catch(e => {
                alert('Dados incorretos!');
                console.log(e);
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className={styles.login}>
                <img src={logo} alt='logo'/>
                <h1>Entrar</h1>
                <form onSubmit={handleLogin}>
                    <label>E-mail</label>
                    <input type='text' placeholder="email" onChange={(e => setEmail(e.target.value))}/>

                    <label>Senha</label>
                    <input type='password' placeholder="senha" onChange={(e => setPassword(e.target.value))}/>

                    <button type='submit'>Entrar <FiLogIn className={styles.loginIcon}/></button>
                </form>
                {showAlert && 
                    <Alert onClose={() => setShowAlert(false)} style={{ backgroundColor: '#222', color: 'white', maxWidth: '90%', height: '40px', display: 'flex', alignItems: 'center', marginTop: '20px' }} severity="error">
                        Por favor preencha todos os campos
                    </Alert>}
            </section>
    )
}

export default LoginForm;
