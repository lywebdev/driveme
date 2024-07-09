import classes from './SectionTitle.module.scss';

const SectionTitle = ({children, tag, withArrow, isLink}) => {
    let tagElement = tag ? <span className={classes.tag}>{tag}</span> : null;
    let icon = withArrow
        ? <div className={classes.icon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#172335" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round"/>
            </svg>
        </div>
        : null;

    const content = (
        <>
            {tagElement}
            <span>{children}</span>
            {icon}
        </>
    );

    return isLink
        ? <a href='#' className={classes['section-title']}>{content}</a>
        : <h2 className={classes['section-title']}>{content}</h2>;
};

export default SectionTitle;