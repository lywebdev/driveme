import TransportCard from "@components/shared/Transport/TransportCard.jsx";
import classes from './TransportsContainer.module.scss';
import {combineClassNames} from "@helpers/stringHelper.js";

const TransportsContainer = ({transports, className, marginTop, totalItems}) => {
    const combinedClasses = combineClassNames(
        [classes['transports-container']],
        [className, marginTop ? classes['margin-top'] : null]
    );

    return (
        <div className={combinedClasses}>
            <div className={classes.info}>{totalItems} transports founded</div>

            <div className={classes.items}>
                {transports.length && transports.map((transport) => (
                    <TransportCard
                        key={transport.id}
                        transport={transport}
                    />
                ))}
            </div>
        </div>
    );
};

export default TransportsContainer;