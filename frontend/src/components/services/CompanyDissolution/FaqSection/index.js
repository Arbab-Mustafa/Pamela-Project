import React from "react"
import styles from "./faqSection.module.scss"
import Faqs from "../Faqs"

function FaqSection() {
  return (
    <div className={styles.faqSectionWrapper}>
      <div className={styles.faqsHeading}>
        <h2>Common questions on filing Dissolution</h2>
      </div>
      <div className={styles.faqsAccordionWrapper}>
        <Faqs key={1} heading="What are Articles of Dissolution exactly?">
          <p>
            The articles formalize the cessation of activity as an incorporated
            entity. They define parameters surrounding the dissolution of a
            company. This could include the distribution or sale of assets, how
            shareholders will be compensated and responsibilities divided among
            management.
          </p>
        </Faqs>
        <Faqs
          key={2}
          heading="How much will it cost to file Articles of Dissolution?"
        >
          <p>
            The state fee varies by state our service fee to file Articles of
            Dissolution is $149. To review the fee in your state click on the
            “order now” button and select the state and entity type.
          </p>
        </Faqs>
        <Faqs
          key={3}
          heading="What contingencies would prohibit me from filing a dissolution?"
        >
          <p>
            The only stipulation that would prohibit the owners of an entity
            from filing a dissolution is if the company owes outstanding taxes
            or has annual reports outstanding. In this event the company would
            need to bring the itself to good standing with the state before
            filing the dissolution.
          </p>
        </Faqs>
        <Faqs
          key={4}
          heading="How long will it take to have the Articles of Dissolution filed?"
        >
          <p>
            The filing time is dependent on the governing state agency and
            varies by state.
          </p>
        </Faqs>
        <Faqs
          key={5}
          heading="What will I receive when the Articles of Dissolution are filed?"
        >
          <p>
            The governing state agency will return a copy of the filed articles
            which are then mailed to the client.
          </p>
        </Faqs>
      </div>
    </div>
  )
}

export default FaqSection
