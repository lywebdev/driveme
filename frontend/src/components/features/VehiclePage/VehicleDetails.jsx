import styles from "./VehicleDetails.module.scss";

const VehicleDetails = ({title, owner}) => {
    return (
        <div className={styles.vehicle_details} >
            <h1>{title}</h1>
            <div className={styles.delimiter}></div>
            <p>{owner} &bull; Owner</p>
        </div>
    );
};

export default VehicleDetails;