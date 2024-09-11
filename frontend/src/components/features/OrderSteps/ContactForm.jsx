import {useSteps} from "react-step-builder";
import classes from './OrderModalForm.module.scss';
import Input from "@components/UI/Input/Input.jsx";
import Button from "@components/UI/Button/Button.jsx";
import useOrderContext from "../../../hooks/contexts/useOrderContext.js";

const ContactForm = () => {
    const { next } = useSteps();
    const { contact, setContact } = useOrderContext();

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    return (
        <div className={classes.orderModalForm}>
            <h2 className={classes.title}>Contact Details</h2>
            <div className={`${classes.formContainer} ${classes.contactForm}`}>
                <div className={classes.inputs}>
                    <Input
                        name='name'
                        value={contact.name}
                        placeholder='Enter your name'
                        onChange={handleChange}
                    />
                    <Input
                        type='email'
                        name='email'
                        value={contact.email}
                        placeholder='Email'
                        onChange={handleChange}
                    />
                    <Input
                        type='tel'
                        name='phone'
                        value={contact.phone}
                        placeholder='Enter your phone'
                        onChange={handleChange}
                    />
                </div>
                <Button onClick={next} className={classes.nextBtn}>Next step</Button>
            </div>
        </div>
    );
};

export default ContactForm;
