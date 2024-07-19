import TransportCard from "@components/shared/Transport/TransportCard.jsx";

const CategoryTransports = ({transports}) => {
    return (
        <div className="transport-card-container">
            {transports.length && transports.map((transport) => (
                <TransportCard
                    key={transport.id}
                    transport={transport}
                />
            ))}
        </div>
    );
};

export default CategoryTransports;