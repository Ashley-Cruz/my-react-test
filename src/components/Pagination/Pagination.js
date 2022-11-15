import React from "react";
import classnames from "classnames";
import "./styles.scss";

const Pagination = (props) => {
  const { currentPage, onPageChange, pageSize, totalCount } = props;

  const onPrevious = () => {
    if (currentPage === 1) return;
    onPageChange(currentPage - 1);
  }

  const onNext = () => {
    if (currentPage === lastPage) return;
    onPageChange(currentPage + 1);
  }

  const paginationRange = Array.from(
    { length: Math.ceil(totalCount / pageSize) },
    (x, i) => i + 1
  );

  const lastPage = paginationRange.length;
  
  return (
    <div className="pagination">
      <ul className="pagination__container">
        <li className={classnames('bttn',{disabled: currentPage === 1})} onClick={onPrevious}>
          <span className="arrow left"></span>
        </li>
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
        <li className={classnames('bttn',{disabled: currentPage === lastPage})} onClick={onNext}>
        <span className="arrow right"></span>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
