import classes from './Transport.module.scss';
import PageTitle from "@components/shared/PageTitle/PageTitle.jsx";
import {combineClassNames} from "@helpers/stringHelper.js";


const Transport = ({transport}) => {
    const renderTransport = () => {
        if (transport === null) {
            return <p>Loading</p>;
        }

        const photo = transport?.photos !== null && transport?.photos !== undefined ? transport.photos[0] : null;

        return <>
            <div className={classes.photos}>
                <Image src={photo}/>
            </div>

            <InfoContainer className={classes.main}>
                <PageTitle className={classes.sidePaddings}>
                    <PageTitle.Top>{transport.name}</PageTitle.Top>
                </PageTitle>
                <Delimiter/>
                {
                    transport.owner && <div className={`${classes.authorInfo} ${classes.sidePaddings}`}>
                        <div className={classes.authorName}>{transport.owner}</div>
                        <div className={classes.dotDelimiter}></div>
                        <div className={classes.authorType}>Owner</div>
                    </div>
                }
            </InfoContainer>

            <InfoContainer className={classes.description}>
                <div className={`${classes.infoTitle} ${classes.sidePaddings}`}>Description by owner</div>
                <div className={`${classes.descriptionText} ${classes.sidePaddings}`}>
                    <p className={classes.text}>{transport.description}</p>
                </div>
                <Attributes attributes={transport.attributes} className={classes.sidePaddings}/>
            </InfoContainer>

            <InfoContainer>
                <div className={classes.sidePaddings}>
                    transport on map
                </div>
            </InfoContainer>
        </>;
    };


    return renderTransport();
};

const Image = ({src, alt}) => {
    return <div className={classes.imageContainer}>
        <img src={src} alt={alt ? alt : ''} className={classes.image}/>
    </div>;
};

const InfoContainer = ({children, className}) => {
    const combinedClasses = combineClassNames(classes.infoContainer, className);

    return <div className={combinedClasses}>{children}</div>;
};

const Delimiter = () => <div className={classes.delimiter}></div>;

const Attributes = ({attributes, className}) => {
    const combinedClasses = combineClassNames(classes.attributes, className);

    return <div className={combinedClasses}>
        {attributes && attributes.map((attribute, index) => (
            <div className={classes.attribute} key={index}>
                <div className={classes.attributeName}>{attribute.name}</div>
                <div className={classes.attributeDelimiter}></div>
                <div className={classes.attributeValue}>{attribute.value}</div>
            </div>
        ))}
    </div>;
};


Transport.Image = Image;
Transport.Container = InfoContainer;


export default Transport;