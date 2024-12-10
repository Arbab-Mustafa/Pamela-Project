import React from "react"
import styles from "./faqSection.module.scss"
import Faqs from "../Faqs"

function FaqSection() {
  return (
    <div className={styles.faqSectionWrapper}>
      <div className={styles.faqsHeading}>
        <h2>Common questions about obtaining an EIN / Tax ID Number</h2>
      </div>
      <div className={styles.faqsAccordionWrapper}>
        <Faqs
          key={1}
          heading="Will I need an EIN in order to obtain a business account with a bank??"
        >
          <p>
            Yes, under most circumstances business entities other than DBA's
            must present an EIN along with the filed Articles of Organization or
            Incorporation in order for an account to be opened.
          </p>
        </Faqs>
        <Faqs key={2} heading="What circumstances require me to change my EIN?">
          <p>
            If you already have an EIN, and the organization or ownership of
            your business changes, you may need to apply for a new number. Some
            of the circumstances under which a new number is required are as
            follows:
          </p>
          <ul>
            <li>
              An existing business is purchased or inherited by an individual
              who will operate it as a sole proprietorship.
            </li>
            <li>
              A sole proprietorship changes to an LLC, corporation, or
              partnership.
            </li>
            <li>
              A partnership changes to an LLC, corporation, or sole
              proprietorship.
            </li>
            <li>
              A corporation changes to an LLC, partnership, or sole
              proprietorship.
            </li>
            <li>
              An LLC changes to a corporation, partnership, or sole
              proprietorship.
            </li>
            <li>
              An individual owner dies, and the estate takes over the business.
            </li>
          </ul>
        </Faqs>
        <Faqs
          key={3}
          heading="When will I receive my Federal Employer Identification Number?"
        >
          <p>
            If it is a stand alone order for an existing entity we can obtain
            and email the EIN within 1 business day.
          </p>
        </Faqs>
        <Faqs key={4} heading="What is the SS4/EIN/Tax ID Number?">
          <p>
            The SS4 is the IRS form required to obtain an EIN (Employer
            Identification Number, frequently called a Tax ID number). The
            EIN/Tax ID number can be thought of as a Social Security Number for
            your business. It is usually required to open a bank account in the
            name of the business and to properly pay and account for any
            wage/payroll employees of your company.
          </p>
        </Faqs>
      </div>
    </div>
  )
}

export default FaqSection
