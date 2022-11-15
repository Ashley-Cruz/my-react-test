import React from 'react';

const Pagination = (props) => {

    const { currentPage, onPageChange, pageSize, totalCount } = props;

    const paginationRange = Array.from({length: Math.ceil(totalCount/pageSize)}, (x, i) => i+1);
  return (
    <div>
        {paginationRange.map((num, i) => {
            return (
                <li onClick={() => onPageChange(num)}>{num}</li>
            )
        })}
    </div>
  )
}

export default Pagination;