import classes from './Datepicker.module.scss';
import DatePicker from "react-datepicker";
import {forwardRef} from "react";
import Dropdown from "@components/UI/Dropdown/Dropdown.jsx";


const generateTimeOptions = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
        const hour = i < 10 ? `0${i}:00` : `${i}:00`;
        times.push({ value: hour, label: hour });
    }

    return times;
};

const DatepickerInput = forwardRef(
    ({ value, onClick, onChange, placeholder }, ref) => {
        const handleInputClick = () => {
            onClick();
        };

        return (
            <input
                className={`${classes.datepickerInput} ${value ? classes.filledInput : ''}`}
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


const DateRangePicker = ({
    startRangeDate,
    endRangeDate,

    setStartRangeDate,
    setEndRangeDate,

    startTime,
    setStartTime,

    endTime,
    setEndTime,

    timeRangeIsValid,
    setTimeRangeIsValid,
}) => {
    const handleRangeChange = (dates) => {
        const [start, end] = dates;
        setStartRangeDate(start);
        setEndRangeDate(end);
    };

    const handleTimeChange = (selectedTime, isStart) => {
        if (isStart) {
            // We update the start time and check with the current endTime
            setStartTime(selectedTime);
            if (endTime !== null) {
                const startHour = Number.parseInt(selectedTime);
                const endHour = Number.parseInt(endTime);

                if (startHour >= endHour) {
                    setTimeRangeIsValid(false);
                } else {
                    setTimeRangeIsValid(true);
                }
            }
        } else {
            // We update the end time and check with the current startTime
            setEndTime(selectedTime);
            if (startTime !== null) {
                const startHour = Number.parseInt(startTime);
                const endHour = Number.parseInt(selectedTime);

                if (startHour >= endHour) {
                    setTimeRangeIsValid(false);
                } else {
                    setTimeRangeIsValid(true);
                }
            }
        }
    };

    const CustomTime = () => {
        const timeOptions = generateTimeOptions();

        const handleDropdownChange = (option, isStart) => {
            if (option && option.value) {
                handleTimeChange(option.value, isStart);
            }
        };


        return <div className={classes.timeSelection}>
            <div className={classes.timePicker}>
                <label>Start Time:</label>
                <Dropdown
                    options={timeOptions}
                    type={Dropdown.types.basic.name}
                    value={startTime ? { value: startTime, label: startTime } : null}
                    onChange={(option) => handleDropdownChange(option, true)}
                    placeholderText="Select Start Time"
                />
            </div>
            {
                timeRangeIsValid === false
                    ? <span className='error' style={{
                        fontSize: '16px'
                    }}>Incorrect time range</span>
                    : null
            }
            <div className={classes.timePicker}>
                <label>End Time:</label>
                <Dropdown
                    options={timeOptions}
                    type={Dropdown.types.basic.name}
                    value={endTime ? { value: endTime, label: endTime } : null}
                    onChange={(option) => handleDropdownChange(option, false)}
                    placeholderText="Select End Time"
                />
            </div>
        </div>;
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
            customInput={<DatepickerInput/>}
            dateFormat="EEE, d MMM"
            shouldCloseOnSelect={false}
            calendarContainer={({children}) => (
                <div className='react-datepicker'>
                    <div className={classes.calendarWrapper}>
                        {children}
                    </div>
                    <div>
                        {startRangeDate && endRangeDate && <CustomTime />}
                    </div>
                </div>
            )}
        />
    </>;
};

export default DateRangePicker;