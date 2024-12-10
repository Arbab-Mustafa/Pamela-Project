import moment from "moment"
import React, { useEffect } from "react"
import { Col, Row, Table, Dropdown } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { BsThreeDotsVertical } from "react-icons/bs"
import { useFormik } from "formik"
import * as Yup from "yup"
import PhoneInput from "react-phone-input-2"
import { useNavigate, useParams } from "react-router"
import InputField from "../../components/businessDetails/common/InputField"
import CustomSelect from "../../components/businessDetails/common/CustomSelect"
import { routes } from "../../routes"
import { getOrdersUser } from "../../_features/ordersSlice"
import { singleUserReset } from "../../_features/usersSlice"
import styles from "./SingleOrder.module.scss"
import PaginationCustom from "../../components/common/Pagination"
import { adminUserUpdate, userUpdate } from "../../_features/authSlice"

const User = () => {
  const id = useParams()?.id
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const singleUser = useSelector((state) => state?.users)
  const userOrders = useSelector((state) => state?.orders)
  const statesRed = useSelector((state) => state?.common?.state)

  const singleItem = singleUser?.singleUser
  const companyAddressOptions = statesRed?.map((value) => {
    return {
      value: value?.value,
      label: value?.name,
      price: value?.price,
      id: value?.id,
      parentName: "State",
    }
  })
  const formik = useFormik({
    initialValues: {
      edit: true,
      firstName: singleItem?.firstName || "",
      lastName: singleItem?.lastName || "",
      phone: singleItem?.phone || "",
      city: singleItem?.userAddress?.city || "",
      line1: singleItem?.userAddress?.line1 || "",
      line2: singleItem?.userAddress?.line2 || "",
      postal_code: singleItem?.userAddress?.postal_code || "",
      state: {
        label: singleItem?.userAddress?.state,
        value: singleItem?.userAddress?.state,
      } || {
        label: "Select State",
        value: "Select State",
      },
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("field is required"),
      lastName: Yup.string().required("field is required"),
      line1: Yup.string().required("field is required"),
      line2: Yup.string().required("field is required"),
      city: Yup.string().required("field is required"),
      postal_code: Yup.string()
        .required("field is required")
        .max(5, "Max five characters"),
      state: Yup.object().shape({
        value: Yup.string().required("field is required"),
      }),
    }),
    onSubmit: async (values, action) => {},
  })
  const updateFunction = (values) => {
    if (values.edit) {
      dispatch(
        adminUserUpdate({
          id: singleItem?._id,
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
        })
      )
    }
  }
  useEffect(() => {
    dispatch(getOrdersUser({ page: 1, userId: id }))
  }, [id])
  useEffect(() => {
    return () => {
      dispatch(singleUserReset())
    }
  }, [])

  if (singleUser.isLoading === false && singleUser.singleUser === null) {
    return navigate(routes.adminUsers)
  }
  if (singleUser.isLoading) {
    return (
      <>
        <div>loading</div>
      </>
    )
  }
  // eslint-disable-next-line react/no-unstable-nested-components
  const ActionComponent = ({ item }) => (
    <div className={styles.tableActionsWrapper}>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          <BsThreeDotsVertical />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() =>
              navigate(`${routes.adminOrder}${item?._id}`, {
                state: {
                  id: item?._id,
                },
              })
            }
          >
            View
          </Dropdown.Item>
          <Dropdown.Item>Make Admin</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {/* <Button>
        <MdDelete />
      </Button> */}
    </div>
  )

  return (
    <div>
      {" "}
      <div className={styles.orderDetail}>
        <div>
          <h4> Person Information</h4>
          <button
            onClick={() => {
              updateFunction(formik.values)
            }}
          >
            Update
          </button>
        </div>

        <Row className="align-items-center mb-2 mt-3 gy-2">
          <Col lg={4} sm={6}>
            <InputField
              label="First Name"
              name="firstName"
              onChange={formik.handleChange}
              disabled={!formik.values.edit}
              value={formik.values.firstName}
              error={formik.errors.firstName}
            />
          </Col>
          <Col lg={4} sm={6}>
            <InputField
              label="Last Name"
              name="lastName"
              onChange={formik.handleChange}
              disabled={!formik.values.edit}
              value={formik.values.lastName}
              error={formik.errors.lastName}
            />
          </Col>
          <Col lg={4} sm={6}>
            <InputField label="Email" disabled value={singleItem?.email} />
          </Col>
          <Col xs={3} lg={4} md={6}>
            <span className={styles.inputPhone}>Phone</span>
            <PhoneInput
              international
              autoComplete="off"
              country="us"
              disabled={!formik.values.edit}
              className={styles.phone}
              value={formik.values.phone}
              onChange={(e) => formik.setValues({ ...formik.values, phone: e })}
              name="phone"
            />
            {formik.touched.phone && formik.errors.phone && (
              <span className="error-message">{formik.errors.phone}</span>
            )}
          </Col>
          <Col lg={4} sm={6}>
            <InputField
              label="Service Owned"
              disabled
              value={singleItem?.serviceOwned ? "Yes" : "No"}
            />
          </Col>
          <Col lg={4} sm={6}>
            <InputField
              label="Stripe Id"
              disabled
              value={singleItem?.stripeId}
            />
          </Col>
        </Row>
        {singleItem?.userAddress && (
          <>
            {" "}
            <h5 className="mt-4">Person Address</h5>
            <Row className="align-items-center mb-2 gy-2">
              <Col lg={4} sm={6}>
                <InputField
                  label="City"
                  name="city"
                  onChange={formik.handleChange}
                  disabled={!formik.values.edit}
                  value={formik.values.city}
                  error={formik.errors.city}
                />
              </Col>
              <Col lg={4} sm={6}>
                <InputField
                  label="Address 1"
                  name="line1"
                  onChange={formik.handleChange}
                  disabled={!formik.values.edit}
                  value={formik.values.line1}
                  error={formik.errors.line1}
                />
              </Col>
              <Col lg={4} sm={6}>
                <InputField
                  label="Address 2"
                  name="line2"
                  onChange={formik.handleChange}
                  disabled={!formik.values.edit}
                  value={formik.values.line2}
                  error={formik.errors.line2}
                />
              </Col>
              <Col lg={4} sm={6}>
                <InputField
                  label="Postal Code"
                  name="postal_code"
                  onChange={formik.handleChange}
                  disabled={!formik.values.edit}
                  value={formik.values.postal_code}
                  error={formik.errors.postal_code}
                />
              </Col>
              <Col xs={3} lg={4} md={6}>
                <CustomSelect
                  options={companyAddressOptions}
                  label="State"
                  disabled={!formik.values.edit}
                  value={formik.values.state}
                  onChange={(e) => {
                    formik.setValues({
                      ...formik.values,
                      state: e,
                    })
                  }}
                />
                <span className="error-message">
                  {formik.errors.state?.value}
                </span>
              </Col>
            </Row>
          </>
        )}
        {/* <h5 className="mt-4">{singleItem?.firstName} Orders</h5>
        <div className={styles.tableWrapper}>
          <Table responsive>
            <thead>
              <tr>
                <th>Service Name</th>
                <th>User Name</th>
                <th>Price</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.isLoading && userOrders.usersOrder === null ? (
                <div>loading</div>
              ) : userOrders.isLoading === false &&
                userOrders?.usersOrder?.length === 0 ? (
                <div>not data</div>
              ) : (
                userOrders.usersOrder?.map((item, i) => (
                  <tr key={i}>
                    <td>
                      {" "}
                      {item?.serviceId?.title ||
                        item?.serviceDetails?.name + " form"}
                    </td>
                    <td>{item?.userId?.firstName}</td>
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
          {userOrders?.usersOrder?.length !== 0 && (
            <PaginationCustom
              items={userOrders}
              get={getOrdersUser}
              user={id}
            />
          )}
        </div> */}
      </div>
    </div>
  )
}

export default User
