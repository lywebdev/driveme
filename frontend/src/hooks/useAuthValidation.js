import {useState} from "react";

const useAuthValidation = () => {
    const [errors, setErrors] = useState({});

    const validateName = (name) => {
        const regex = /^[a-zA-Z]+$/;

        if (!regex.test(name)) {
            return 'Enter a valid name';
        }

        return true;
    };

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!email) {
            return 'Email is required';
        } else if (!emailPattern.test(email)) {
            return 'Enter a valid email address';
        }

        return true;
    };

    const validatePassword = (password) => {
        if (!password) {
            return 'Password is required';
        } else if (password.length < 6) {
            return 'Password must be at least 6 characters long';
        }

        return true;
    };

    const validatePasswordConfirmation = (password, passwordConfirmation) => {
        if (password !== passwordConfirmation) {
            return 'Passwords don\'t match';
        }

        return true;
    };


    const validate = (values) => {
        const newErrors = {
            name: validateName(values.name),
            email: validateEmail(values.email),
            password: validatePassword(values.password),
            passwordConfirmation: validatePasswordConfirmation(values.password, values.passwordConfirmation),
        };

        setErrors(newErrors);

        const emailAndPasswordCondition = newErrors.email === true && newErrors.password === true;

        if (values['name'] !== undefined && values['passwordConfirmation'] !== undefined) {
            return emailAndPasswordCondition && newErrors.name === true && newErrors.passwordConfirmation === true;
        }

        return emailAndPasswordCondition;
    };


    return {
        validate,
        validateEmail,
        validatePassword,
        validatePasswordConfirmation,
        errors,
    };
};


export default useAuthValidation;