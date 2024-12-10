import React from "react"
import { Table } from "react-bootstrap"
import styles from "./styles.module.scss"

const ServiceTable = () => {
  return (
    <div className={styles.tableWrapper}>
      <Table responsive>
        <thead>
          <tr>
            <th>Service Name</th>
            <th>User Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Service Name</td>
            <td>User Name</td>
            <td>Price</td>
            <td>Status</td>
            <td>Date</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default ServiceTable
