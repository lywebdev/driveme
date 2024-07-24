import classes from './PageTitle.module.scss';
import { combineClassNames } from '@helpers/stringHelper.js';

const PageTitle = ({children, className}) => {
    const combinedClasses = combineClassNames(classes['page-title'], className);

    return (<div className={combinedClasses}>
        {children}
    </div>);
};

const Top = ({children, className, ...props}) => {
    const combinedClasses = combineClassNames(classes.title, className);

    return <h1 className={combinedClasses} {...props}>{children}</h1>;
};

const Text = ({children, className, marginTop, ...props}) => {
    const combinedClasses = combineClassNames(classes.text, [className, marginTop ? classes['margin-top'] : null]);

    return <p className={combinedClasses} {...props}>{children}</p>;
};


PageTitle.Top = Top;
PageTitle.Text = Text;


export default PageTitle;