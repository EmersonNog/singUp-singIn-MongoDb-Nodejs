import styles from '../Pages/Login.module.css';
import { useState } from 'react';
import api from '../Services/api.js';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/avatar.png';
import { Alert } from '@material-ui/lab';

function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const history = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!name || !email || !phone || !password || !confirmPassword) {
            setShowAlert(true);
            return;
        }

        try {
            await api.post('/auth/register', {
            name,
            email,
            phone,
            password,
            confirmPassword
            });
            history('/imagem', {state: {name, email, phone}})

        } catch(error) {
            console.log(error);
        }
    }

    return(
        <section className={styles.register}>
            
            {showAlert && 
                    <Alert onClose={() => setShowAlert(false)} style={{ width: '335px', height: '40px', marginBottom: '10px', display: 'flex', alignItems: 'center' }} severity="warning">
                        Por favor preencha todos os campos
                    </Alert>}
            <section>
                <h1>Criar uma conta</h1>
                <h5>Bem-vindo, crie uma conta agora mesmo!</h5>
                <img src={avatar} alt='avatar'/>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Ex: Pedro sousa' onChange={(e => setName(e.target.value))}/>
                    <input type='text' placeholder='Ex: pedro@gmail.com' onChange={(e => setEmail(e.target.value))}/>
                    <input type='tel' placeholder='Ex: (xx) xxxxx-xxxx' onChange={(e => setPhone(e.target.value))}/>
                    <input type='password' placeholder='Senha' onChange={(e => setPassword(e.target.value))}/>
                    <input type='password' placeholder="Confirme a senha" onChange={(e => setConfirmPassword(e.target.value))}/>

                    <button type='submit'>Criar conta</button>
                </form>
            </section>
        </section>
    )
}

export default RegisterForm;