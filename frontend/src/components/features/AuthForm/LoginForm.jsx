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


    const onEmailChanged = event => {
        setEmail(event.target.value);
    };

    const onPasswordChanged = event => {
        setPassword(event.target.value);
    };

    const onSubmit = async event => {
        event.preventDefault();

        login(email, password);
    };





    return (
        <div className={classes['login-form']}>
            <input type="text" placeholder='Email' value={email } onChange={onEmailChanged} />
            <input type="password" placeholder='Password' value={password} onChange={onPasswordChanged} />

            <button type='submit' onClick={onSubmit}>Continue</button>
            <p>New User? <Link>Register</Link></p>
        </div>
    );
};

export default LoginForm;