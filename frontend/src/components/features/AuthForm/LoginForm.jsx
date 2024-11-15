import {useUserStore} from "@store/useUserStore.js";
import Button from "@components/UI/Button/Button.jsx";
import classes from './AuthForm.module.scss';
import Link from "@components/UI/Link/Link.jsx";
import {useEffect, useState} from "react";
import Input from "@components/UI/Input/Input.jsx";
import useAuthValidation from "../../../hooks/useAuthValidation.js";
import { v4 as uuidv4 } from 'uuid';
import {routes} from "@config/routes.js";


const LoginForm = ({className}) => {
    const [login, backendErrors, setBackendErrors] = useUserStore(state => [
        state.login,
        state.backendErrors,
        state.setBackendErrors,
    ]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {validate, errors} = useAuthValidation();
    const combinedClasses = `${classes['auth-form']} ${className}`;
    const [isTriedSubmitted, setIsTriedSubmitted] = useState(false);

    useEffect(() => {
        setBackendErrors([]);
    }, []);


    const validateEmailAndPassword = () => {
        return validate({email: email, password: password});
    };

    const onEmailChanged = (event) => {
        setEmail(event.target.value);

        if (isTriedSubmitted) {
            validateEmailAndPassword();
        }
    };

    const onPasswordChanged = (event) => {
        setPassword(event.target.value);

        if (isTriedSubmitted) {
            validateEmailAndPassword();
        }
    };

    const error = (text, keyValue) => <p key={keyValue} className={classes.error}>{text}</p>;

    const emailIsInvalid = isTriedSubmitted && errors?.email !== true;
    const passwordIsInvalid = isTriedSubmitted && errors?.password !== true;

    const errorMessage = (field) => {
        if (field === undefined || errors[field] === undefined) return null;

        return errors[field] !== true && error(errors[field]);
    };


    const onSubmit = async (event) => {
        event.preventDefault();

        setIsTriedSubmitted(true);

        if (!validateEmailAndPassword()) {
            return;
        }

        await login(email, password);
    };



    return (
        <form onSubmit={onSubmit} className={combinedClasses}>
            {
                backendErrors && backendErrors.map(serverError => {
                    return error(serverError, uuidv4());
                })
            }

            <div className={classes.inputs}>
                <Input
                    value={email}
                    name='email'
                    placeholder='Email'
                    onChange={onEmailChanged}
                    isInvalid={emailIsInvalid}
                />
                {errorMessage('email')}
                <Input
                    value={password}
                    name='password'
                    type={Input.types.password}
                    placeholder='Password'
                    onChange={onPasswordChanged}
                    isInvalid={passwordIsInvalid}
                />
                {errorMessage('password')}
            </div>

            <Button isSubmit variants={[Button.variants.action, Button.variants.fullWidth]}>Continue</Button>

            <p className={classes.links}>New User? <Link to={routes.register}>Register</Link></p>
        </form>
    );
};

export default LoginForm;
