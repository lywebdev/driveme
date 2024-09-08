import classes from './Datepicker.module.scss';
import DatePicker from "react-datepicker";
import {forwardRef, useState} from "react";


const DatepickerInput = forwardRef(
    ({ value, onClick, onChange, placeholder }, ref) => {
        const handleInputClick = () => {
            onClick();
        };

        return (
            <input
                className={`${classes.datepickerInput} ${value ? classes.filled : ''}`}
                onClick={handleInputClick}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                readOnly
                ref={ref}
            />
        );
    }
);

DatepickerInput.displayName = 'DatepickerInput';


const DateRangePicker = () => {
    const [startRangeDate, setStartRangeDate] = useState(null);
    const [endRangeDate, setEndRangeDate] = useState(null);
    const handleRangeChange = (dates) => {
        const [start, end] = dates;
        setStartRangeDate(start);
        setEndRangeDate(end);
    };


    return <>
        <DatePicker
            popperClassName={classes.popper}
            selected={startRangeDate}
            onChange={handleRangeChange}
            startDate={startRangeDate}
            endDate={endRangeDate}
            monthsShown={2}
            placeholderText="Select Date in a Range"
            selectsRange
            inputProps={{
                clearable: true,
                onClear: () => {
                    setStartRangeDate(null);
                    setEndRangeDate(null);
                },
            }}
            minDate={new Date()}
            customInput={<DatepickerInput />}
            dateFormat="EEE, d MMM"
        />
    </>;
};

export default DateRangePicker;