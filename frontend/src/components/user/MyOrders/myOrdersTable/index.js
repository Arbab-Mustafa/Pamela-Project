import React, { useEffect } from "react"
import { Table, Dropdown, Button } from "react-bootstrap"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment/moment"
import { BsEyeFill, BsThreeDotsVertical } from "react-icons/bs"
import styles from "./styles.module.scss"
import PaginationCustom from "../../../common/Pagination"
import { routes } from "../../../../routes"
import {
  getOrdersUserNotAdmin,
  orderReset,
} from "../../../../_features/ordersSlice"

const OrderTable = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state?.auth?.userData)
  const dispatch = useDispatch()
  const orderRedux = useSelector((state) => state?.orders)
  useEffect(() => {
    return () => {
      dispatch(orderReset())
    }
  }, [])

  // eslint-disable-next-line react/no-unstable-nested-components
  const ActionComponent = ({ item }) => (
    <div className={styles.tableActionsWrapper}>
      <Button
        onClick={() =>
          navigate(`${routes.userOrders}/${item?._id}`, {
            state: {
              id: item?._id,
            },
          })
        }
      >
        <BsEyeFill />
      </Button>

      {/* <Button>
        <MdDelete />
      </Button> */}
    </div>
  )

  return (
    <div className={styles.tableWrapper}>
      <Table responsive>
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>Title</td>
            <td>90$</td> <td>Paid</td>
            <td>MMMM Do YYYY</td>
            <td>
              <ActionComponent />
            </td>
          </tr> */}
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
                    `Business Form (${item?.serviceDetails?.name})`}
                </td>
                <td>{item?.price}$</td>{" "}
                <td>{item?.status ? "Paid" : "Not paid"}</td>
                <td>{moment(item?.createdAt).format("MMMM Do YYYY")}</td>
                <td>
                  <ActionComponent item={item} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      {orderRedux.length !== 0 && (
        <PaginationCustom
          items={orderRedux}
          get={getOrdersUserNotAdmin}
          user={user?._id}
        />
      )}
    </div>
  )
}

export default OrderTable
