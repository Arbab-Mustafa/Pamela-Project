import React, { useState } from "react"
import { Form } from "react-bootstrap"
import DetailCard from "../../common/DetailCard"
import styles from "./styles.module.scss"

const ProfitStepTwo = ({ formik }) => {
  const [activeTab, setActiveTab] = useState()
  return (
    <div className={styles.stepWrapper}>
      <DetailCard title="Should your Nonprofit Corporation have members?">
        <p className={styles.detailCardDesciption}>
          The long term management of a nonprofit corporation is handled by a
          board of directors, however the nonprofit corporation may elect to
          have a formal membership structure in which the members will be
          granted basic rights to participate in the affairs and future of the
          nonprofit corporation.
          <br />
          Most smaller nonprofits elect not to have a formal membership
          structure, and thus avoid documenting and maintaining membership
          rolls, as well as avoiding the time and expense of having the members
          vote on directors and other major corporate decisions.
          <br />
          The term "members", in this sense of the word, has a specific meaning.
          If the nonprofit will not have members, it will still have directors
          and officers handling the long and short term management of the
          corporation, respectively.
        </p>
        <div className={styles.tabBtnsWrapper}>
          <div
            className={styles.tabBtn}
            role="button"
            onClick={() =>
              formik.setValues({
                ...formik.values,
                nonProfitMember: "96% selection rate",
              })
            }
            tabIndex={0}
          >
            <div>
              <Form.Check
                inline
                name="nonProfitMember"
                type="radio"
                checked={
                  formik.values?.nonProfitMember === "96% selection rate"
                    ? "checked"
                    : ""
                }
              />
            </div>
            <div>
              <p>
                <b>96% selection rate</b> <br /> The nonprofit WILL NOT have
                members
              </p>
            </div>
          </div>
          <div
            className={styles.tabBtn}
            role="button"
            onClick={() =>
              formik.setValues({
                ...formik.values,
                nonProfitMember: "The nonprofit WILL have members",
              })
            }
            tabIndex={0}
          >
            <div>
              <Form.Check
                inline
                name="nonProfitMember"
                type="radio"
                checked={
                  formik.values?.nonProfitMember ===
                  "The nonprofit WILL have members"
                    ? "checked"
                    : ""
                }
              />
            </div>
            <div>
              <p>The nonprofit WILL have members</p>
            </div>
          </div>
        </div>
      </DetailCard>
      <DetailCard title="General purpose of the Nonprofit: (Choose one)*">
        <div className={styles.tabBtnsWrapper}>
          <div
            className={styles.tabBtn}
            role="button"
            onClick={() =>
              formik.setValues({
                ...formik.values,
                generalPurposeNonProfit: "96% selection rate",
              })
            }
            tabIndex={0}
          >
            <div>
              <Form.Check
                inline
                name="generalPurposeNonProfit"
                type="radio"
                checked={
                  formik.values?.generalPurposeNonProfit ===
                  "96% selection rate"
                    ? "checked"
                    : ""
                }
              />
            </div>
            <div>
              <p>
                <b>96% selection rate</b> <br /> The nonprofit WILL NOT have
                members
              </p>
            </div>
          </div>
          <div
            className={styles.tabBtn}
            role="button"
            onClick={() =>
              formik.setValues({
                ...formik.values,
                generalPurposeNonProfit: "4% selection rate",
              })
            }
            tabIndex={0}
          >
            <div>
              <Form.Check
                inline
                name="generalPurposeNonProfit"
                type="radio"
                checked={
                  formik.values?.generalPurposeNonProfit === "4% selection rate"
                    ? "checked"
                    : ""
                }
              />
            </div>
            <div>
              <p>
                <b>4% selection rate</b> <br /> Religious Corporation
              </p>
            </div>
          </div>
        </div>
      </DetailCard>
    </div>
  )
}

export default ProfitStepTwo
