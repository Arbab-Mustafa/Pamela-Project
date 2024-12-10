import React, { useEffect } from "react"
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  Spinner,
  ButtonToolbar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap"
import { BsArrowRightShort } from "react-icons/bs"
import { AiOutlineQuestionCircle } from "react-icons/ai"
import PhoneInput from "react-phone-input-2"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useFormik } from "formik"
import * as Yup from "yup"
import "react-phone-input-2/lib/style.css"
import Select from "react-select"
import { companyCreate, companyReset } from "../../../_features/companySlice"
import styles from "./articles.module.scss"
import icon from "../../../images/services/articlesofamendment/icon.svg"
import CheckCircle from "../../../images/services/articlesofamendment/check-circle.png"
import Taxes from "../../../images/services/articlesofamendment/business-taxes.png"
import Lock from "../../../images/services/articlesofamendment/lock.png"
import { entityOptions } from "../../../utils/helpers"
import { addItem, addPrice } from "../../../_features/cartSlice"
import { routes } from "../../../routes"
import DetailCard from "../../businessDetails/common/DetailCard"

function ArticlesOfAmendment() {
  const company = useSelector((state) => state?.company)
  const userData = useSelector((state) => state?.auth?.userData)
  const userToken = useSelector((state) => state?.auth?.userToken)
  const statesRed = useSelector((state) => state?.common?.state)
  const totalPrice = useSelector((state) => state?.cart?.price)
  const items = useSelector((state) => state?.cart?.items)
  const singleService = useSelector((state) => state?.common?.selectedService)

  const dispatch = useDispatch()

  const stateOptions = statesRed?.map((value) => {
    return {
      value: value?.value,
      label: value?.name,
      price: value?.price,
      id: value?.id,
      parentName: "State",
    }
  })
  const companyAddressOptions = statesRed?.map((value) => {
    return {
      value: value?.value,
      label: value?.name,
      price: value?.price,
      id: value?.id,
      parentName: "State",
    }
  })
  const stateServiceOptions = statesRed?.map((value) => {
    return {
      value: value?.value,
      label: value?.name,
      price: value?.price,
      id: value?.id,
      parentName: "State Service",
    }
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (!userToken) {
      navigate(`${routes.login}`, {
        state: {
          serviceProps: true,
        },
      })
      toast.error("Please login first")
    }
  }, [userToken])

  const formik = useFormik({
    initialValues: {
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      companyName: userData?.companyOwned?.companyName || "",
      streetAddress: userData?.companyOwned?.streetAddress || "",
      address: userData?.companyOwned?.address || "",
      city: userData?.companyOwned?.city || "",
      newCompany: "",
      newCompanyOption:
        {
          label: "",
          value: "",
        } || "",
      newCompanyDetail: "",
      state:
        {
          label: userData?.companyOwned?.state,
          value: userData?.companyOwned?.state,
        } || "",
      entityType: "",
      stateFormation: "",
      stateService: "",
      postal_code: userData?.companyOwned?.postal_code || "",
      checkbox: false,
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required(),
      streetAddress: Yup.string().required(),
      city: Yup.string().required(),
      address: Yup.string().required(),
      postal_code: Yup.string().required().max(5, "Max five characters"),
      stateService: Yup.string().required(),
      stateFormation: Yup.string().required(),
      entityType: Yup.string().required(),
      state: Yup.string().required(),
    }),
  })
  const handleNextBtn = () => {
    dispatch(
      companyCreate({
        companyName: formik?.values?.companyName,
        streetAddress: formik?.values?.streetAddress,
        address: formik?.values?.address,
        city: formik?.values?.city,
        stateService: formik?.values?.stateService,
        state: formik?.values?.state?.label,
        entityType: formik?.values?.entityType,
        stateFormation: formik?.values?.stateFormation,
        postal_code: formik?.values?.postal_code,
      })
    )
  }
  useEffect(() => {
    if (company?.companyData) {
      navigate(`${routes.amendmentServicePayment}`, {
        state: {
          service: {
            name: singleService?.title,
            serviceId: singleService._id,
            serviceDetails: {
              newCompany: formik.values.newCompany,
              newCompanyOption: formik.values.newCompanyOption.value,
              newCompanyDetail: formik.values.newCompanyDetail,
            },
          },
        },
      })
    }
    dispatch(companyReset())
  }, [company?.companyData])

  return (
    <div className={styles.wrap}>
      <Container>
        <Row>
          <Col lg={8}>
            <div className={styles.textblock}>
              <h1 className={styles.heading}>Articles of Amendment</h1>
              <p className={styles.tagline}>
                As time passes and businesses evolve, you may find that you are
                in a situation where your business name no longer fits the
                services you provide or perhaps the leadership team of your
                company is undergoing changes. Any major event that alters the
                information on your Articles of Incorporation or Articles of
                Organization needs to be reported to your secretary of state by
                filing an Articles of Amendment form.
              </p>
            </div>
            <div className={styles.contactinformation}>
              <h2 className={styles.title}>Contact Information</h2>
              <div className={styles.formblock}>
                <form className={styles.form}>
                  <div className={styles.formInpWrapper}>
                    <p className={styles.subtitle}>First Name *</p>
                    <input
                      placeholder="First Name *"
                      name="firstName"
                      autoComplete="off"
                      type="text"
                      className={styles.input}
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                    />
                    <span className="error-message">
                      {formik.errors.firstName}
                    </span>
                  </div>
                  <div className={styles.formInpWrapper}>
                    <p className={styles.subtitle}>Last Name *</p>
                    <input
                      placeholder="Last Name *"
                      name="lastName"
                      autoComplete="off"
                      type="text"
                      className={styles.input}
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                    />
                    <span className="error-message">
                      {formik.errors.lastName}
                    </span>
                  </div>
                  <div className={styles.formInpWrapper}>
                    <p className={styles.subtitle}>Email *</p>
                    <input
                      placeholder="Email *"
                      name="email"
                      autoComplete="off"
                      type="text"
                      className={styles.input}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                    />
                    <span className="error-message">{formik.errors.email}</span>
                  </div>
                  <div className={styles.formInpWrapper}>
                    <p className={styles.subtitle}>Mobile Phone *</p>
                    <PhoneInput
                      international
                      autoComplete="off"
                      // country="us"
                      className={styles.phone}
                      value={formik.values.phone}
                    />
                    <span className="error-message">{formik.errors.phone}</span>
                  </div>
                </form>
              </div>
            </div>

            <div className={styles.companyinformation}>
              <h2 className={styles.title}>Company Information</h2>
              <div className={styles.cardblock}>
                <div className={styles.card}>
                  <img src={icon} alt="icons" />
                  <div className={styles.textblock}>
                    <p className={styles.subtitle}>
                      The state of formation is the jurisdiction where a
                      business was legally established, while the state of
                      service is the location in which the company seeks to be
                      operate with customers.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.formblock}>
                <form className={styles.form}>
                  <div className={styles.form1}>
                    <p className={styles.subtitle}>Entity Type *</p>
                    <Select
                      options={entityOptions}
                      placeholder="Select Entity Type"
                      className="react-select-container"
                      classNamePrefix="react-select"
                      value={formik.values.entityType.label}
                      onChange={(e) => {
                        formik.setValues({
                          ...formik.values,
                          entityType: e.value,
                        })
                        dispatch(addItem(e))
                        dispatch(addPrice())
                      }}
                      onBlur={formik.handleBlur}
                      name="entityType"
                      id="entityType"
                    />
                    {/* <span className="error-message">
                      {formik.errors.entityType}
                    </span> */}
                  </div>
                  <div className={styles.form2}>
                    <div className="d-flex align-items-center justify-content-between">
                      <p className={styles.subtitle}>State Of Formation *</p>
                      <ButtonToolbar>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              The state of formation is the jurisdiction where a
                              business was legally established.
                            </Tooltip>
                          }
                        >
                          <Button
                            style={{
                              background: "none",
                              padding: "0",
                              color: "#43a6e1",
                              border: "none",
                              outline: "none",
                            }}
                          >
                            <AiOutlineQuestionCircle />
                          </Button>
                        </OverlayTrigger>
                      </ButtonToolbar>
                    </div>
                    <Select
                      options={stateOptions}
                      placeholder="Select State"
                      className="react-select-container"
                      classNamePrefix="react-select"
                      value={formik.values.stateFormation.label}
                      onChange={(e) => {
                        formik.setValues({
                          ...formik.values,
                          stateFormation: e.value,
                        })
                        dispatch(addItem(e))
                        dispatch(addPrice())
                      }}
                      onBlur={formik.handleBlur}
                      name="stateFormation"
                      id="stateFormation"
                    />
                    {/* <span className="error-message">
                      {formik.errors.stateFormation}
                    </span> */}
                  </div>
                  <div className={styles.form3}>
                    <p className={styles.subtitle}>State Of Service *</p>
                    <Select
                      options={stateServiceOptions}
                      placeholder="Select State"
                      className="react-select-container"
                      classNamePrefix="react-select"
                      value={formik.values.stateService.label}
                      onChange={(e) => {
                        formik.setValues({
                          ...formik.values,
                          stateService: e.value,
                        })
                        dispatch(addItem(e))
                        dispatch(addPrice())
                      }}
                      onBlur={formik.handleBlur}
                      name="stateService"
                      id="stateService"
                    />
                    {/* <span className="error-message">
                      {formik.errors.stateService}
                    </span> */}
                  </div>
                  {/* <div className={styles.formCompanyName}>
                    <p className={styles.subtitle}>Company Name *</p>
                    <div className={styles.formInpWrapper}>
                      <input
                        placeholder="Company Name *"
                        className={styles.input}
                      />
                      <span className="error-message">
                        {formik.errors.companyName}
                      </span>
                    </div>
                  </div>
                  <div className={styles.form1}>
                    <p className={styles.subtitle}>Designator *</p>
                    <Select
                      options={stateServiceOptions}
                      placeholder="Select Designator"
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </div> */}
                </form>
              </div>
            </div>

            <div className={styles.companyaddress}>
              <h2 className={styles.title}>Company Address</h2>
              <div className={styles.formblock}>
                <form className={styles.form}>
                  <div className={styles.formInpWrapper}>
                    <p className={styles.subtitle}>Company Name *</p>
                    <input
                      placeholder="Company Name *"
                      name="companyName"
                      autoComplete="off"
                      type="text"
                      className={styles.input}
                      value={formik.values.companyName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span className="error-message">
                      {formik.errors.companyName}
                    </span>
                  </div>
                  <div className={styles.formInpWrapper}>
                    <p className={styles.subtitle}>Street Address *</p>
                    <input
                      placeholder="Street Address *"
                      name="streetAddress"
                      autoComplete="off"
                      type="text"
                      className={styles.input}
                      value={formik.values.streetAddress}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span className="error-message">
                      {formik.errors.streetAddress}
                    </span>
                  </div>
                  <div className={styles.formInpWrapper}>
                    <p className={styles.subtitle}>Address (Cont)</p>
                    <input
                      placeholder="Address (Cont)"
                      name="address"
                      autoComplete="off"
                      type="text"
                      className={styles.input}
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span className="error-message">
                      {formik.errors.address}
                    </span>
                  </div>
                  <div className={styles.formInpWrapper}>
                    <p className={styles.subtitle}>City *</p>
                    <span className="error-message">
                      <input
                        placeholder="City *"
                        name="city"
                        autoComplete="off"
                        type="text"
                        className={styles.input}
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.city}
                    </span>
                  </div>
                  <div className={styles.formInpWrapper}>
                    <p className={styles.subtitle}>Select State *</p>
                    <Select
                      options={companyAddressOptions}
                      placeholder="Select State"
                      className="react-select-container"
                      classNamePrefix="react-select"
                      value={formik.values.state}
                      onChange={(e) => {
                        formik.setValues({
                          ...formik.values,
                          state: e,
                        })
                      }}
                      onBlur={formik.handleBlur}
                      name="state"
                      id="state"
                    />
                  </div>
                  <div className={styles.formInpWrapper}>
                    <p className={styles.subtitle}>Zip Code *</p>
                    <input
                      placeholder="Zip Code *"
                      name="postal_code"
                      autoComplete="off"
                      type="text"
                      className={styles.inputzip}
                      value={formik.values.postal_code}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span className="error-message">
                      {formik.errors.postal_code}
                    </span>
                  </div>
                </form>
              </div>
            </div>

            <div className={styles.amendmentInfo}>
              <h2 className={styles.title}>Amendment Information</h2>
              <Form className={styles.form}>
                <p>Are you changing the name of the LLC / Corporation? *</p>
                <div className="ms-3 mb-3">
                  <Form.Check
                    inline
                    label="Yes"
                    name="checkbox"
                    type="radio"
                    value={formik.values.checkbox}
                    onChange={() =>
                      formik.setValues({ ...formik.values, checkbox: true })
                    }
                    id="inline-radio-1"
                    className="me-5"
                  />
                  <Form.Check
                    inline
                    label="No"
                    name="checkbox"
                    value={formik.values.checkbox}
                    onChange={() =>
                      formik.setValues({ ...formik.values, checkbox: false })
                    }
                    type="radio"
                    id="inline-radio-2"
                  />
                </div>
                {formik.values.checkbox && (
                  <>
                    <div className={styles.companyInfoWrapper}>
                      <div className={styles.formCompanyName}>
                        <p className={styles.subtitle}>New Company Name *</p>
                        <div className={styles.formInpWrapper}>
                          <input
                            placeholder="New Company Name *"
                            className={styles.input}
                            name="newCompany"
                            value={formik.values.newCompany}
                            onChange={(e) => {
                              formik.handleChange(e)
                              // dispatch(
                              //   addItem({
                              //     name: formik.values.newCompany,
                              //     values: formik.values.newCompany,
                              //     id: `${formik.values.newCompany}1`,
                              //     parentName: "New Company ",
                              //   })
                              // )
                            }}
                          />
                          <span className="error-message">
                            {formik.errors.companyName}
                          </span>
                        </div>
                      </div>
                      <div className={styles.formDesignator}>
                        <p className={styles.subtitle}>Designator *</p>
                        <Select
                          options={stateServiceOptions}
                          placeholder="Select Designator"
                          className="react-select-container"
                          classNamePrefix="react-select"
                          value={formik.values.newCompanyOption.label}
                          onChange={(e) => {
                            formik.setValues({
                              ...formik.values,
                              newCompanyOption: e.value,
                            })
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <p>
                        Please provide detailed information regarding the
                        information you would like to amend *
                      </p>
                      <textarea
                        placeholder="300 Characters Max"
                        name="newCompanyDetail"
                        value={formik.values.newCompanyDetail}
                        onChange={(e) => {
                          formik.handleChange(e)
                        }}
                      />
                    </div>
                  </>
                )}
                {!formik.values.checkbox && (
                  <>
                    <div>
                      <p>
                        Please provide detailed information regarding the
                        information you would like to amend *
                      </p>
                      <textarea
                        placeholder="300 Characters Max"
                        name="newCompanyDetail"
                        value={formik.values.newCompanyDetail}
                        onChange={(e) => {
                          formik.handleChange(e)
                        }}
                      />
                    </div>
                  </>
                )}
              </Form>
            </div>
            <div className={styles.detailCardWrapper}>
              <DetailCard title="State Filing Time">
                <div className={styles.detailCardDesciption}>
                  The typical state filing time for Kentucky is 30 Business
                  Days. In a hurry? Kentucky offers an expedited filing option
                  as well. Select the filing time that best meets your needs.
                </div>
                <div className={styles.tabBtnsWrapper}>
                  <div
                    className={styles.tabBtn}
                    role="button"
                    onClick={() =>
                      formik.setValues({
                        ...formik.values,
                        activeTab: 0,
                        agentCompanyName: "",
                      })
                    }
                    tabIndex={0}
                  >
                    <div>
                      <Form.Check
                        inline
                        name="checkbox"
                        type="radio"
                        checked={formik.values?.activeTab === 0 ? true : ""}
                      />
                    </div>
                    <div>
                      <h6>30 Business Days filing time.</h6>
                      <p>Estimated Completion Date:</p>
                      <p> Friday, May 05</p>
                      <h6>
                        Price: <b>$0</b>
                      </h6>
                    </div>
                  </div>
                  <div
                    className={styles.tabBtn}
                    role="button"
                    onClick={() =>
                      formik.setValues({
                        ...formik.values,
                        activeTab: 1,
                        agentFirstName: "",
                        agentLastName: "",
                      })
                    }
                    tabIndex={0}
                  >
                    <div>
                      <Form.Check
                        inline
                        name="checkbox"
                        type="radio"
                        checked={formik.values?.activeTab === 1 ? true : ""}
                      />
                    </div>
                    <div>
                      <h6>15 Business Days filing time.</h6>
                      <p>Estimated Completion Date: </p>
                      <p>
                        <b>
                          <span>Friday, April 14</span>
                        </b>
                      </p>
                      <h6>
                        Price: <b>$50</b>
                      </h6>
                    </div>
                    <div className={styles.fastTag}>FAST</div>
                  </div>
                </div>
                <div className={styles.detailCardDesciption}>
                  These dates are estimations based on current state turn around
                  times and are subject to change based on state processing.
                </div>
              </DetailCard>
            </div>
            <div className={styles.nextBtnWrapper}>
              <Button
                className={styles.btn}
                disabled={
                  !formik.values.companyName ||
                  !formik.values.entityType ||
                  !formik.values.stateFormation ||
                  !formik.values.stateService ||
                  !formik.values.state.label ||
                  !formik.values.firstName ||
                  !formik.values.lastName ||
                  !formik.values.address ||
                  !formik.values.postal_code ||
                  !formik.values.streetAddress
                }
                onClick={() => handleNextBtn()}
              >
                {company?.isLoading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  <>
                    Next
                    <BsArrowRightShort className={styles.icon} />
                  </>
                )}
              </Button>
            </div>
          </Col>
          <Col lg={4}>
            <div className={styles.orderSummary}>
              <div className={styles.orderTitle}>Order Summary</div>
              <div className={styles.orderPrice}>{totalPrice}$</div>
              <hr />
              {items?.map((e) => (
                <React.Fragment key={e?.name}>
                  <div className={styles.orderStat}>
                    <div className={styles.orderStatTitle}>
                      {e?.parentName} Fee
                    </div>
                    <div className={styles.orderStatValue}>{e?.price}$</div>
                  </div>
                  <hr />
                </React.Fragment>
              ))}
              <div className={styles.orderStat}>
                <div className={styles.orderStatTitle}>Total</div>
                <div className={styles.orderStatTotal}>{totalPrice}$</div>
              </div>
              <hr />
              <div className={styles.orderFaqsWrapper}>
                <div className={styles.orderFaqsImg}>
                  <img src={CheckCircle} alt="" />
                </div>
                <div className={styles.orderFaqs}>
                  <h6>Maintain business compliance</h6>
                  <p>
                    Trusted by over 800,000 business owners to maintain their
                    state's business compliance obligations.
                  </p>
                </div>
              </div>
              <div className={styles.orderFaqsWrapper}>
                <div className={styles.orderFaqsImg}>
                  <img src={Taxes} alt="" />
                </div>
                <div className={styles.orderFaqs}>
                  <h6>Tax savings benefit</h6>
                  <p>This is a fully deductible business expense</p>
                </div>
              </div>
              <div className={styles.orderFaqsWrapper}>
                <div className={styles.orderFaqsImg}>
                  <img src={Lock} alt="" />
                </div>
                <div className={styles.orderFaqs}>
                  <h6>Safe & Secure</h6>
                  <p>
                    Your information and data is safe and secure. Our servers
                    are located in secure data centers and our website uses SSL
                    modern encryption for all sensitive data. Our servers are
                    also backed up hourly ensuring your data is never lost.
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ArticlesOfAmendment
