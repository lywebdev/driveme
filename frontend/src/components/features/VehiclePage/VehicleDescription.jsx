import styles from "./VehicleDescription.module.scss";

const VehicleDescription = ({ descriptions, values }) => (
    <div className={styles.vehicle_description}>
        <h1>Description by owner</h1>
        <hr />
        {descriptions.map((desc, index) => (
            <div key={index} className={styles.info}>
                <p>{desc}</p>
                <div className={styles.delimiter}></div>
                <p>{values[index]}</p>
            </div>
        ))}
    </div>
);

export default VehicleDescription;
