import React from "react"
import styles from "./faqSection.module.scss"
import Faqs from "../Faqs"

function FaqSection() {
  return (
    <div className={styles.faqSectionWrapper}>
      <div className={styles.faqsHeading}>
        <h2>Common Questions About Business Reinstatement</h2>
      </div>
      <div className={styles.faqsAccordionWrapper}>
        <Faqs key={1} heading="When is reinstatement required?">
          <p>
            If your business has lost its good standing with the state and been
            dissolved, you need to file for reinstatement if you’d like to keep
            doing business. If you do the process correctly and meet all
            necessary requirements, your business will be reinstated and you’ll
            get back all the advantages that come with being an official, legal
            entity.
          </p>
        </Faqs>
        <Faqs key={2} heading="How much does it cost to reinstate a business?">
          <p>
            The cost to reinstate a business depends on which state you’re in.
            For example, in Texas, the filing fee for reinstatement after
            involuntary dissolution is $75, and the filing fee for reinstatement
            following a voluntary dissolution is $15. In Massachusetts, the fee
            for filing a reinstatement application is $100. Check with your
            Secretary of State to learn what your fee will be. You will need to
            pay these filing fees on top of any past-due taxes, penalties, fees
            and/or interest to get back into good standing.
          </p>
        </Faqs>
        <Faqs
          key={3}
          heading="How do I reinstate a business back to good standing?"
        >
          <p>
            To keep your small business in good standing, you typically need to
            be up-to-date on fees, file annual or biennial reports with the
            Secretary of State, keep your business records up to date by filing
            Articles of Amendment after major events and pay any other necessary
            business fees or franchise taxes to state regulators every year.
            However, that doesn’t always happen. Things can sometimes slip
            through the cracks, and if your business fails to complete these
            tasks, it can lose its good standing. Then, your state can file to
            dissolve your business and completely revoke its LLC status. It’s
            not an ideal situation, but your business isn’t gone forever if this
            happens. Filing a reinstatement order helps restore your business
            back to good standing.
          </p>
        </Faqs>
        <Faqs key={4} heading="How long does it take to reinstate a company?">
          <p>
            How long it takes to reinstate your company depends on which state
            you live in. The Minnesota Secretary of State claims that most
            business filings are returned within 3-5 days. Nebraska asks that
            business owners wait about a week for their reinstatements to be
            processed. Some states, like Nevada, allow business owners to pay
            extra for an expedited filing. Check with your Secretary of State to
            determine how long filing for reinstatement typically takes.
          </p>
        </Faqs>
        <Faqs key={5} heading="What does “restored to good standing” mean?">
          <p>
            Being in good standing means that your business is up-to-date on
            filing your annual report, biennial report, other required forms,
            compliance paperwork and any other requirements from your company’s
            home state. To get an official Certificate of Good Standing, you’ll
            need to file the appropriate form with your state, or you can have
            Filthy Rich Idea file for you. The Certificate of Good Standing helps you
            prove that your business exists and complies with the rules. It
            helps you appear trustworthy and credible to potential partners,
            investors and lenders.
          </p>
        </Faqs>
      </div>
    </div>
  )
}

export default FaqSection
