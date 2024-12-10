import React, { useState } from "react"
import { Container, Button, Form, InputGroup } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import * as Yup from "yup"
import { useFormik } from "formik"
import { toast } from "react-toastify"
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs"
import styles from "./styles.module.scss"
import InputField from "../../businessDetails/common/InputField"
import PhoneSelect from "../../businessDetails/common/PhoneInput"
import DetailCard from "../../businessDetails/common/DetailCard"
import { userUpdate } from "../../../_features/authSlice"
import customAxios from "../../../_interceptor/customAxios"

const MyProfile = () => {
  const [edit, setEdit] = useState(true)
  const [edit2, setEdit2] = useState(true)
  const [showOldPass, setShowOldPass] = useState(false)
  const [showNewPass, setShowNewPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const user = useSelector((state) => state?.auth?.userData)
  const isLoading = useSelector((state) => state?.auth?.isLoading)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "",
      email: user.email || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      phone: Yup.string().required("Phone is required"),
      email: Yup.string().email().required("Email is required"),
    }),
    onSubmit: function (values) {
      dispatch(
        userUpdate({
          id: user._id,
          firstName: values?.firstName,
          lastName: values?.lastName,
          phone: `${values?.phone}`,
        })
      )
    },
  })
  const formik2 = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .min(8, "Password length must be 8")
        .max(30, "Password length less then 30")
        .required("Password is required")
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        ),
      newPassword: Yup.string()
        .min(8, "Password length must be 8")
        .max(30, "Password length less then 30")
        .required("Password is required")
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        ),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("newPassword"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: async function (values, action) {
      try {
        const request = await customAxios.post("/auth/change-password", {
          userId: user._id,
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        })
        const response = await request.data
        if (response.success === true) {
          action.resetForm()
          return toast.success(response.message)
        }
      } catch (err) {
        return toast.error(err.response.data.message)
      }
    },
  })

  return (
    <Container>
      <div className={styles.myProfileWrapper}>
        <DetailCard
          title="User Information"
          type="edit"
          editClick={() => {
            setEdit(false)
            formik.initialValues()
          }}
          editState={edit}
        >
          <p className={styles.detailCardDesciption}>
            Here you can edit information about yourself.
          </p>
          <DetailCard title="Contact Information">
            <Form onSubmit={formik.handleSubmit}>
              <div className={styles.detailCardFieldsWrapper}>
                <div className={styles.inpField}>
                  <InputField
                    label="First Name *"
                    name="firstName"
                    type="text"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    disabled={edit}
                    error={formik.errors.firstName}
                  />
                </div>
                <div className={styles.inpField}>
                  <InputField
                    label="Last Name *"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    type="text"
                    disabled={edit}
                    error={formik.errors.lastName}
                  />
                </div>
                <div className={styles.inpField}>
                  <InputField
                    label="Email *"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    type="email"
                    disabled
                    error={formik.errors.email}
                  />
                </div>
                <div className={styles.inpField}>
                  <PhoneSelect
                    label="Mobile Phone *"
                    disabled={edit}
                    value={formik.values.phone}
                    onChange={(e) =>
                      formik.setValues({ ...formik.values, phone: e })
                    }
                    error={formik.errors.phone}
                  />
                </div>
              </div>
            </Form>
            {!edit && (
              <div className={styles.btnWrapper}>
                <Button
                  className={styles.cancelBtn}
                  onClick={() => {
                    setEdit(true)
                    formik.setValues(formik.initialValues)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isLoading}
                  className={styles.updateBtn}
                  onClick={formik.handleSubmit}
                >
                  Update
                </Button>
              </div>
            )}
          </DetailCard>
          <DetailCard
            title="Change Password"
            type="edit"
            editClick={() => setEdit2(false)}
            editState={edit2}
          >
            <div className={styles.detailCardFieldsWrapper}>
              <div className={styles.inpField}>
                <div className={styles.inputFieldLabel}>Old Password</div>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <Form.Control
                      type={showOldPass ? "text" : "password"}
                      name="oldPassword"
                      value={formik2.values.oldPassword}
                      onChange={formik2.handleChange}
                      disabled={edit2}
                    />
                    <Button
                      className="password-btn"
                      onClick={() => setShowOldPass(!showOldPass)}
                      disabled={edit2}
                    >
                      {showOldPass ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                    </Button>
                  </InputGroup>
                  {formik.touched.oldPassword && formik.errors.oldPassword && (
                    <span className="error-message">
                      {formik2.errors.oldPassword}
                    </span>
                  )}
                </Form.Group>
                {/* <InputField
                  label="Old Password"
                  name="oldPassword"
                  value={formik2.values.oldPassword}
                  onChange={formik2.handleChange}
                  type="text"
                  disabled={edit2}
                  error={formik2.errors.oldPassword}
                /> */}
              </div>
              <div className={styles.inpField}>
                <div className={styles.inputFieldLabel}>New Password</div>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <Form.Control
                      type={showNewPass ? "text" : "password"}
                      name="newPassword"
                      value={formik2.values.newPassword}
                      onChange={formik2.handleChange}
                      disabled={edit2}
                    />
                    <Button
                      className="password-btn"
                      onClick={() => setShowNewPass(!showNewPass)}
                      disabled={edit2}
                    >
                      {showNewPass ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                    </Button>
                  </InputGroup>
                  {formik.touched.newPassword && formik.errors.newPassword && (
                    <span className="error-message">
                      {formik2.errors.newPassword}
                    </span>
                  )}
                </Form.Group>
                {/* <InputField
                  label="New Password"
                  name="newPassword"
                  value={formik2.values.newPassword}
                  onChange={formik2.handleChange}
                  type="text"
                  disabled={edit2}
                  error={formik2.errors.newPassword}
                /> */}
              </div>
              <div className={styles.inpField}>
                <div className={styles.inputFieldLabel}>Confirm Password</div>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <Form.Control
                      type={showConfirmPass ? "text" : "password"}
                      name="confirmPassword"
                      value={formik2.values.confirmPassword}
                      onChange={formik2.handleChange}
                      disabled={edit2}
                    />
                    <Button
                      className="password-btn"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      disabled={edit2}
                    >
                      {showConfirmPass ? (
                        <BsFillEyeSlashFill />
                      ) : (
                        <BsFillEyeFill />
                      )}
                    </Button>
                  </InputGroup>
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <span className="error-message">
                        {formik2.errors.confirmPassword}
                      </span>
                    )}
                </Form.Group>
                {/* <InputField
                  label="Confirm Password"
                  name="confirmPassword"
                  value={formik2.values.confirmPassword}
                  onChange={formik2.handleChange}
                  type="text"
                  disabled={edit2}
                  error={formik2.errors.confirmPassword}
                /> */}
              </div>
            </div>
            {/* <div className={styles.inpField}>
                <InputField
                  label="Address (Cont)"
                  name="contAddress"
                  type="text"
                  disabled={edit}
                />
              </div>
              <div className={styles.inpField}>
                <InputField
                  label="City *"
                  name="city"
                  type="text"
                  disabled={edit}
                />
              </div>
              <div className={styles.inpField}>
                <CustomSelect
                  label="State *"
                  name="state"
                  placeholder="Select State"
                  options={stateOptions}
                  disabled={edit}
                />
              </div>
              <div className={styles.inpField}>
                <InputField
                  label="Zip Code *"
                  name="zipCode"
                  type="text"
                  disabled={edit}
                />
              </div>
            </div>
            <CardInfo title="How will this address be used?">
              The contact address is the primary address used for the delivery
              of any documents or products related to your order. This address
              is used for internal purposes only and will not be shared with any
              third parties or other outside agencies unless provided in any
              subsequent pages of the order process which require the intake of
              an address.
            </CardInfo> */}
          </DetailCard>
          {!edit2 && (
            <div className={styles.btnWrapper}>
              <Button
                className={styles.cancelBtn}
                onClick={() => {
                  setEdit2(true)
                  formik2.resetForm()
                }}
              >
                Cancel
              </Button>
              <Button
                disabled={formik2.isSubmitting}
                className={styles.updateBtn}
                onClick={formik2.handleSubmit}
              >
                Update
              </Button>
            </div>
          )}
        </DetailCard>
      </div>
    </Container>
  )
}

export default MyProfile
