import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Form } from "react-bootstrap"
import DetailCard from "../common/DetailCard"
import styles from "./stepSeven.module.scss"
import tickIcon from "../../../images/services/amendment/need/tick.svg"
import CardInfo from "../common/CardInfo"
import { addItem, removeFromCart } from "../../../_features/cartSlice"

const StepSeven = ({ formik }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      addItem({
        value: "Business Strategy / Free Consultation",
        id: "123123123123121312321",
        label: "Business Strategy / Free Consultation",
        parentName: "Business Strategy / Free Consultation",
      })
    )
  }, [])
  const learnData = [
    {
      title: "How your LLC is taxed",
    },
    {
      title: "How to choose the proper IRS tax election",
    },
    {
      title: "Commonly missed tax deductions",
    },
    {
      title: "Business bookkeeping requirement",
    },
    {
      title: "How to reduce the chance of an IRS audit",
    },
    {
      title: "How to reduce self employment taxes",
    },
  ]

  return (
    <div className={styles.stepWrapper}>
      <DetailCard title="Business Strategy / Free Consultation">
        <p className={styles.detailCardDesciption}>
          This consultation can help you identify important business strategies
          and provide insight into the structuring of your new business. The
          offer is completely free of charge and does not obligate you in any
          way.
        </p>
        <h6 className={`mt-5 mb-4 ${styles.detailCardTitle}`}>
          We’ll quickly go over how to create, launch, and market your business.
        </h6>
        {/* {learnData &&
          learnData.map((item) => (
            <div className={styles.subTitleList}>
              <div className={styles.listIcon}>
                <img src={tickIcon} alt="tick" />
              </div>
              <div className={styles.listText}>{item.title}</div>
            </div>
          ))} */}
        <div className={styles.tabBtnsWrapper}>
          <div
            className={styles.tabBtn}
            role="button"
            onClick={() => {
              formik.setValues({ ...formik.values, taxConsultation: false })
              dispatch(
                removeFromCart({
                  value: "Business Strategy / Free Consultation",
                  id: "123123123123121312321",
                  label: "Business Strategy / Free Consultation",
                  parentName: "Business Strategy / Free Consultation",
                })
              )
            }}
            tabIndex={0}
          >
            <div>
              <Form.Check
                inline
                name="taxConsultation"
                type="radio"
                checked={
                  formik.values?.taxConsultation === false ? true : false
                }
              />
            </div>
            <div>
              <p>I'm not interested at this time.</p>
            </div>
          </div>
          <div
            className={styles.tabBtn}
            role="button"
            onClick={() => {
              formik.setValues({ ...formik.values, taxConsultation: true })
              dispatch(
                addItem({
                  value: "Business Strategy / Free Consultation",
                  id: "123123123123121312321",
                  label: "Business Strategy / Free Consultation",
                  parentName: "Business Strategy / Free Consultation",
                })
              )
            }}
            tabIndex={0}
          >
            <div>
              <Form.Check
                inline
                name="taxConsultation"
                type="radio"
                checked={formik.values?.taxConsultation === true ? true : false}
              />
            </div>
            <div>
              <p>
                Yes, I would like to receive the FREE Business Strategy
                Consultation.
              </p>
            </div>
          </div>
        </div>
        {formik.values?.taxConsultation === false ? (
          <CardInfo title="Is a  something I should consider?">
            Incorporating a new business can burden owners with complicated tax
            filing. As a client you are entitled to receive a free no obligation
            consultation with a certified tax professional who can answer
            questions regarding the tax obligations of your company.
          </CardInfo>
        ) : formik.values?.taxConsultation === true ? (
          <CardInfo title="How soon can I schedule my Business Strategy Consultation?">
            You will be prompted to schedule your appointment after completing
            your order.
          </CardInfo>
        ) : (
          ""
        )}
      </DetailCard>
    </div>
  )
}

export default StepSeven
