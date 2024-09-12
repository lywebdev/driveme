import classes from './Datepicker.module.scss';
import DatePicker from "react-datepicker";
import {forwardRef, useEffect, useState} from "react";
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
    const [monthsShown, setMonthsShown] = useState(2); // Initially two months

    // We track changes in screen width and set the number of months
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1200) {
                setMonthsShown(1); // One month if the screen width is less than 1200px
            } else {
                setMonthsShown(2); // Two months with a screen width greater than or equal to 1200px
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleRangeChange = (dates) => {
        const [start, end] = dates;
        setStartRangeDate(start);
        setEndRangeDate(end);
    };

    const handleTimeChange = (selectedTime, isStart) => {
        if (isStart) {
            setStartTime(selectedTime);
            if (endTime !== null) {
                const startHour = Number.parseInt(selectedTime);
                const endHour = Number.parseInt(endTime);

                setTimeRangeIsValid(startHour < endHour);
            }
        } else {
            setEndTime(selectedTime);
            if (startTime !== null) {
                const startHour = Number.parseInt(startTime);
                const endHour = Number.parseInt(selectedTime);

                setTimeRangeIsValid(startHour < endHour);
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

        return (
            <div className={classes.timeSelection}>
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
                {timeRangeIsValid === false && (
                    <span className="error" style={{ fontSize: '16px' }}>
                        Incorrect time range
                    </span>
                )}
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
            </div>
        );
    };

    return (
        <>
            <DatePicker
                popperClassName={classes.popper}
                selected={startRangeDate}
                onChange={handleRangeChange}
                startDate={startRangeDate}
                endDate={endRangeDate}
                monthsShown={monthsShown}
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
                shouldCloseOnSelect={false}
                calendarContainer={({ children }) => (
                    <div className="react-datepicker">
                        <div className={classes.calendarWrapper}>{children}</div>
                        <div>{startRangeDate && endRangeDate && <CustomTime />}</div>
                    </div>
                )}
            />
        </>
    );
};

export default DateRangePicker;