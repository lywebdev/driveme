import TransportCard from "@components/shared/Transport/TransportCard.jsx";
import classes from './TransportsContainer.module.scss';
import {combineClassNames} from "@helpers/stringHelper.js";
import TransportCardSkeleton from "@components/shared/Transport/TransportCardSkeleton.jsx";
import {useTransportsStore} from "@store/useTransportsStore.js";

const TransportsContainer = ({ transports, className, marginTop, totalItems, perPage }) => {
    const [isLoading] = useTransportsStore(state => [state.isLoading]);

    const combinedClasses = combineClassNames(
        [classes['transports-container']],
        [className, marginTop ? classes['margin-top'] : null]
    );

    const renderTransportCards = () => {
        if (isLoading) {
            return Array.from({ length: perPage }).map((_, i) => (
                <TransportCardSkeleton key={i} />
            ));
        }

        if (transports.length > 0) {
            return transports.map((transport) => (
                <TransportCard key={transport.id} transport={transport} />
            ));
        }

        return null;
    };

    return (
        <div className={combinedClasses}>
            <div className={classes.info}>{totalItems} transports founded</div>
            <div className={classes.items}>
                {renderTransportCards()}
            </div>
        </div>
    );
};


export default TransportsContainer;