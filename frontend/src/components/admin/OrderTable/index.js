import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Table, Dropdown, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment/moment"
import { BsThreeDotsVertical } from "react-icons/bs"
import styles from "./styles.module.scss"
import { routes } from "../../../routes"
import PaginationCustom from "../../common/Pagination"
import {
  getOrders,
  getSingleOrder,
  orderReset,
} from "../../../_features/ordersSlice"
import InputField from "../../businessDetails/common/InputField"

const OrderTable = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const orderRedux = useSelector((state) => state?.orders)
  const [search, setSearch] = useState("")

  useEffect(() => {
    return () => {
      dispatch(orderReset())
    }
  }, [])
  // eslint-disable-next-line react/no-unstable-nested-components
  const ActionComponent = ({ item }) => (
    <div className={styles.tableActionsWrapper}>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          <BsThreeDotsVertical />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={async () => {
              const a = await dispatch(getSingleOrder(item?._id))
              if (a.payload?.success) {
                return navigate(`${routes.adminOrder}${item?._id}`, {
                  state: {
                    id: item?._id,
                  },
                })
              }
            }}
          >
            View
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {/* <Button>
        <MdDelete />
      </Button> */}
    </div>
  )
  useEffect(() => {
    if (search?.length === 0) {
      dispatch(getOrders({ page: 1, search: search }))
    }
  }, [search])

  const callFunction = () => {
    if (search.length !== 0) {
      return dispatch(getOrders({ page: 1, search: search }))
    }
  }
  return (
    <div className={styles.tableWrapper}>
      <div className={`${styles.searchBox} d-flex align-items-center`}>
        <InputField
          type="text"
          placeholder="Search"
          value={search}
          onKeyPress={(e) => (e.key === "Enter" ? callFunction() : "")}
          onChange={(e) => setSearch(e?.target.value)}
        />
        <Button onClick={() => callFunction()}>Search</Button>
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th>Service Name</th>
            <th>User Name</th>
            <th>Price</th>
            <th>Stripe Status</th>
            <th>Admin Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderRedux.isLoading && orderRedux.orders === null ? (
            <div>loading</div>
          ) : orderRedux.isLoading === false &&
            orderRedux?.orders?.length === 0 ? (
            <div>not data</div>
          ) : (
            orderRedux.orders?.map((item, i) => (
              <tr key={i}>
                <td>
                  {item?.serviceId?.title ||
                    item?.serviceDetails?.name + " form"}
                </td>
                <td>{item?.userId?.firstName}</td>
                <td>${item?.price}</td>{" "}
                <td>{item?.status ? "Paid" : "Not paid"}</td>
                <td>
                  {item?.orderStatusAdmin?.title
                    ? item?.orderStatusAdmin?.title
                    : "-"}
                </td>
                <td>{moment(item?.createdAt).format("MMMM Do YYYY")}</td>
                <td>
                  <ActionComponent item={item} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      {orderRedux?.orders?.length !== 0 && (
        <PaginationCustom items={orderRedux} get={getOrders} search={search} />
      )}
    </div>
  )
}

export default OrderTable
