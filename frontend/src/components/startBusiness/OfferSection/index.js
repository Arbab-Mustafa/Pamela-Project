import React, { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import OfferCard from "../OfferCard/OfferCard"
import tick from "../../../images/services/amendment/need/tick.svg"
import {
  cCoperation,
  llcBusiness,
  nonProfitBusiness,
  sCoperation,
} from "../../../utils/helpers"

const OfferSection = ({ formik, statePrice }) => {
  const [card, setCard] = useState([])

  useEffect(() => {
    if (formik.values.entityType.value === "S-Corporation") {
      return setCard(sCoperation)
    }
    if (formik.values.entityType.value === "C-Corporation") {
      setCard(cCoperation)
    }
    if (
      formik.values.entityType.value.toLowerCase() === "NonProfit".toLowerCase()
    ) {
      setCard(nonProfitBusiness)
    }
    if (formik.values.entityType.value === "LLC") {
      setCard(llcBusiness)
    }
  }, [formik.values.entityType.value])
  if (card.length === 0) {
    return <>loading..</>
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center justify-content-xl-between g-4">
        <Col md={6} xl={4}>
          <OfferCard
            type="professional"
            formik={formik}
            card={card?.professional}
            statePrice={statePrice}
            price={399}
          />
        </Col>
        <Col md={6} xl={4}>
          <OfferCard
            type="premium"
            formik={formik}
            card={card?.Premium}
            statePrice={statePrice}
            price={185}
          />
        </Col>
        <Col md={6} xl={4}>
          <OfferCard
            type="essential"
            formik={formik}
            card={card?.essential}
            price={0}
            statePrice={statePrice}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default OfferSection
