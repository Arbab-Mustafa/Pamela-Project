import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Button, Form, Spinner, InputGroup } from "react-bootstrap"
import {
  BsArrowRightShort,
  BsArrowLeftShort,
  BsFillEyeFill,
  BsFillEyeSlashFill,
} from "react-icons/bs"
import { useFormik } from "formik"
import * as Yup from "yup"
import { userLogin } from "../../_features/authSlice"
import styles from "./login.module.scss"
import main from "../../images/home/login/main.png"
import { routes } from "../../routes"

function LoginPage() {
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state?.auth)
  const selectedService = useSelector((state) => state.common.selectedService)

  const location = useLocation()
  useEffect(() => {
    if (auth?.userToken) {
      if (location?.state?.serviceProps) {
        navigate(`${routes.ServiceForm}${selectedService._id}`)
      } else if (location?.state?.agentServiceProp) {
        navigate(`${routes.ServiceForm}${selectedService._id}`)
      } else if (location?.state?.businessDetails) {
        navigate(routes.formOrderNow)
      } else {
        navigate(`${routes.formOrderNow}`)
      }
    }
  }, [auth?.userToken])
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required"),
      password: Yup.string()
        .min(8, "Password length must be 8")
        .required("Password is required"),
    }),
    onSubmit: function (values) {
      dispatch(
        userLogin({
          email: `${values.email}`,
          password: `${values.password}`,
        })
      )
    },
  })
  return (
    <div className={styles.wrap}>
      <div className={styles.loginLeft}>
        <div className={styles.loginLeftContent}>
          <div className={styles.backBtnWrapper}>
            <a href={"https://filthyrichidea.com/"} className={styles.backBtn}>
              <BsArrowLeftShort className={styles.icon} />
              Back
            </a>
          </div>
          <h2 className={styles.heading}>Sign In To Filthy Rich Idea</h2>
          <Form onSubmit={formik.handleSubmit}>
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
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <div className={styles.loginBtnWrapper}>
              <Button className={styles.loginBtn} type="submit">
                {auth?.isLoading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  <>
                    Login
                    <BsArrowRightShort className={styles.icon} />
                  </>
                )}
              </Button>
            </div>
          </Form>
          <div className={styles.createAccountWrapper}>
            <Link to={routes.forgetPass}>Forgot your password?</Link>
          </div>
          <div className={styles.createAccountWrapper}>
            <span className="me-1">Don't have an account?</span>
            <Link to={routes.register}>Create An Account</Link>
          </div>
        </div>
      </div>
      <div className={styles.loginRight}>
        <div className={styles.mainblock}>
          <img src={main} alt="main icon" className={styles.main} />
          <h5 className="mt-3">
            <a
              href="https://filthyrichidea.com/careers/"
              target="_blank"
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "600",
              }}
            >
              Work With Us!
            </a>
          </h5>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
