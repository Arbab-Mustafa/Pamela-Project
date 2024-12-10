import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { Table, Dropdown, Button } from "react-bootstrap"
import { BsThreeDotsVertical } from "react-icons/bs"
import styles from "./styles.module.scss"
import { routes } from "../../../routes"
import PaginationCustom from "../../common/Pagination"
import CustomModal from "../../common/Modal"

import {
  deleteUser,
  getSingleUser,
  getUsers,
} from "../../../_features/usersSlice"
import {
  makeAdminFunction,
  removeAdminFunction,
} from "../../../utils/helperApis"
import InputField from "../../businessDetails/common/InputField"

const UserTable = () => {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [confirmAdmin, setConfirmAdmin] = useState(false)
  const [removeAdmin, setRemoveAdmin] = useState(false)
  const [selectedValue, setSelectedValue] = useState(null)
  const handleClose = (item) => item(false)
  const navigate = useNavigate()
  const userData = useSelector((state) => state?.auth?.userData)
  const userRedux = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")

  // eslint-disable-next-line react/no-unstable-nested-components
  const ActionComponent = ({ item }) => (
    <div className={styles.tableActionsWrapper}>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          <BsThreeDotsVertical />
        </Dropdown.Toggle>
        <Dropdown.Menu onClick={() => setSelectedValue(item?._id)}>
          <Dropdown.Item
            onClick={async () => {
              const a = await dispatch(getSingleUser(item?._id))
              if (a.payload?.success) {
                return navigate(`${routes.adminUser}${item?._id}`, {
                  state: {
                    id: item?._id,
                  },
                })
              }
            }}
          >
            View
          </Dropdown.Item>
          {item?._id !== userData._id &&
            userData.adminRoleType &&
            userData?.adminRoleType?.name === "super admin" && (
              <>
                {item?.isAdmin ? (
                  <Dropdown.Item onClick={() => setRemoveAdmin(true)}>
                    Remove Admin
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item onClick={() => setConfirmAdmin(true)}>
                    Make Admin
                  </Dropdown.Item>
                )}
              </>
            )}

          {/* {!item?.isAdmin && ( */}
          {userData?.adminRoleType?.name === "super admin"
            ? item?._id !== userData._id && (
                <Dropdown.Item
                  onClick={() => {
                    setConfirmDelete(true)
                  }}
                >
                  Delete
                </Dropdown.Item>
              )
            : ""}

          {/* )} */}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
  useEffect(() => {
    if (search?.length === 0) {
      dispatch(getUsers({ page: 1, search: search }))
    }
  }, [search])

  const callFunction = () => {
    if (search.length !== 0) {
      return dispatch(getUsers({ page: 1, search: search }))
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
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            {/* <th>Company Owned</th> */}
            <th>Service Owned</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userRedux.isLoading && userRedux.users === null ? (
            <div>loading</div>
          ) : userRedux.isLoading === false &&
            userRedux?.users?.length === 0 ? (
            <div>not data</div>
          ) : (
            userRedux.users?.map((item, i) => (
              <tr key={i}>
                <td>{item?.firstName}</td>
                <td>{item?.lastName}</td> <td>{item?.email}</td>{" "}
                <td>{item?.phone}</td>{" "}
                {/* <td>{item?.companyOwned ? "yes" : "-"}</td> */}
                <td>
                  {item?.serviceDetails && item?.serviceDetails?.length !== 0
                    ? item?.serviceDetails[
                        Number(item?.serviceDetails?.length) - 1 || 0
                      ]?.title
                    : "-"}
                </td>
                <td>
                  <ActionComponent item={item} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      {userRedux?.users?.length !== 0 && (
        <PaginationCustom items={userRedux} get={getUsers} search={search} />
      )}
      <CustomModal
        show={confirmDelete}
        deleteFunction={deleteUser}
        id={selectedValue}
        type="delete"
        handleClose={() => handleClose(setConfirmDelete)}
        title="Confirm Delete"
      >
        <p>Are you sure, you want to delete this user.</p>
      </CustomModal>
      <CustomModal
        show={removeAdmin}
        deleteFunction={removeAdminFunction}
        id={selectedValue}
        type="remove-admin"
        handleClose={() => handleClose(setRemoveAdmin)}
        title="Confirm Remove"
      >
        <p>Are you sure, you want to Remove this user from Admin</p>
      </CustomModal>
      <CustomModal
        show={confirmAdmin}
        deleteFunction={makeAdminFunction}
        id={selectedValue}
        type="add-admin"
        handleClose={() => handleClose(setConfirmAdmin)}
        title="Confirm Add"
      >
        <p>Are you sure, you want to Add this user to Admin</p>
      </CustomModal>
    </div>
  )
}

export default UserTable
