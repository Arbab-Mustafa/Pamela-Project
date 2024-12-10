import React from "react"
import styles from "./faqSection.module.scss"
import Faqs from "../Faqs"

function FaqSection() {
  return (
    <div className={styles.faqSectionWrapper}>
      <div className={styles.faqsHeading}>
        <h2>Common Questions About Obtaining a Certificate of Good Standing</h2>
      </div>
      <div className={styles.faqsAccordionWrapper}>
        <Faqs
          key={1}
          heading="How Much Does a Certificate of Good Standing Cost?"
        >
          <p>
            Whether you need a Certificate of Good Standing for your LLC,
            Corporation or Nonprofit, the cost is $49 + the fees required by
            your state. State fees vary from $0 to $60.
          </p>
        </Faqs>
        <Faqs key={2} heading="Are There Any Hidden Costs?">
          <p>
            No! We pride ourselves on transparency. There are absolutely no
            hidden costs associated with you obtaining a Certificate of Good
            Standing.
          </p>
        </Faqs>
        <Faqs
          key={3}
          heading="How Long Does a Certificate of Good Standing Take?"
        >
          <p>
            How long it takes to get a Certificate of Good Standing depends on a
            number of variables, but you should expect it to take anywhere from
            several days to several weeks.
            <br />
            <br />
            The filing time depends on the governing state agency and varies by
            sta
          </p>
        </Faqs>
        <Faqs key={4} heading="Why Do I Need a Certificate of Good Standing?">
          <p>
            A Certificate of Good Standing is typically needed in the normal
            course of business by another organization (business partner, bank,
            lender, investor or regulatory authority) to prove that your
            business entity is legally registered with the state and is in good
            standing. The Certificate of Good Standing proves that you have paid
            any necessary fees and filed required paperwork to keep your
            business chartered, registered and in compliance with your state
            authorities.
          </p>
        </Faqs>
      </div>
    </div>
  )
}

export default FaqSection
