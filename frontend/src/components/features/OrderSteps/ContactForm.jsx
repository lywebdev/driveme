import {useSteps} from "react-step-builder";
import classes from './OrderModalForm.module.scss';
import Input from "@components/UI/Input/Input.jsx";
import Button from "@components/UI/Button/Button.jsx";
import useOrderContext from "../../../hooks/contexts/useOrderContext.js";
import {useState} from "react";

const ContactForm = () => {
    const { next } = useSteps();
    const { contact, setContact } = useOrderContext();
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validationRules = {
        name: {
            required: true,
            message: "Name is required",
        },
        email: {
            required: true,
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            message: "Invalid email address",
        },
        phone: {
            required: true,
            pattern: /^[0-9]{10,12}$/,
            message: "Invalid phone number",
        },
    };

    const validateField = (name, value) => {
        const { required, pattern, message } = validationRules[name] || {};
        let error = "";

        if (required && (!value || value.trim() === "")) {
            error = message;
        } else if (pattern && !pattern.test(value)) {
            error = message;
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact((prevContact) => ({ ...prevContact, [name]: value }));
        validateField(name, value);
    };

    const validateForm = () => {
        let isValid = true;
        Object.keys(validationRules).forEach((field) => {
            const value = contact[field];
            validateField(field, value);
            if (!value || errors[field]) {
                isValid = false;
            }
        });
        return isValid;
    };

    const handleNext = () => {
        setIsSubmitted(true);
        if (validateForm()) {
            next();
        }
    };

    const renderInput = (name, type = "text", placeholder) => (
        <div className={classes.inputItem}>
            <Input
                type={type}
                name={name}
                value={contact[name] || ""}
                placeholder={placeholder}
                onChange={handleChange}
            />
            {isSubmitted && errors[name] && <span className={classes.error}>{errors[name]}</span>}
        </div>
    );


    return (
        <div className={classes.orderModalForm}>
            <h2 className={classes.title}>Contact Details</h2>
            <div className={`${classes.formContainer} ${classes.contactForm}`}>
                <div className={classes.inputs}>
                    {renderInput('name', 'text', 'Enter your name')}
                    {renderInput('email', 'email', 'Email')}
                    {renderInput('phone', 'tel', 'Enter your phone')}
                </div>
                <Button onClick={handleNext} className={classes.nextBtn}>Next step</Button>
            </div>
        </div>
    );
};

export default ContactForm;
