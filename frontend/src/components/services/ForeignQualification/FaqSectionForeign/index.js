import React from "react"
import styles from "./faqSection.module.scss"
import Faqs from "../Faqs"

function FaqSectionForeign() {
  return (
    <div className={styles.faqSectionWrapper}>
      <div className={styles.faqsHeading}>
        <h2>Common Questions About Filing Your Foreign Qualification</h2>
      </div>
      <div className={styles.faqsAccordionWrapper}>
        <Faqs
          key={1}
          heading="When Should I File for My Certificate of Authority?"
        >
          <p>
            You must submit a registration in a state at least 20 days before
            conducting any business. This allows time for paperwork to be
            completed and the Certificate to be issued by state authorities.
          </p>
        </Faqs>
        <Faqs key={2} heading="What Do I Need To Provide in Order To File?">
          <p>
            Many states require a copy of your formation documents and a
            Certificate of Good Standing from your home (domestic) state where
            you incorporated. You’ll also be asked to pay fees required by each
            state you are seeking the right to conduct business. Keep in mind
            that once you “do business” in a state, you become responsible for
            meeting their requirements, such as the need to file annual
            information reports with the state.
          </p>
        </Faqs>
        <Faqs
          key={3}
          heading="How Much Does It Cost To File a Foreign Qualification?"
        >
          <p>
            The cost depends on the fee to obtain a Certificate of Good Standing
            and the filing fee that the inbound state assesses. Our service fee
            to prepare and file a Foreign Qualification is $149. To review the
            fee in your state click on the “order now” button and select the
            state and entity type.
          </p>
        </Faqs>
        <Faqs
          key={4}
          heading="How Long Does It Take To File a Foreign Qualification?"
        >
          <p>
            The filing time is dependent on the governing state agency and
            varies by state. Multiple steps are involved in filing, so your
            timely response to needed documentation is helpful. Most of the
            states will expedite the filing for an additional fee.
          </p>
        </Faqs>
      </div>
    </div>
  )
}

export default FaqSectionForeign
