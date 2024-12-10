import React, { useEffect, useState } from "react"
import { Pagination } from "react-bootstrap"
import { useDispatch } from "react-redux"

const PaginationCustom = ({ items, get, user, search = "" }) => {
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()
  useEffect(() => {
    if (user) {
      dispatch(get({ page: page, userId: user, search }))
    }
    if (!user) {
      dispatch(get({ page, search }))
    }
  }, [page, items?.total, user])

  return (
    <div>
      {" "}
      <Pagination className="pagination">
        <Pagination.Prev
          onClick={() => items?.prevPage && setPage(page - 1)}
          disabled={!items?.prevPage}
        />
        {Array.from({ length: Math.ceil(Number(items?.total) / 10) }).map(
          (e, i) => (
            <Pagination.Item
              className={items?.page === i + 1 ? "background-primary" : ""}
              active={items?.page === i + 1}
              key={i}
              onClick={() => setPage(i + i)}
            >
              {i + 1}
            </Pagination.Item>
          )
        )}

        <Pagination.Next
          onClick={() => items?.nextPage && setPage(page + 1)}
          disabled={items?.nextPage === false}
        />
      </Pagination>
    </div>
  )
}

export default PaginationCustom
