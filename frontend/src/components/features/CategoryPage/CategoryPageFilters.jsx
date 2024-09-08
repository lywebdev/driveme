import classes from './CategoryPageFilters.module.scss';

const CategoryPageFilters = ({
    attributesDropdown,
    orderingDropdown,
    priceOrderingDropdown,
}) => {
    return <div className={classes.filters}>
        <div className={classes.left}>
            <div className={classes.attributes}>
                {attributesDropdown}
            </div>
        </div>
        <div className={classes.right}>
            <div className="priceOrdering">
                {priceOrderingDropdown}
            </div>
            <div className={classes.ordering}>
                {orderingDropdown}
            </div>
        </div>
    </div>;
};


export default CategoryPageFilters;