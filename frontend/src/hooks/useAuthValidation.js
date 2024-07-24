import {useState} from "react";

const useAuthValidation = () => {
    const [errors, setErrors] = useState({});

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


    const validate = (values) => {
        const newErrors = {
            email: validateEmail(values.email),
            password: validatePassword(values.password),
        };

        setErrors(newErrors);

        return newErrors.email === true && newErrors.password === true;
    };


    return {
        validate,
        validateEmail,
        validatePassword,
        errors,
    };
};


export default useAuthValidation;