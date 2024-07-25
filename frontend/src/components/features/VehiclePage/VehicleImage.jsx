import { resolveAlias } from "@helpers/imageHelper";
import styles from "./VehicleImage.module.scss";

const VehicleImage = ({src, alt}) => {
    return (
        <div className={styles.vehicle_image_container}>
            <img src={resolveAlias(src)} alt={alt} className={styles.vehicle_image}/>
        </div>
    );
};

export default VehicleImage;