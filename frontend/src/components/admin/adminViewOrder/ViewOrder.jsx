import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik"
import { TiDeleteOutline } from "react-icons/ti"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router"
import { Button, Col, Container, Row, Spinner } from "react-bootstrap"
import { getSingleOrder } from "../../../_features/ordersSlice"
import AmendmentForm from "../../services/Amendment/viewForm"
import AnnualReportForm from "../../services/AnnualReport/viewForm"
import ReinstatementForm from "../../services/Reinstatement/viewForm"
import TrademarkForm from "../../services/Trademark/viewForm"
import CompanyDissolutionForm from "../../services/CompanyDissolution/viewForm"
import BusinessLicenseForm from "../../services/BusinessLicense/viewForm"
import ChangeRegisterAgentForm from "../../services/ChangeRegisteredAgent/viewForm"
import ForeignQualificationForm from "../../services/ForeignQualification/viewForm"
import EINServiceForm from "../../services/EmployerIdentification/viewForm"
import DBAServiceForm from "../../services/DoingBusiness/viewForm"
import GoodServiceForm from "../../services/CertificateOfGood/viewForm"
import VirtualAddressServiceForm from "../../services/VirtualAddress/viewForm"
import RegisteredServiceForm from "../../services/RegisteredAgent/viewForm"
import BusinessForm from "../../businessDetails/viewForm"
import DetailCard from "../../businessDetails/common/DetailCard"
import { routes } from "../../../routes"
import styles from "../../../pages/admin/SingleOrder.module.scss"
import { AdminFeedBack } from "../../../utils/helperApis"
import CustomSelect from "../../businessDetails/common/CustomSelect"
import InputField from "../../businessDetails/common/InputField"
import TextAreaField from "../../businessDetails/common/TextAreaField"

const ViewOrder = () => {
  const IMAGE_URL =
    process.env.REACT_APP_SERVER === "develop"
      ? process.env.REACT_APP_LOCAL_SERVER_PATH_IMAGE
      : process.env.REACT_APP_LIVE_SERVER_PATH_IMAGE

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const states = useSelector((state) => state?.orders?.singleOrder)
  const loading = useSelector((state) => state?.orders?.isLoading)
  const singleOrder = useSelector((state) => state?.orders)
  const singleItem = singleOrder?.singleOrder
  const userData = useSelector((state) => state?.auth?.userData)

  const adminFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      edit: false,
      deleteFile: false,
      adminFile: singleItem?.orderImageAdmin?.images || null,
      adminMessage: singleItem?.orderMessageAdmin?.title || "",
      adminStatus: {
        label: singleItem?.orderStatusAdmin?.title,
        value: singleItem?.orderStatusAdmin?.title,
      } || {
        label: "Un-Paid",
        value: "Un-Paid",
      },
    },

    onSubmit: async (values, action) => {
      const formData = new FormData()
      formData.append("orderStatusAdmin[title]", values.adminStatus.value)
      formData.append("orderStatusAdmin[admin]", userData?._id)
      formData.append("orderMessageAdmin[title]", values?.adminMessage)
      formData.append("orderMessageAdmin[admin]", userData?._id)
      formData.append("deleteFile", values?.deleteFile)
      if (
        typeof adminFormik.values.adminFile !== "string" &&
        adminFormik.values.adminFile
      ) {
        formData.append(`file`, values.adminFile[0], values.adminFile[0].name)
      }

      formData.append("orderImageAdmin[admin]", userData?._id)

      try {
        await AdminFeedBack(values, action, params.id, formData)
      } catch (e) {
        toast.error("Some thing went please try again")
      }
    },
  })
  const deleteFile = (e, local) => {
    if (!adminFormik.values.edit) {
      return
    }

    if (local === true) {
      adminFormik.setValues({
        ...adminFormik.values,
        adminFile: null,
      })
    } else {
      adminFormik.setValues({
        ...adminFormik.values,
        adminFile: null,
        deleteFile: true,
      })
    }
  }

  const statusOptions = [
    {
      label: "Paid",
      value: "Paid",
    },
    {
      label: "Un-Paid",
      value: "Un-Paid",
    },
    {
      label: "Return",
      value: "Return",
    },
  ]

  useEffect(() => {
    dispatch(getSingleOrder(params.id))
  }, [params.id])
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        <Spinner animation="border" role="status" style={{ color: "#d4b768" }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }
  return (
    <div>
      <div style={{ padding: "50px 0", background: "#fcfcfc" }}>
        <Container>
          <div style={{ marginBottom: "50px" }}>
            <Button
              style={{
                backgroundColor: "#d4b768",
                border: 0,
                minHeight: "50px",
              }}
              onClick={() => navigate(routes.myOrders)}
            >
              Go Back
            </Button>
          </div>
          <DetailCard title=" Order ID">
            <p>{states?._id}</p>
          </DetailCard>

          <DetailCard title="User Feedback">
            {!states?.orderImageUser?.images ? (
              <p>The User not respond till now </p>
            ) : (
              <>
                <div style={{ marginBottom: "10px" }}>
                  <h5> Image</h5>

                  <a
                    href={`${IMAGE_URL}${states?.orderImageUser?.images}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {states?.orderImageUser?.images}
                  </a>
                </div>
              </>
            )}
          </DetailCard>

          <DetailCard>
            <div className="d-flex align-items-center justify-content-between">
              {/* <h6 className="mt-4">Pricing</h6> */}
              {!adminFormik.values.edit && (
                <Button
                  className={styles.customBtn}
                  onClick={() =>
                    adminFormik.setValues({ ...adminFormik.values, edit: true })
                  }
                >
                  Add{" "}
                </Button>
              )}
            </div>
            <Row className="align-items-center mb-2 gy-2">
              <Col lg={12} sm={12}>
                <CustomSelect
                  label="Status"
                  name="adminStatus"
                  options={statusOptions}
                  value={adminFormik?.values?.adminStatus}
                  onChange={(e) =>
                    adminFormik.setValues({
                      ...adminFormik.values,
                      adminStatus: e,
                    })
                  }
                  disabled={!adminFormik.values.edit}
                />
              </Col>
              <Col lg={12} sm={12}>
                <InputField
                  id="inpFile"
                  type="file"
                  placeholder="Select "
                  name="adminFile"
                  onChange={(e) => {
                    adminFormik.setValues({
                      ...adminFormik.values,
                      adminFile: e.target.files,
                      deleteFile: false,
                    })
                  }}
                  disabled={!adminFormik.values.edit}
                  accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
                />
              </Col>

              <Col lg={12} sm={12}>
                <div className={styles.inputFieldLabel}>Uploaded File</div>
                {adminFormik.values.adminFile && (
                  <div
                    className={`d-flex align-items-center justify-content-between ${styles.uploadedFileInp}`}
                  >
                    <a
                      href={` ${
                        typeof adminFormik.values.adminFile === "string"
                          ? `${IMAGE_URL}${adminFormik.values.adminFile}`
                          : URL.createObjectURL(adminFormik.values.adminFile[0])
                      }   `}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {typeof adminFormik.values.adminFile === "string"
                        ? adminFormik.values.adminFile
                        : adminFormik.values.adminFile[0]?.name}
                    </a>

                    <div
                      className={styles.deleteUploadedFile}
                      onClick={(e) =>
                        deleteFile(
                          e,
                          typeof adminFormik.values.adminFile === "string"
                            ? false
                            : true
                        )
                      }
                    >
                      <TiDeleteOutline />
                    </div>
                  </div>
                )}
              </Col>

              <Col lg={12}>
                <TextAreaField
                  name="adminMessage"
                  label="Message"
                  value={adminFormik?.values?.adminMessage}
                  onChange={adminFormik.handleChange}
                  disabled={!adminFormik.values.edit}
                />
              </Col>
            </Row>
            {adminFormik.values.edit && (
              <div className="my-3 d-flex justify-content-end">
                <Button
                  className={styles.customBtn}
                  onClick={adminFormik.handleSubmit}
                >
                  Update
                </Button>
              </div>
            )}
          </DetailCard>
        </Container>
      </div>
      {states?.serviceId?.title === "Amendment" && <AmendmentForm edit />}
      {states?.serviceId?.title === "Company Name Change" && (
        <AmendmentForm edit />
      )}

      {states?.serviceId?.title === "Registered Agent" && (
        <RegisteredServiceForm edit />
      )}

      {states?.serviceId?.title === "Virtual Address" && (
        <VirtualAddressServiceForm edit />
      )}

      {states?.serviceId?.title === "Certificate Of Good Standing" && (
        <GoodServiceForm edit />
      )}

      {states?.serviceId?.title === "'Doing Business As' Name (DBA)" && (
        <DBAServiceForm edit />
      )}

      {states?.serviceId?.title === "EIN (Employer Identification No.)" && (
        <EINServiceForm edit />
      )}

      {states?.serviceId?.title === "Foreign Qualification" && (
        <ForeignQualificationForm edit />
      )}

      {states?.serviceId?.title === "Change of Registered Agent" && (
        <ChangeRegisterAgentForm edit />
      )}

      {states?.serviceId?.title === "Business License or Permit" && (
        <BusinessLicenseForm edit />
      )}

      {states?.serviceId?.title === "Dissolve Your Company" && (
        <CompanyDissolutionForm edit />
      )}

      {states?.serviceId?.title === "Get a Trademark" && <TrademarkForm edit />}

      {states?.serviceId?.title === "Get Reinstated" && (
        <ReinstatementForm edit />
      )}

      {states?.serviceId?.title === "Submit an Annual Report" && (
        <AnnualReportForm edit />
      )}
      {!states?.serviceId?.title && <BusinessForm edit />}
    </div>
  )
}

export default ViewOrder
