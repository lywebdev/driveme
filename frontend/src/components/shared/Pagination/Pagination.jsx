import classes from './Pagination.module.scss';

const Pagination = ({ totalPages, onPageClick }) => {
    return (
        <div className={classes['pagination-buttons']}>
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => onPageClick(index)}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;