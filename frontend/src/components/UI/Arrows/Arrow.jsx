const Arrow = ({reflectVertical}) => {
    const degrees = reflectVertical ? -180 : 0;

    return <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
            transform: `rotate(${degrees}deg)`,
            transition: `all 0.4s`
        }}
    >
        <path d="M4 6L8 10L12 6" stroke="#94A3B8" strokeWidth="1.33333" strokeLinecap="round"
            strokeLinejoin="round"/>
    </svg>;
};


export default Arrow;