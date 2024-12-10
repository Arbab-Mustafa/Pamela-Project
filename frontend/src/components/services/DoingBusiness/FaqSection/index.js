import React from "react"
import styles from "./faqSection.module.scss"
import Faqs from "../Faqs"

function FaqSection() {
  return (
    <div className={styles.faqSectionWrapper}>
      <div className={styles.faqsHeading}>
        <h2>Common Questions About Filing a DBA</h2>
      </div>
      <div className={styles.faqsAccordionWrapper}>
        <Faqs key={1} heading="How Much Does a DBA Cost?">
          <p>
            It typically costs $25-$100 to file a DBA. This depends on your
            state — for example, it costs $15-$25 in Texas and $55-$65 in
            Florida. You can find this information online when you go to file or
            by using the state search feature above.
          </p>
        </Faqs>
        <Faqs key={2} heading="Can a DBA Become an LLC?">
          <p>
            If you got a DBA as a sole proprietor, you can convert to an LLC to
            enjoy more legal protections. You’ll first need to make sure your
            DBA can be used for your LLC name, as it may already be in use by a
            legally registered business.
          </p>
        </Faqs>
        <Faqs key={3} heading="Can I Have Multiple DBAs Under One LLC?">
          <p>
            Yes — this is the beauty of DBAs! If you have multiple locations or
            branches of your business that all operate under the same LLC, you
            can file multiple DBAs to help distinguish them.
          </p>
        </Faqs>
        <Faqs key={4} heading="Can Two Businesses Have the Same DBA?">
          <p>
            Typically, states won’t allow two businesses to have the same DBA —
            even if you own them both. Your DBA application may be denied to
            avoid confusion, especially if they’re in the same industry.
            However, your DBA could be used if you haven’t registered your
            business as a legal entity.
          </p>
        </Faqs>
        <Faqs key={4} heading="Do I Need an EIN for a DBA?">
          <p>
            Since a DBA acts as a nickname, you won’t need a separate EIN for
            it. You do, however, need an EIN for your registered business entity
            for tax purposes.
          </p>
        </Faqs>
      </div>
    </div>
  )
}

export default FaqSection
