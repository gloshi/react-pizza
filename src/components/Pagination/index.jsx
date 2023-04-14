import React from 'react'
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss'

const Pagination = ({onChangePage}) => {
    
  return (
    <div className={styles.wrapper}>
        <ReactPaginate 
        className={styles.root}
        breakLabel="..."
        nextLabel=" >"
        previousLabel="< "
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={3}
        renderOnZeroPageCount={null}
      />
    </div>
  )
}
export default Pagination
