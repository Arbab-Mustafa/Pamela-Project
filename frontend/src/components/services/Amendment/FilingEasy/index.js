import React from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { BsArrowRightShort } from "react-icons/bs"
import Select from "react-select"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik"
import * as Yup from "yup"
import styles from "./easy.module.scss"
import { entityOptions } from "../../../../utils/helpers"
import { addItem, addPrice } from "../../../../_features/cartSlice"
import { routes } from "../../../../routes"

function FilingEasy() {
  const statesRed = useSelector((state) => state?.common?.state)
  const totalPrice = useSelector((state) => state?.cart?.price)
  const selectedService = useSelector((state) => state.common.selectedService)
  const stateOptions = statesRed?.map((value) => {
    return {
      value: value?.value,
      label: value?.name,
      price: value?.price,
      id: value?.id,
      parentName: "State",
    }
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      state: "",
      entity: "",
    },
    validationSchema: Yup.object({
      entity: Yup.string().required(),
      state: Yup.string().required(),
    }),
  })
  return (
    <div className={styles.wrap}>
      <Container>
        <Row className={styles.row}>
          <Col lg={6} md={12}>
            <div className={styles.textblock}>
              <h2 className={styles.heading}>We Make Filing Easy</h2>
              <p className={styles.tagline}>
                We get it. Running a business takes time, money and lots of
                mental energy.
                <br />
                <br />
                Filthy Rich Idea offers fast and affordable professional filing services
                so your Articles of Amendment will be out of sight and out of
                mind. Life is short — why spend it doing paperwork?
                <br />
                <br />
                Use our form to enter your business type and state, and place an
                order. The rest is up to us.
              </p>
            </div>
          </Col>
          <Col lg={6} md={12}>
            <div className={styles.form}>
              <h3 className={styles.title}>Amendment</h3>
              <div className={styles.form1}>
                <p className={styles.subtitle}>Entity Type</p>
                <Select
                  options={entityOptions}
                  placeholder="Select Entity Type"
                  className="react-select-container"
                  classNamePrefix="react-select"
                  value={formik.values.entity.label}
                  onChange={(e) => {
                    formik.setValues({ ...formik.values, entity: e.value })
                    dispatch(addItem(e))
                    dispatch(addPrice())
                  }}
                  onBlur={formik.handleBlur}
                  name="entity"
                  id="entity"
                />
              </div>
              <div className={styles.form2}>
                <p className={styles.subtitle}>Entity State</p>
                <Select
                  options={stateOptions}
                  placeholder="Select State"
                  className="react-select-container"
                  classNamePrefix="react-select"
                  value={formik.values.state.label}
                  onChange={(e) => {
                    formik.setValues({ ...formik.values, state: e.value })
                    dispatch(addItem(e))
                    dispatch(addPrice())
                  }}
                  name="state"
                  id="state"
                />
              </div>
              <h4 className={styles.tagline}>${totalPrice}</h4>
              <p className={styles.tagline2}>Plus State Filing Fees</p>
              <div className={styles.button}>
                <div className={styles.btnblock}>
                  <Button
                    className={styles.btn}
                    disabled={!formik.values.entity || !formik.values.state}
                    onClick={() =>
                      navigate(`${routes.ServiceForm}${selectedService._id}`)
                    }
                  >
                    Order Now
                    <BsArrowRightShort className={styles.icon} />
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default FilingEasy
