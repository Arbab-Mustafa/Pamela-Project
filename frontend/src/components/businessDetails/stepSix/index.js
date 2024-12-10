import React from "react"
import { Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { addItem, removeFromCart } from "../../../_features/cartSlice"
import DetailCard from "../common/DetailCard"
import styles from "./stepSix.module.scss"

const StepSix = ({ formik }) => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    if (formik.values?.businessBanking === 0) {
      dispatch(
        addItem({
          value: "Business Banking",
          id: "12312312312312",
          label: "Business Banking",
          parentName: "Business Banking",
        })
      )
    }
  }, [formik.values])

  return (
    <div className={styles.stepWrapper}>
      <DetailCard title="Setting up Small Business Banking">
        <h6 className={styles.detailCardTitle}>
          Open your new business account online, over the phone, or at a
          financial center near you.
        </h6>
        <p className={styles.detailCardDesciption}>
          A business bank account is an essential tool for any business owner.
          It is an effective way to manage finances, separate business and
          personal finances, maintain accurate records, and protect the business
          from fraud or theft. It also allows businesses to make and receive
          payments, access credit, and manage cash flow more easily.
        </p>
        <br />
        <p className={styles.detailCardDesciption}>
          Let Filthy Rich Idea start you on the right path with a business
          account from Bank of America, which can give you access to specialized
          services like business loans, merchant accounts, and financial advice.
        </p>
        <p className={styles.detailCardDesciption}>
          <b>
            {" "}
            Business Advantage Banking is a business checking account with 2
            settings.
          </b>
        </p>
        <p className={styles.detailCardDesciption}>
          <b> If your business needs change, switch anytime.</b>
        </p>

        <div className={styles.accountDetails}>
          <p>
            <b> Earn an additional $300</b> statement credit when you are
            approved for and open an eligible Bank of America small business
            credit card and make at least $3,000 in new Net Purchases within 90
            days of card account opening.
          </p>
          {/* <p>
            <b>Earn $100</b> when you open a new eligible Bank of America small
            business checking account with a specialist and make Qualifying
            Deposits of $1,000 or more within the first 30 days of new account
            opening
            <br />
            <br />
            <b>OR</b>
            <br />
            <br />
            <b>Earn $200</b> when you open a new eligible Bank of America small
            business checking account with a specialist and make qualifying
            deposits of $3,000 or more within the first 30 days of new account
            opening.*
            <br />
            <br />
            <b>Earn an additional $300</b> statement credit when you are
            approved for and open an eligible Bank of America small business
            credit card and make at least $3,000 in new Net Purchases within 90
            days of card account opening.
          </p> */}
        </div>
        <div className={styles.bankAccountCheck}>
          <div
            className={`${
              formik.values?.businessBanking === 0 ? "active" : ""
            } checkWrapper`}
          >
            <Form.Check
              inline
              label="Yes. I want to apply online when my business formation documents are ready."
              name="businessBanking"
              type="radio"
              checked={formik.values?.businessBanking === 0 ? true : false}
              onClick={() => {
                formik.setValues({ ...formik.values, businessBanking: 0 })
                dispatch(
                  addItem({
                    value: "Business Banking",
                    id: "12312312312312",
                    label: "Business Banking",
                    parentName: "Business Banking",
                  })
                )
              }}
            />
          </div>
          <div
            className={`${
              formik.values?.businessBanking === 1 ? "active" : ""
            } checkWrapper`}
          >
            <Form.Check
              inline
              label="Yes. Have a Bank of America Small Business Specialist call me."
              name="businessBanking"
              type="radio"
              checked={formik.values?.businessBanking === 1 ? true : false}
              onClick={() => {
                formik.setValues({ ...formik.values, businessBanking: 1 })
                dispatch(
                  addItem({
                    value: "Business Banking",
                    id: "12312312312312",
                    label: "Business Banking",
                    parentName: "Business Banking",
                  })
                )
              }}
            />
          </div>
          <div
            className={`${
              formik.values?.businessBanking === 2 ? "active" : ""
            } checkWrapper`}
          >
            <Form.Check
              inline
              label="No, I do not need a business account at this time.
              "
              name="businessBanking"
              type="radio"
              checked={formik.values?.businessBanking === 2 ? true : false}
              onClick={() => {
                formik.setValues({ ...formik.values, businessBanking: 2 })
                dispatch(
                  removeFromCart({
                    value: "Business Banking",
                    id: "12312312312312",
                    label: "Business Banking",
                    parentName: "Business Banking",
                  })
                )
              }}
            />
          </div>
        </div>
        <h6 className={styles.detailCardTitle}>
          In order to set up a small business bank account, the owner of the
          business must possess a valid physical address within the United
          States
        </h6>
        <p className={styles.detailCardDesciption}>
          <br />
          By selecting <b>"Yes"</b>, you give Bank of America permission to
          contact you at the contact information you provided in order to
          discuss products and services that may be of interest to you. You
          understand that you are not obligated to provide this information or
          to purchase any Bank of America products or services. Additionally,
          you agree to share the details of your business with Bank of America,
          including your articles of formation and/or Employer Identification
          Number, which are necessary to open a new account.
          <br />
          <br />
          <br />
          Bank of America, N.A. Member FDIC. © 2023 Bank of America Corporation.
        </p>
      </DetailCard>
    </div>
  )
}

export default StepSix
