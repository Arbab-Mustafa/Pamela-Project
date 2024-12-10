import React, { useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { Button, Form, Spinner } from "react-bootstrap"
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs"
import { toast } from "react-toastify"
import { useFormik } from "formik"
import * as Yup from "yup"
import styles from "./login.module.scss"
import main from "../../images/home/login/main.png"
import { routes } from "../../routes"
import axios from "../../_interceptor/customAxios"

function LoginPage() {
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required"),
    }),
    onSubmit: async function (values) {
      try {
        setLoading(true)
        const request = await axios.post("/user/forget-password", {
          email: values.email,
        })
        const response = await request.data
        if (response.success === true) {
          setLoading(false)
          setTimeout(() => {
            navigate(routes.home)
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
          <h2 className={`${styles.heading} text-start`}>Forget Password</h2>
          <p className="">Please enter email address for password reset</p>
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
