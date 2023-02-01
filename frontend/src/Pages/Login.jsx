import styles from './Login.module.css';
import LoginForm from '../Components/LoginForm';
import RegisterForm from '../Components/RegisterForm';

function Login() {
    return(
        <main className={styles.main}>
            <LoginForm/>

            <RegisterForm/>
        </main>
    )
}

export default Login;