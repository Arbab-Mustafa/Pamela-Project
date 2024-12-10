import React from "react"
import styles from "./faqSection.module.scss"
import Faqs from "../Faqs"

function FaqSection() {
  return (
    <div className={styles.faqSectionWrapper}>
      <div className={styles.faqsHeading}>
        <h2>Common Questions About Filing an Annual Report</h2>
      </div>
      <div className={styles.faqsAccordionWrapper}>
        <Faqs key={1} heading="How Much Does It Cost to File an Annual Report?">
          <ul>
            <li>Our service fee to file an annual report is $99.</li>
            <li>
              The fee is the same whether you need to file an LLC annual report
              or an annual report for your corporation or nonprofit.
            </li>
            <li>
              The state fee will vary. To review the fee in your state, select
              your entity type and the entity state at the bottom of the page.
            </li>
          </ul>
        </Faqs>
        <Faqs key={2} heading="Are There Any Hidden Costs?">
          <p>
            No! We pride ourselves on transparency. There are absolutely no
            hidden costs associated with filing your annual report.
          </p>
        </Faqs>
        <Faqs key={3} heading="Are There Specific Rules for My State?">
          <p>
            Yes. Some states proceed to immediate dissolution if your annual
            report is not filed by the deadline. This means that your company
            will no longer be registered with the state and the legal and tax
            benefits of being incorporated will no longer be available to you.
            States that do this are Florida, Wyoming, Georgia and Virginia.
            <br />
            Other states have 20-90 day grace periods.
          </p>
        </Faqs>
        <Faqs key={4} heading="How Long Does It Take to File an Annual Report?">
          <p>
            Business filing deadlines are dependent on the governing state
            agency and filing times vary by state. It’s important that your
            business’s annual report is filed well in advance of the due date in
            order to avoid any potential late filing fees.
          </p>
        </Faqs>
        <Faqs
          key={5}
          heading="What Happens if the Annual Report Cannot Be Filed?"
        >
          <p>
            If your entity has been administratively revoked, otherwise
            dissolved or the report is not due within a close proximity to you
            placing your order, our policy is to contact and inform you then
            issue a full refund.
            <br />
            <br />
            If your company has been dissolved for any reason, we can assist
            with reinstatement and then proceed to file the Annual Report.
          </p>
        </Faqs>
      </div>
    </div>
  )
}

export default FaqSection
