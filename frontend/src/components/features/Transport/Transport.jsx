import classes from './Transport.module.scss';
import PageTitle from "@components/shared/PageTitle/PageTitle.jsx";
import {combineClassNames} from "@helpers/stringHelper.js";


const Transport = ({transport}) => {
    return <>
        <div className={classes.photos}>
            <Image />
        </div>

        <InfoContainer className={classes.main}>
            <PageTitle className={classes.sidePaddings}>
                <PageTitle.Top>{transport.name}</PageTitle.Top>
            </PageTitle>
            <Delimiter />
            <div className={`${classes.authorInfo} ${classes.sidePaddings}`}>
                <div className={classes.authorName}>{transport.owner}</div>
                <div className={classes.dotDelimiter}></div>
                <div className={classes.authorType}>Owner</div>
            </div>
        </InfoContainer>

        <InfoContainer className={classes.description}>
            <div className={`${classes.infoTitle} ${classes.sidePaddings}`}>Description by owner</div>
            <Attributes attributes={transport.attributes} className={classes.sidePaddings} />
        </InfoContainer>
    </>;
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
        {attributes.map((attribute, index) => (
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