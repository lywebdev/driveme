import { useState } from 'react';

const useSortTransports = (initialTransports) => {
    const [transports, setTransports] = useState(initialTransports);

    const sortTransports = (sortBy) => {
        switch (sortBy) {
        case "Descending":
            setTransports([...transports].sort((a, b) => b.cost - a.cost));
            break;
        case "Ascending":
            setTransports([...transports].sort((a, b) => a.cost - b.cost));
            break;
        default:
            setTransports([...transports].sort((a, b) => a.id - b.id));
            break;
        }
    };

    return { transports, sortTransports };
};

export default useSortTransports;