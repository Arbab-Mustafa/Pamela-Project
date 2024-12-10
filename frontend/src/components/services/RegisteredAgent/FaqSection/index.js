import React from "react"
import styles from "./faqSection.module.scss"
import Faqs from "../Faqs"

function FaqSection() {
  return (
    <div className={styles.faqSectionWrapper}>
      <div className={styles.faqsHeading}>
        <h2>Common Questions About Registered Agent Services</h2>
      </div>
      <div className={styles.faqsAccordionWrapper}>
        <Faqs key={1} heading="What is a Registered Agent?">
          <p>
            A Registered Agent (also sometimes known as statutory agent or
            resident agent) is an individual, or a business who is chosen to be
            the official recipient of important legal documents and
            correspondence for corporations and LLC’s.
          </p>
        </Faqs>
        <Faqs key={2} heading="Why Do I Need a Registered Agent?">
          <p>
            You need a Registered Agent to ensure that your business receives
            time sensitive and essential information. Registered Agent’s receive
            and forward important legal and tax related correspondence on behalf
            of your corporation or LLC.
          </p>
        </Faqs>
        <Faqs key={3} heading="How Do I Change My Registered Agent?">
          <p>
            Changing your Registered Agent is a simple process and we can take
            care of the transfer of Registered Agent service from your current
            provider to us or another Registered Agent, at any time.
          </p>
        </Faqs>
        <Faqs key={4} heading="What Is Service of Process?">
          <p>
            Service of process is how the parties in a lawsuit formally deliver
            papers (such as complaint, answer, and motion papers) to other
            parties and the court.
          </p>
        </Faqs>
      </div>
    </div>
  )
}

export default FaqSection
