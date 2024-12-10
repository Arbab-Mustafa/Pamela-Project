import React, { useEffect } from "react"
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import RegisteredServiceForm from "../../components/services/RegisteredAgent/ServiceForm"
import VirtualAddressServiceForm from "../../components/services/VirtualAddress/ServiceForm"
import GoodServiceForm from "../../components/services/CertificateOfGood/ServiceForm"
import DBAServiceForm from "../../components/services/DoingBusiness/ServiceForm"
import EINServiceForm from "../../components/services/EmployerIdentification/ServiceForm"
import ForeignQualificationForm from "../../components/services/ForeignQualification/ServiceForm"
import ChangeRegisterAgentForm from "../../components/services/ChangeRegisteredAgent/ServiceForm"
import BusinessLicenseForm from "../../components/services/BusinessLicense/ServiceForm"
import AmendmentForm from "../../components/services/Amendment/ServiceForm"
import CompanyDissolutionForm from "../../components/services/CompanyDissolution/ServiceForm"
import TrademarkForm from "../../components/services/Trademark/ServiceForm"
import ReinstatementForm from "../../components/services/Reinstatement/ServiceForm"
import AnnualReportForm from "../../components/services/AnnualReport/ServiceForm"

import { addItem, addPrice, resetCart } from "../../_features/cartSlice"
import { selectService, removeService } from "../../_features/commonSlice"

function ArticleOfAmendmentPage() {
  const param = useParams().id
  const dispatch = useDispatch()
  useEffect(() => {
    localStorage.removeItem("orders")
    localStorage.removeItem("price")
    dispatch(resetCart())
    dispatch(selectService(param))
  }, [dispatch, param])
  const selectedService = useSelector((state) => state.common.selectedService)

  useEffect(() => {
    if (selectedService.title === "Registered Agent") {
      dispatch(
        addItem({
          name: "Registered Agent",
          label: "Registered Agent",
          value: "Registered Agent",
          price: 59,
          id: selectedService._id,
          parentName: "Registered Agent",
        })
      )
      dispatch(addPrice())
    }
    if (selectedService.title === "Virtual Address") {
      dispatch(
        addItem({
          name: "Virtual Address",
          label: "Virtual Address",
          value: "Virtual Address",
          price: 17,
          id: selectedService._id,
          parentName: "Virtual Address per month",
        })
      )
      dispatch(addPrice())
    }
    if (selectedService.title === "Certificate Of Good Standing") {
      dispatch(
        addItem({
          name: "Certificate Of Good Standing",
          label: "Certificate Of Good Standing",
          value: "Certificate Of Good Standing",
          price: 45,
          id: selectedService._id,
          parentName: "Certificate Of Good Standing",
        })
      )
      dispatch(addPrice())
    }
    if (selectedService.title === "'Doing Business As' Name (DBA)") {
      dispatch(
        addItem({
          name: "'Doing Business As' Name (DBA)",
          label: "'Doing Business As' Name (DBA)",
          value: "'Doing Business As' Name (DBA)",
          price: 75,
          id: selectedService._id,
          parentName: "'Doing Business As' Name (DBA)",
        })
      )
      dispatch(addPrice())
    }
    if (selectedService.title === "EIN (Employer Identification No.)") {
      dispatch(
        addItem({
          name: "EIN Obtainment ",
          label: "EIN Obtainment ",
          value: "EIN Obtainment ",
          price: 25,
          id: selectedService._id,
          parentName: "EIN Obtainment ",
        })
      )
      dispatch(addPrice())
    }
    if (selectedService.title === "Business License or Permit") {
      dispatch(
        addItem({
          name: "Business License Research",
          label: "Business License Research",
          value: "Business License Research",
          price: 75,
          id: selectedService._id,
          parentName: "Business License Research",
        })
      )
      dispatch(addPrice())
    }
    if (selectedService.title === "Change of Registered Agent") {
      dispatch(
        addItem({
          name: "Processing ",
          label: "Processing ",
          value: "Processing ",
          price: 59,
          id: selectedService._id,
          parentName: "Processing ",
        })
      )
      dispatch(addPrice())
    }
    if (selectedService.title === "Amendment") {
      dispatch(
        addItem({
          name: " Processing ",
          label: " Processing ",
          value: " Processing ",
          price: 75,
          id: selectedService._id,
          parentName: " Processing ",
        })
      )
      dispatch(addPrice())
    }
    if (selectedService.title === "Company Name Change") {
      dispatch(
        addItem({
          name: " Processing ",
          label: " Processing ",
          value: " Processing ",
          price: 75,
          id: selectedService._id,
          parentName: " Processing ",
        })
      )
      dispatch(addPrice())
    }

    if (selectedService.title === "Dissolve Your Company") {
      dispatch(
        addItem({
          name: "Processing ",
          label: "Processing ",
          value: "Processing ",
          price: 125,
          id: selectedService._id,
          parentName: "Processing ",
        })
      )
      dispatch(addPrice())
    }
    if (selectedService.title === "Get Reinstated") {
      dispatch(
        addItem({
          name: "Processing ",
          label: "Processing ",
          value: "Processing ",
          price: 169,
          id: selectedService._id,
          parentName: "Processing ",
        })
      )
      dispatch(addPrice())
    }
    if (selectedService.title === "Submit an Annual Report") {
      dispatch(
        addItem({
          name: "Processing ",
          label: "Processing ",
          value: "Processing ",
          price: 49,
          id: selectedService._id,
          parentName: "Processing ",
        })
      )
      dispatch(addPrice())
    }
    if (selectedService.title === "Foreign Qualification") {
      dispatch(
        addItem({
          name: "Processing ",
          label: "Processing ",
          value: "Processing ",
          price: 135,
          id: selectedService._id,
          parentName: "Processing ",
        })
      )
      dispatch(addPrice())
    }
    if (selectedService.title === "Get a Trademark") {
      dispatch(
        addItem({
          name: "Trademark ",
          label: "Trademark ",
          value: "Trademark ",
          price: 399,
          id: selectedService._id,
          parentName: "Trademark ",
        })
      )

      dispatch(addPrice())
    }
  }, [selectedService._id])

  return (
    <div>
      {selectedService.title === "Amendment" && <AmendmentForm />}
      {selectedService.title === "Company Name Change" && <AmendmentForm />}

      {selectedService.title === "Registered Agent" && (
        <RegisteredServiceForm />
      )}
      {selectedService.title === "Virtual Address" && (
        <VirtualAddressServiceForm />
      )}
      {selectedService.title === "Certificate Of Good Standing" && (
        <GoodServiceForm />
      )}
      {selectedService.title === "'Doing Business As' Name (DBA)" && (
        <DBAServiceForm />
      )}
      {selectedService.title === "EIN (Employer Identification No.)" && (
        <EINServiceForm />
      )}
      {selectedService.title === "Foreign Qualification" && (
        <ForeignQualificationForm />
      )}
      {selectedService.title === "Change of Registered Agent" && (
        <ChangeRegisterAgentForm />
      )}
      {selectedService.title === "Business License or Permit" && (
        <BusinessLicenseForm />
      )}
      {selectedService.title === "Dissolve Your Company" && (
        <CompanyDissolutionForm />
      )}
      {selectedService.title === "Get a Trademark" && <TrademarkForm />}
      {selectedService.title === "Get Reinstated" && <ReinstatementForm />}
      {selectedService.title === "Submit an Annual Report" && (
        <AnnualReportForm />
      )}
    </div>
  )
}

export default ArticleOfAmendmentPage
