export const getHost = () => process.env.IS_PROD === 'yes'
    ? `${process.env.HOST}`
    : `${process.env.HOST}:${process.env.PORT}`;