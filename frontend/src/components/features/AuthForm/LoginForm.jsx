import {useState} from "react";
import {useUserStore} from "@store/useUserStore.js";

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





    return <>
        <input type="text" placeholder='Email' value={email } onChange={onEmailChanged} />
        <input type="text" placeholder='Password' value={password} onChange={onPasswordChanged} />

        <button type='submit' onClick={onSubmit}>Submit</button>
    </>;
};

export default LoginForm;