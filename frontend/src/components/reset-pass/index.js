import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { Button, Form, Spinner, InputGroup } from "react-bootstrap"
import {
  BsArrowRightShort,
  BsArrowLeftShort,
  BsFillEyeFill,
  BsFillEyeSlashFill,
} from "react-icons/bs"
import { toast } from "react-toastify"
import { useFormik } from "formik"
import * as Yup from "yup"
import styles from "./login.module.scss"
import main from "../../images/home/login/main.png"
import { routes } from "../../routes"
import axios from "../../_interceptor/customAxios"

function LoginPage() {
  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const location = useLocation()
  const forgetToken = location.pathname.split("/")
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    async function verifyToken() {
      try {
        const request = await axios.post("/user/verify-password-token/", {
          forgetToken: forgetToken[2],
        })
        await request.data
      } catch (err) {
        return navigate(routes.home)
      }
    }
    verifyToken()
  }, [])
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
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
    onSubmit: async function (values) {
      try {
        setLoading(true)
        const request = await axios.post("/user/reset-password", {
          forgetToken: forgetToken[2],
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        })
        const response = await request.data
        if (response.success === true) {
          setLoading(false)
          setTimeout(() => {
            navigate(routes.login)
          }, 1000)
          return toast.success(response.message)
        }
      } catch (err) {
        setLoading(false)
        return toast.error(err.response.data.message)
      }
    },
  })
  return (
    <div className={styles.wrap}>
      <div className={styles.loginLeft}>
        <div className={styles.loginLeftContent}>
          <div className={styles.backBtnWrapper}>
            <Link to={routes.login} className={styles.backBtn}>
              <BsArrowLeftShort className={styles.icon} />
              Back
            </Link>
          </div>
          <h2 className={`${styles.heading} text-start`}>Reset Password</h2>
          <p className="">Please enter the new password for your account</p>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <InputGroup>
                <Form.Control
                  type={showPass ? "text" : "password"}
                  placeholder="Enter new password"
                  name="newPassword"
                  onChange={formik.handleChange}
                />
                <Button
                  className="password-btn"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                </Button>
              </InputGroup>
              {formik.touched.newPassword && formik.errors.newPassword && (
                <span className="error-message">
                  {formik.errors.newPassword}
                </span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <InputGroup>
                <Form.Control
                  type={showConfirmPass ? "text" : "password"}
                  placeholder="Confirm password"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                />
                <Button
                  className="password-btn"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                >
                  {showConfirmPass ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                </Button>
              </InputGroup>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <span className="error-message">
                    {formik.errors.confirmPassword}
                  </span>
                )}
            </Form.Group>
            <div className={styles.loginBtnWrapper}>
              <Button className={styles.loginBtn} type="submit">
                {isLoading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  <>
                    Send
                    <BsArrowRightShort className={styles.icon} />
                  </>
                )}
              </Button>
            </div>
          </Form>
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

export default LoginPage
