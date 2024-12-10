import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import PhoneInput from "react-phone-input-2"
import { Button, Form, Spinner, InputGroup } from "react-bootstrap"
import {
  BsArrowRightShort,
  BsFillEyeFill,
  BsFillEyeSlashFill,
} from "react-icons/bs"
import { useFormik } from "formik"
import * as Yup from "yup"
import { userSignup, userReset } from "../../_features/authSlice"
import styles from "./signup.module.scss"
import main from "../../images/home/login/main.png"
import { routes } from "../../routes"

function SignUpPage() {
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state?.auth)
  useEffect(() => {
    if (auth?.isNewUser === true) navigate(`${routes.login}`)
    dispatch(userReset())
  }, [auth?.isNewUser])
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      phone: Yup.string().required("Phone is required"),
      email: Yup.string().email().required("Email is required"),
      password: Yup.string()
        .min(8, "Password length must be 8")
        .max(30, "Password length less then 30")
        .required("Password is required")
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        ),
    }),
    onSubmit: function (values) {
      dispatch(
        userSignup({
          firstName: values?.firstName,
          lastName: values?.lastName,
          phone: `${values?.phone}`,
          email: values?.email,
          password: values?.password,
        })
      )
    },
  })

  return (
    <div className={styles.wrap}>
      <div className={styles.loginLeft}>
        <div className={styles.loginLeftContent}>
          <h2 className={styles.heading}>Sign up To Filthy Rich Idea</h2>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="firstName"
                onChange={formik.handleChange}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <span className="error-message">{formik.errors.firstName}</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="lastName"
                onChange={formik.handleChange}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <span className="error-message">{formik.errors.lastName}</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <PhoneInput
                international
                autoComplete="off"
                country="us"
                className={styles.phone}
                value={formik.values.phone}
                onChange={(e) =>
                  formik.setValues({ ...formik.values, phone: e })
                }
                name="phone"
              />
              {formik.touched.phone && formik.errors.phone && (
                <span className="error-message">{formik.errors.phone}</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email && (
                <span className="error-message">{formik.errors.email}</span>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <InputGroup>
                <Form.Control
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  onChange={formik.handleChange}
                />
                <Button
                  className="password-btn"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                </Button>
              </InputGroup>
              {formik.touched.password && formik.errors.password && (
                <span className="error-message">{formik.errors.password}</span>
              )}
            </Form.Group>

            <div className={styles.loginBtnWrapper}>
              <Button
                className={styles.loginBtn}
                type="submit"
                disabled={auth?.isLoading}
              >
                {auth.isLoading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  <>
                    Signup
                    <BsArrowRightShort className={styles.icon} />
                  </>
                )}
              </Button>
            </div>
          </Form>
          <div className={styles.createAccountWrapper}>
            <span className="me-1">Have an account?</span>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
      <div className={styles.loginRight}>
        <div className={styles.mainblock}>
          <img src={main} alt="main icon" className={styles.main} />
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
