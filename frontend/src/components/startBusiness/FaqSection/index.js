import React from "react"
import styles from "./faqSection.module.scss"
import Faqs from "../Faqs"

function FaqSection() {
  return (
    <div className={styles.faqSectionWrapper}>
      <div className={styles.faqsHeading}>
        <h2>Frequently Asked Questions</h2>
      </div>
      <div className={styles.faqsAccordionWrapper}>
        <Faqs
          key={1}
          heading="Does the price quoted include the state filing fee?"
        >
          <p>
            Yes, the price you see at the bottom of the page includes the
            prescribed state fee required to file the Articles of
            Incorporation/Organization.
          </p>
        </Faqs>
        <Faqs
          key={2}
          heading="Should I reserve my company name before placing an order?"
        >
          <p>
            Absolutely not. In most cases, we file the company within one day of
            receiving an order. Reserving the name can delay the filing. If you
            have already reserved the name, please contact us immediately upon
            placing an order to submit the filing with the name reservation
            attached to the articles of formation.
          </p>
        </Faqs>
        <Faqs
          key={3}
          heading="Will I have the option to act as my own Registered Agent?"
        >
          <p>
            Yes, you can act as your own Registered Agent. However, we offer the
            Registered Agent Service free of charge for the first year.
          </p>
        </Faqs>
        <Faqs key={4} heading="Will I need to sign anything?">
          <p>
            No, documents requiring signatures will be signed by our staff. We
            will sign as the incorporator for Corporations, and for LLCs, we
            will sign as the organizer.
          </p>
        </Faqs>
      </div>
    </div>
  )
}

export default FaqSection
