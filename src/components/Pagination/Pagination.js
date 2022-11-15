import React from "react";
import classnames from "classnames";
import "./styles.scss";

const Pagination = (props) => {
  const { currentPage, onPageChange, pageSize, totalCount } = props;

  const paginationRange = Array.from(
    { length: Math.ceil(totalCount / pageSize) },
    (x, i) => i + 1
  );
  
  return (
    <div className="pagination">
      <ul className="pagination__container">
        {paginationRange.map((num, i) => {
          const classesLi = classnames({
            selected: currentPage === num,
          });
          return (
            <li className={classesLi} onClick={() => onPageChange(num)} key={i}>
              {num}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
