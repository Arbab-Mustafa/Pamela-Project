import React from "react"
import { Container } from "react-bootstrap"
import styles from "./styles.module.scss"
import DetailCard from "../../businessDetails/common/DetailCard"
import OrderTable from "./myOrdersTable"

const MyOrders = () => {
  return (
    <div className={styles.myOrdersWrapper}>
      <Container>
        <DetailCard title="My Orders">
          <OrderTable />
        </DetailCard>
      </Container>
    </div>
  )
}

export default MyOrders
