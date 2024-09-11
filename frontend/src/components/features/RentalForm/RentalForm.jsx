import classes from "./RentalForm.module.scss";
import Input from "@components/UI/Input/Input";
import Button from "@components/UI/Button/Button";
import "react-datepicker/dist/react-datepicker.css";
import DateRangePicker from "@components/UI/Datepicker/Datepicker.jsx";
import {useState} from "react";
import Modal from "@components/features/Modals/Modal.jsx";
import useModal from "../../../hooks/useModal.js";
import {Steps} from "react-step-builder";
import ContactForm from "@components/features/OrderSteps/ContactForm.jsx";
import OrderContextProvider from "../../../contexts/OrderContext.jsx";
import BillingForm from "@components/features/OrderSteps/BillingForm.jsx";

const calculateTotalPrice = (startRangeDate, endRangeDate, cost) => {
    if (!startRangeDate || !endRangeDate) return null;

    const oneDayInMs = 1000 * 60 * 60 * 24;
    const startMs = new Date(startRangeDate).getTime();
    const endMs = new Date(endRangeDate).getTime();
    const daysBetween = Math.ceil((endMs - startMs) / oneDayInMs) + 1;

    return cost * daysBetween;
};

const RentalForm = ({ className, transport }) => {
    const [location, setLocation] = useState(`${transport.locationData.city}, ${transport.locationData.address}, ${transport.locationData.postalCode}` || '');
    const [startRangeDate, setStartRangeDate] = useState(null);
    const [endRangeDate, setEndRangeDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [timeRangeIsValid, setTimeRangeIsValid] = useState(null);

    const { isOpen, openModal, closeModal } = useModal();

    const handleLocationChange = (e) => setLocation(e.target.value);

    const totalPrice = calculateTotalPrice(startRangeDate, endRangeDate, transport.cost);

    return (
        <OrderContextProvider>
            <div className={className}>
                <div className={classes.form}>
                    <div className={classes.title}>Rent Period</div>

                    <DateRangePicker
                        startRangeDate={startRangeDate}
                        endRangeDate={endRangeDate}
                        setStartRangeDate={setStartRangeDate}
                        setEndRangeDate={setEndRangeDate}
                        startTime={startTime}
                        setStartTime={setStartTime}
                        endTime={endTime}
                        setEndTime={setEndTime}
                        timeRangeIsValid={timeRangeIsValid}
                        setTimeRangeIsValid={setTimeRangeIsValid}
                    />

                    <div>
                        <div style={{marginBottom: '10px'}}>Pickup location</div>
                        <Input
                            variants={[
                                Input.variants.notHigh,
                                Input.variants.unsetMinWidth,
                                Input.variants.whiteBg,
                                Input.variants.colorGray,
                                Input.variants.unsetShadow,
                            ]}
                            placeholder="Specify the desired address"
                            value={location}
                            onChange={handleLocationChange}
                        />
                    </div>

                    <Button
                        isSubmit
                        variants={[Button.variants.action, Button.variants.fullWidth]}
                        className={classes.button}
                    >
                        Continue
                    </Button>

                    <button onClick={openModal}>Открыть модалку</button>

                    <Modal isOpen={isOpen} onClose={closeModal}>
                        {/* @todo create a navigation */}
                        <Steps>
                            <ContactForm />
                            <BillingForm />
                        </Steps>
                    </Modal>

                    <div className={classes.prices}>
                        <div className={classes.rentCalculatedPrice}>
                            {transport.cost} $ / per day
                        </div>
                        {
                            totalPrice && (
                                <div className={classes.rentCalculatedTotalPrice}>
                                    <span>Total</span>
                                    <span>{totalPrice} $</span>
                                </div>
                            )
                        }
                    </div>

                    <p className={classes.rentInfo}>You are not paying for anything yet. By submitting a request, you can personally discuss the details of the booking with the owner of the car.</p>
                </div>
            </div>
        </OrderContextProvider>
    );
};

export default RentalForm;