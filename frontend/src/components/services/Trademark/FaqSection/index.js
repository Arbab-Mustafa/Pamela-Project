import React from "react"
import styles from "./faqSection.module.scss"
import Faqs from "../Faqs"

function FaqSection() {
  return (
    <div className={styles.faqSectionWrapper}>
      <div className={styles.faqsHeading}>
        <h2>Common questions about Registering a Trademark</h2>
      </div>
      <div className={styles.faqsAccordionWrapper}>
        <Faqs key={1} heading="How broad is my trademark protection?">
          <p>
            This includes filing the trademark in one series and one class.
            Additional legal fees and filing fees will apply if you decide to
            file a trademark in more than one class.
          </p>
        </Faqs>
        <Faqs key={2} heading="Can I cancel my order?">
          <p>
            You will be contacted within 5 business days by our agents. You can
            request a refund before this contact, or before substantive work on
            your application has begun, whichever is later.
          </p>
        </Faqs>
        <Faqs
          key={3}
          heading="How long will it take for my trademark to be filed?"
        >
          <p>
            The preparation and filing of a Trademark Application take anywhere
            from 3-7 days once all information, logos, and specimens are
            received by our agents and you sign off on the application. In some
            instances, the process may take longer given the complexity of the
            mark.
          </p>
        </Faqs>
        <Faqs
          key={4}
          heading="What level of support can I expect through this process?"
        >
          <p>
            Once you have submitted your business name or logo, an attorney will
            conduct the initial search and discuss the results via email or
            phone. The attorney will then prepare the filing application and
            submit to the United States Patent and Trademark Office. You will be
            able to track the approval status and contact us with any questions
            you may have while awaiting for the approval.
          </p>
        </Faqs>
        <Faqs key={5} heading="How long will the Trademark process take?">
          <p>
            The Trademark approval times can vary based on a variety of factors.
            The USPTO is likely to repond in 3 - 4 months from the filing of the
            application. Despite the delayed approval time, you will be able to
            monitor the status of the trademark online as it's going through the
            approval process.
          </p>
        </Faqs>
      </div>
    </div>
  )
}

export default FaqSection
