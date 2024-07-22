import {useState} from "react";
import {useUserStore} from "@store/useUserStore.js";
import classes from './LoginForm.module.scss';
import {Link} from "react-router-dom";


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useUserStore(state => [
        state.login,
    ]);
    const [errorMesssage, setErrorMessage] = useState('');


    const onEmailChanged = event => {
        setEmail(event.target.value);
    };

    const onPasswordChanged = event => {
        setPassword(event.target.value);
    };

    const onSubmit = async event => {
        event.preventDefault();
        if(!email || !password){
            setErrorMessage('Please enter email and password');
            return;
        }
        setErrorMessage('');
        login(email, password);
    };

    return (
        <div className={classes['login-form']}>
            <form onSubmit={onSubmit}>
                <input type="email" placeholder='Email' value={email} onChange={onEmailChanged} />
                <input type="password" placeholder='Password' value={password} onChange={onPasswordChanged} />
                <button type='submit'>Continue</button>
            </form>
            {errorMesssage && <p className={classes['error-message']}>{errorMesssage}</p>}
            <p>New User? <Link to="/register">Register</Link></p>
        </div>
    );
};

export default LoginForm;
