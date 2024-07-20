import classes from './Pagination.module.scss';
import {combineClassNames} from "@helpers/stringHelper.js";

const Pagination = ({ totalPages, onPageClick, currentPage, className }) => {
    const combinedClasses = combineClassNames(classes['pagination-buttons'], className);

    return (
        <div className={combinedClasses}>
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => onPageClick(index)}
                    className={index + 1 === currentPage ? classes['active'] : ''}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;