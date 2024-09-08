import classes from "@components/shared/Pagination/Pagination.module.scss";
import {combineClassNames} from "@helpers/stringHelper.js";
import {NavLink} from "react-router-dom";
import React from "react";

const Pagination = React.memo((
    { totalPages, currentPage, className, path, getParameters }
) => {
    const pageNumbers = Array.from({ length: totalPages }, (v, i) => i + 1);
    const combinedClasses = combineClassNames(classes['pagination-buttons'], className);

    delete getParameters.page;


    return (
        <div className={combinedClasses}>
            {
                pageNumbers.map(page => {
                    const url = `${path}?${new URLSearchParams(getParameters).toString()}&page=${page}`;

                    return (
                        <NavLink
                            key={page}
                            to={url}
                            className={
                                `${page === Number(currentPage) ? classes.active : false} ${classes.button}`
                            }
                        >{page}</NavLink>
                    );
                })
            }
        </div>
    );
});

Pagination.displayName = "Pagination";


export default Pagination;