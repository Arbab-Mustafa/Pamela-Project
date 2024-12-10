import React from "react"
import styles from "./faqSection.module.scss"
import Faqs from "../Faqs"

function FaqSection() {
  return (
    <div className={styles.faqSectionWrapper}>
      <div className={styles.faqsHeading}>
        <h2>Foreign Qualification Basics</h2>
      </div>
      <div className={styles.faqsAccordionWrapper}>
        <Faqs key={1} heading="What Is a ”Foreign Qualification”?">
          <p>
            A Foreign Qualification refers to the process by which you register
            your company to do business in another state. An LLC or corporation
            is considered "domestic" in the state in which is was formed, and
            “foreign” in any other state in which it wants to do business. When
            you file a Foreign Qualification, you get a Certificate of
            Authority, which gives you legitimate rights to do business in the
            state. A Foreign Qualification must be completed in each state in
            which a corporation or LLC intends to conduct business.
          </p>
        </Faqs>
        <Faqs key={2} heading="How Businesses Are Classified as Foreign?">
          <p>
            What does it mean to “do business” in a state? Let’s discuss the
            activities that determine you are conducting business in another
            state. Essentially, if your actions go beyond minor transactions in
            a state, such as making management decisions, you will likely be
            seen as a “foreign” entity that needs to register. However, there
            are some simple rules that help weed out the minor from the major
            “doing business” stature.
          </p>
          <ul>
            <li>
              First, the company would have a physical presence in the state.
              This refers to the existence of an office, store or warehouse that
              services or solicits residents of that state in any form. It could
              also refer to having employees or even bank accounts in a state
            </li>
            <li>
              Second, if your company has to pay state taxes in a particular
              locale, they are going to be tagged as “doing business” in a
              state. Taxes are assessed when a company sells directly from a
              state or upholds a significant number of contracts in a state.
            </li>
          </ul>
          <p>
            If your business fits any of these criteria, you could benefit from
            filing a Foreign Qualification with us.
          </p>
        </Faqs>
        <Faqs key={3} heading="What Is a Certificate of Authority?">
          <p>
            A Certificate of Authority is an official document that gives you
            permission to operate your business in a state other than the one in
            which your corporation was formed. If a company neglects to file a
            Foreign Qualification and receive a Certificate of Authority, then
            it does not have legal standing or authority to transact business
            within that state. Every state has different rules regarding what
            constitutes transacting business. Not following the rules could
            affect your business's Certificate of Good Standing which you need
            to get a business loan, renew your business license or file your
            business taxes. It can be cumbersome and time consuming to file a
            Certificate of Authority in every state in which you want to do
            business, which is why Filthy Rich Idea has simplified the process. Simply
            complete our online Foreign Qualification form, and we’ll do the
            paperwork for you.
          </p>
        </Faqs>
        <Faqs
          key={4}
          heading="How Does the Foreign Qualification Process Work?"
        >
          <p>
            Every process has paperwork and proper steps to follow. To give you
            an understanding of what we’ll be doing on your behalf, let’s review
            the process below:
          </p>
          <ul>
            <li>
              Name Search: Your corporation’s name will be compared to the
              database in each state to ensure no other company is using it.
              Hopefully, there will be no contradiction, but if there is then
              you’ll be asked to operate under a fictitious or assumed name. If
              you'd like to conduct your own name search for your LLC, we've
              created How to Search & Choose Your Business Entity Name in all 50
              States.
            </li>
            <li>
              Registered Agent: You will need to select a registered agent in
              that state.
            </li>
            <li>
              Certificate of Authority: Finally, you register for the right to
              do business in the state. This is similar to the process of
              incorporation and requires some paperwork and fees be submitted.
            </li>
          </ul>
        </Faqs>
      </div>
    </div>
  )
}

export default FaqSection
