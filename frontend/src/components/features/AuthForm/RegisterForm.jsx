import {useUserStore} from "@store/useUserStore.js";
import Button from "@components/UI/Button/Button.jsx";
import classes from './AuthForm.module.scss';
import Link from "@components/UI/Link/Link.jsx";
import {useEffect, useState} from "react";
import Input from "@components/UI/Input/Input.jsx";
import useAuthValidation from "../../../hooks/useAuthValidation.js";
import { v4 as uuidv4 } from 'uuid';
import {routes} from "@config/routes.js";


const RegisterForm = ({className}) => {
    const [backendErrors, register, setBackendErrors] = useUserStore(state => [
        state.backendErrors,
        state.register,
        state.setBackendErrors,
    ]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const {validate, errors} = useAuthValidation();
    const combinedClasses = `${classes['auth-form']} ${className}`;
    const [isTriedSubmitted, setIsTriedSubmitted] = useState(false);

    const validateAll = () => {
        return validate({
            name: name,
            email: email,
            password: password,
            passwordConfirmation: passwordConfirmation,
        });
    };


    useEffect(() => {
        setBackendErrors([]);
    }, []);

    useEffect(() => {
        if (isTriedSubmitted) {
            validateAll();
        }
    }, [name, email, password, passwordConfirmation]);



    const onNameChanged = (event) => {
        setName(event.target.value);
    };

    const onEmailChanged = (event) => {
        setEmail(event.target.value);
    };

    const onPasswordChanged = (event) => {
        setPassword(event.target.value);
    };

    const onPasswordConfirmationChanged = (event) => {
        setPasswordConfirmation(event.target.value);
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

        if (!validateAll()) {
            return;
        }

        await register(name, email, password, passwordConfirmation);
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
                    value={name}
                    name='register[name]'
                    placeholder='Your name'
                    onChange={onNameChanged}
                />
                {errorMessage('name')}

                <Input
                    value={email}
                    name='register[email]'
                    placeholder='Email'
                    onChange={onEmailChanged}
                    isInvalid={emailIsInvalid}
                />
                {errorMessage('email')}

                <Input
                    value={password}
                    name='register[password]'
                    type={Input.types.password}
                    placeholder='Password'
                    onChange={onPasswordChanged}
                    isInvalid={passwordIsInvalid}
                />
                {errorMessage('password')}

                <Input
                    value={passwordConfirmation}
                    name='register[password_confirmation]'
                    placeholder='Confirm your password'
                    onChange={onPasswordConfirmationChanged}
                />
                {errorMessage('passwordConfirmation')}
            </div>

            <Button isSubmit variants={[Button.variants.action, Button.variants.fullWidth]}>Continue</Button>

            <p className={classes.links}>Already have an account? <Link to={routes.login}>Login</Link></p>
        </form>
    );
};

export default RegisterForm;
