import { useFormContext, Controller } from 'react-hook-form';
import Input from "@components/UI/Input/Input.jsx";

const ValidateInput = ({ name, rules, placeholder, type = 'text' }) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <Input {...field} placeholder={placeholder} type={type} />
                )}
            />
            {errors[name] && <p className=''>{errors[name].message}</p>}
        </>
    );
};

export default ValidateInput;