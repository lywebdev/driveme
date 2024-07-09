import classes from './Container.module.scss';
import {combineClassNames, expandVariants} from "@helpers/stringHelper.js";


const bgColors = {
    gray: 'bg--gray',
};

const Container = ({children, variants, className}) => {
    const combinedClasses = combineClassNames([classes.container, ...expandVariants(classes, variants)], className);

    return <div className={combinedClasses}>
        <div className="container">{children}</div>
    </div>;
};

Container.bgColors = bgColors;


export default Container;