import TransportTypeCard from "@components/shared/TransportType/TransportTypeCard.jsx";
import classes from './TransportTypeCards.module.scss';
import {combineClassNames} from "@helpers/stringHelper.js";
import {useTransportTypeStore} from "@store/useTransportTypeStore.js";


const TransportTypeCards = ({className, transportTypes}) => {
    const combinedClasses = combineClassNames(classes['transport-type-cards'], className);
    const [isLoading] = useTransportTypeStore(state => [
        state.isLoading,
    ]);

    return (
        <div className={combinedClasses}>
            {
                !isLoading
                    ? transportTypes.map((transportType, index) => <TransportTypeCard key={index} transportType={transportType}/>)
                    : null
            }
        </div>
    );
};


export default TransportTypeCards;