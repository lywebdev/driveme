import classes from './Pagination.module.scss';

const Pagination = ({ totalPages, onPageClick, currentPage }) => {
    return (
        <div className={classes['pagination-buttons']}>
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