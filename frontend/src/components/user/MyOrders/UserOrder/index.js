import React, { useEffect } from "react"
import { Col, Container, Row, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import InputField from "../../../businessDetails/common/InputField"
import CustomSelect from "../../../businessDetails/common/CustomSelect"
import TextAreaField from "../../../businessDetails/common/TextAreaField"
import { routes } from "../../../../routes"
import { getSingleOrder } from "../../../../_features/ordersSlice"
import DetailCard from "../../../businessDetails/common/DetailCard"
import styles from "./styles.module.scss"

const UserOrder = () => {
  const id = useParams()?.id
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const singleOrder = useSelector((state) => state?.orders)
  // useEffect(() => {
  //   dispatch(getSingleOrder(id))
  // }, [id])
  // if (singleOrder.isLoading === false && singleOrder.singleOrder === null) {
  //   return navigate(routes.myOrders)
  // }
  // if (singleOrder.isLoading) {
  //   return (
  //     <>
  //       <div>loading</div>
  //     </>
  //   )
  // }
  const singleItem = singleOrder?.singleOrder
  const statusOptions = [
    {
      label: "Paid",
      value: "paid",
    },
    {
      label: "Un Paid",
      value: "unpaid",
    },
    {
      label: "Return",
      value: "return",
    },
  ]
  return (
    <div className={styles.orderDetail}>
      <Container>
        <DetailCard title="Order Details">
          <h5 className="mt-4">Person Information</h5>
          <Row className="align-items-center mb-2 gy-2">
            <Col lg={4} sm={6}>
              <InputField
                label="Name"
                disabled
                value={singleItem?.userId?.firstName}
              />
            </Col>
            <Col lg={4} sm={6}>
              <InputField
                label="Email"
                disabled
                value={singleItem?.userId?.email}
              />
            </Col>
            <Col lg={4} sm={6}>
              <InputField
                label="Phone"
                disabled
                value={singleItem?.userId?.phone}
              />
            </Col>
            <Col lg={4} sm={6}>
              <InputField
                label="Stripe Id"
                disabled
                value={singleItem?.userId?.stripeId}
              />
            </Col>
          </Row>
          <h5 className="mt-4">Address</h5>
          <Row className="align-items-center mb-2 gy-2">
            <Col lg={4} sm={6}>
              <InputField
                label="City"
                disabled
                value={singleItem?.address?.city}
              />
            </Col>
            <Col lg={4} sm={6}>
              <InputField
                label="Address 1"
                disabled
                value={singleItem?.address?.line1}
              />
            </Col>
            <Col lg={4} sm={6}>
              <InputField
                label="Address 2"
                disabled
                value={singleItem?.address?.line2}
              />
            </Col>
            <Col lg={4} sm={6}>
              <InputField
                label="Postal Code"
                disabled
                value={singleItem?.address?.postal_code}
              />
            </Col>
            <Col lg={4} sm={6}>
              <InputField
                label="State"
                disabled
                value={singleItem?.address?.state}
              />
            </Col>
          </Row>
          <h5 className="mt-4">Service form Details</h5>
          <h6 className="mt-4">Company Information</h6>
          <Row className="align-items-center mb-2 gy-2">
            <Col lg={4} sm={6}>
              <InputField
                label="Company Name"
                disabled
                value={
                  singleItem?.serviceDetails?.details?.verifyCompanyName ||
                  singleItem?.serviceDetails?.details?.companyName
                }
              />
            </Col>

            {singleItem?.serviceDetails?.details?.designator?.value && (
              <Col lg={4} sm={6}>
                <InputField
                  label="Designator"
                  disabled
                  value={singleItem?.serviceDetails?.details?.designator?.value}
                />
              </Col>
            )}

            {singleItem?.serviceDetails?.details?.streetAddress && (
              <Col lg={4} sm={6}>
                <InputField
                  label="Address"
                  disabled
                  value={singleItem?.serviceDetails?.details?.streetAddress}
                />
              </Col>
            )}
            {singleItem?.serviceDetails?.details?.postal_code && (
              <Col lg={4} sm={6}>
                <InputField
                  label="Postal Code"
                  disabled
                  value={singleItem?.serviceDetails?.details?.postal_code}
                />
              </Col>
            )}
            {singleItem?.serviceDetails?.details?.state?.value && (
              <Col lg={4} sm={6}>
                <InputField
                  label="State"
                  disabled
                  value={singleItem?.serviceDetails?.details?.state?.value}
                />
              </Col>
            )}
            {singleItem?.serviceDetails?.details?.city && (
              <Col lg={4} sm={6}>
                <InputField
                  label="City"
                  disabled
                  value={singleItem?.serviceDetails?.details?.city}
                />
              </Col>
            )}
            {singleItem?.serviceDetails?.details?.entityType?.value && (
              <Col lg={4} sm={6}>
                <InputField
                  label="Entity Type"
                  disabled
                  value={singleItem?.serviceDetails?.details?.entityType?.value}
                />
              </Col>
            )}

            {singleItem?.serviceDetails?.details?.stateService?.value && (
              <Col lg={4} sm={6}>
                <InputField
                  label="State Service"
                  disabled
                  value={
                    singleItem?.serviceDetails?.details?.stateService?.value
                  }
                />
              </Col>
            )}
            {singleItem?.serviceDetails?.details?.stateFormation?.value && (
              <Col lg={4} sm={6}>
                <InputField
                  label="State Formation "
                  disabled
                  value={
                    singleItem?.serviceDetails?.details?.stateFormation?.value
                  }
                />
              </Col>
            )}
          </Row>
          {singleItem?.serviceId?.title === "Business License or Permit" && (
            <>
              <h6 className="mt-4">Service Information</h6>
              <Row className="align-items-center mb-2 gy-2">
                <Col lg={4} sm={6}>
                  <InputField
                    label="Service Name"
                    disabled
                    value={singleItem?.serviceId?.title}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <InputField
                    label="Business Type"
                    disabled
                    value={
                      singleItem?.serviceDetails?.details?.businessType?.value
                    }
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <InputField
                    label="Business Purpose"
                    disabled
                    value={singleItem?.serviceDetails?.details?.businessPurpose}
                  />
                </Col>
              </Row>
            </>
          )}
          {singleItem?.serviceId?.title === "Change of Registered Agent" && (
            <>
              <h6 className="mt-4">Service Information</h6>
              <Row className="align-items-center mb-2 gy-2">
                <Col lg={4} sm={6}>
                  <InputField
                    label="Service Name"
                    disabled
                    value={singleItem?.serviceId?.title}
                  />
                </Col>
                {singleItem?.serviceDetails?.details?.activeTab === 0 ? (
                  <>
                    <Col lg={4} sm={6}>
                      <InputField
                        label="Agent First Name "
                        disabled
                        value={
                          singleItem?.serviceDetails?.details?.agentFirstName
                        }
                      />
                    </Col>
                    <Col lg={4} sm={6}>
                      <InputField
                        label="Agent Last Name "
                        disabled
                        value={
                          singleItem?.serviceDetails?.details?.agentLastName
                        }
                      />
                    </Col>
                  </>
                ) : (
                  <>
                    {" "}
                    <Col lg={4} sm={6}>
                      <InputField
                        label="Company Name"
                        disabled
                        value={
                          singleItem?.serviceDetails?.details?.agentCompanyName
                        }
                      />
                    </Col>
                  </>
                )}
                <Col lg={4} sm={6}>
                  <InputField
                    label={`${
                      singleItem?.serviceDetails?.details?.activeTab === 0
                        ? "Agent"
                        : "Company"
                    } State`}
                    disabled
                    value={
                      singleItem?.serviceDetails?.details?.agentState?.value
                    }
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <InputField
                    label={`${
                      singleItem?.serviceDetails?.details?.activeTab === 0
                        ? "Agent"
                        : "Company"
                    } Address`}
                    disabled
                    value={
                      singleItem?.serviceDetails?.details?.agentStreetAddress
                    }
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <InputField
                    label={`${
                      singleItem?.serviceDetails?.details?.activeTab === 0
                        ? "Agent"
                        : "Company"
                    } Postal Code`}
                    disabled
                    value={singleItem?.serviceDetails?.details?.agentZipcode}
                  />
                </Col>
              </Row>
            </>
          )}
          {singleItem?.serviceId?.title === "Certificate Of Good Standing" && (
            <>
              <h6 className="mt-4">Service Information</h6>
              <Row className="align-items-center mb-2 gy-2">
                <Col lg={4} sm={6}>
                  <InputField
                    label="Service Name"
                    disabled
                    value={singleItem?.serviceId?.title}
                  />
                </Col>
              </Row>
            </>
          )}
          {singleItem?.serviceId?.title ===
            "EIN (Employer Identification No.)" && (
            <>
              <h6 className="mt-4">Service Information</h6>
              <Row className="align-items-center mb-2 gy-2">
                <Col lg={4} sm={6}>
                  <InputField
                    label="Service Name"
                    disabled
                    value={singleItem?.serviceId?.title}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <InputField
                    label="Date of Formation"
                    disabled
                    value={singleItem?.serviceDetails?.details?.dateOfFormation}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <InputField
                    label="IRS First Name"
                    disabled
                    value={
                      singleItem?.serviceDetails?.details?.newContactFirstName
                    }
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <InputField
                    label="IRS Last Name"
                    disabled
                    value={
                      singleItem?.serviceDetails?.details?.newContactLastName
                    }
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <InputField
                    label="IRS Company Address"
                    disabled
                    value={
                      singleItem?.serviceDetails?.details?.newCompanyAddress
                    }
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <InputField
                    label="IRS State"
                    disabled
                    value={
                      singleItem?.serviceDetails?.details?.newCompanyState
                        ?.value
                    }
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <InputField
                    label="IRS Postal Code"
                    disabled
                    value={
                      singleItem?.serviceDetails?.details?.newCompanyZipcode
                    }
                  />
                </Col>
              </Row>
            </>
          )}
          {singleItem?.serviceId?.title === "Virtual Address" && (
            <>
              <h6 className="mt-4">Service Information</h6>
              <Row className="align-items-center mb-2 gy-2">
                <Col lg={4} sm={6}>
                  <InputField
                    label="Service Name"
                    disabled
                    value={singleItem?.serviceId?.title}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <InputField
                    label="Members"
                    disabled
                    value={singleItem?.serviceDetails?.details?.members.value}
                  />
                </Col>
              </Row>
              <h6 className="mt-4">Member List </h6>
              <Row className="align-items-center mb-2 gy-2">
                {singleItem?.serviceDetails?.details?.memberList.map((e, i) => (
                  <React.Fragment key={i}>
                    <span className="text-bold">Member {i + 1}</span>
                    <Col lg={4} sm={6}>
                      <InputField
                        label="First Name"
                        disabled
                        value={e.firstName}
                      />
                    </Col>
                    <Col lg={4} sm={6}>
                      <InputField
                        label="Last Name"
                        disabled
                        value={e.lastName}
                      />
                    </Col>
                    <Col lg={4} sm={6}>
                      <InputField
                        label="Postal Code"
                        disabled
                        value={e?.postal_code}
                      />
                    </Col>
                    <Col lg={4} sm={6}>
                      <InputField
                        label="Address 1 "
                        disabled
                        value={e?.address}
                      />
                    </Col>
                    <Col lg={4} sm={6}>
                      <InputField
                        label="Address 2"
                        disabled
                        value={e?.addressStreet}
                      />
                    </Col>
                    <Col lg={4} sm={6}>
                      <InputField label="City" disabled value={e?.city} />
                    </Col>
                  </React.Fragment>
                ))}
              </Row>
            </>
          )}
          {singleItem?.serviceId?.title === "Foreign Qualification" && (
            <>
              <h6 className="mt-4">Service Information</h6>
              <Row className="align-items-center mb-2 gy-2">
                <Col lg={4} sm={6}>
                  <InputField
                    label="Service Name"
                    disabled
                    value={singleItem?.serviceId?.title}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <InputField
                    label="Which register Agent he want?"
                    disabled
                    value={singleItem?.serviceDetails?.details?.agent}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <InputField
                    label="Business Type"
                    disabled
                    value={singleItem?.serviceDetails?.details?.businessType}
                  />{" "}
                </Col>
                {singleItem?.serviceDetails?.details?.registerTab === 1 && (
                  <>
                    {singleItem?.serviceDetails?.details?.registerInnerTab ===
                    0 ? (
                      <>
                        <Col lg={4} sm={6}>
                          <InputField
                            label="Agent First Name"
                            disabled
                            value={
                              singleItem?.serviceDetails?.details
                                ?.agentFirstName
                            }
                          />
                        </Col>
                        <Col lg={4} sm={6}>
                          <InputField
                            label="Agent Last Name"
                            disabled
                            value={
                              singleItem?.serviceDetails?.details?.agentLastName
                            }
                          />{" "}
                        </Col>
                      </>
                    ) : (
                      <Col lg={4} sm={12}>
                        <InputField
                          label="Agent Company"
                          disabled
                          value={
                            singleItem?.serviceDetails?.details
                              ?.agentCompanyName
                          }
                        />
                      </Col>
                    )}

                    <Col lg={4} sm={6}>
                      <InputField
                        label="Agent State"
                        disabled
                        value={
                          singleItem?.serviceDetails?.details?.agentState?.value
                        }
                      />
                    </Col>
                    <Col lg={4} sm={6}>
                      <InputField
                        label="Agent Street Address"
                        disabled
                        value={
                          singleItem?.serviceDetails?.details
                            ?.agentStreetAddress
                        }
                      />
                    </Col>
                    <Col lg={4} sm={6}>
                      <InputField
                        label="Agent Address"
                        disabled
                        value={
                          singleItem?.serviceDetails?.details?.agentAddress
                        }
                      />
                    </Col>
                    <Col lg={4} sm={6}>
                      <InputField
                        label="Agent Postal Code"
                        disabled
                        value={
                          singleItem?.serviceDetails?.details?.agentZipcode
                        }
                      />
                    </Col>
                  </>
                )}
                <Col lg={4} sm={6}>
                  <InputField
                    label="Members"
                    disabled
                    value={singleItem?.serviceDetails?.details?.members.value}
                  />
                </Col>
              </Row>
              <h6 className="mt-4">Member List </h6>
              <Row className="align-items-center mb-2 gy-2">
                {singleItem?.serviceDetails?.details?.memberList.map((e, i) => (
                  <React.Fragment key={i}>
                    <span className="text-bold">Member {i + 1}</span>
                    {e.activeTab === 0 ? (
                      <>
                        <Col lg={4} sm={6}>
                          <InputField
                            label="First Name"
                            disabled
                            value={e.firstName}
                          />
                        </Col>
                        <Col lg={4} sm={6}>
                          <InputField
                            label="Last Name"
                            disabled
                            value={e.lastName}
                          />
                        </Col>
                      </>
                    ) : (
                      <>
                        <Col lg={4} sm={12}>
                          <InputField
                            label="Company Name"
                            disabled
                            value={e.companyName}
                          />
                        </Col>
                      </>
                    )}
                    <Col lg={4} sm={6}>
                      <InputField
                        label="Postal Code"
                        disabled
                        value={e?.postal_code}
                      />
                    </Col>
                    <Col lg={4} sm={6}>
                      <InputField
                        label="Address 1 "
                        disabled
                        value={e?.address}
                      />
                    </Col>
                    <Col lg={4} sm={6}>
                      <InputField
                        label="Address 2"
                        disabled
                        value={e?.addressStreet}
                      />
                    </Col>
                    <Col lg={4} sm={6}>
                      <InputField label="City" disabled value={e?.city} />
                    </Col>
                  </React.Fragment>
                ))}
              </Row>
            </>
          )}
          {singleItem?.serviceId?.title === "Registered Agent" && (
            <>
              <h6 className="mt-4">Service Information</h6>
              <Row className="align-items-center mb-2 gy-2">
                <Col lg={4} sm={6}>
                  <InputField
                    label="Service Name"
                    disabled
                    value={singleItem?.serviceId?.title}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <InputField
                    label="Change of Agent"
                    disabled
                    value={
                      singleItem?.serviceDetails?.details?.changeOfAgent
                        ? "Yes"
                        : "No"
                    }
                  />
                </Col>
              </Row>
            </>
          )}
          {singleItem?.serviceId?.title === "Amendment" && (
            <>
              <h6 className="mt-4">Service Information</h6>
              <Row className="align-items-center mb-2 gy-2">
                <Col lg={4} sm={6}>
                  <InputField
                    label="Service Name"
                    disabled
                    value={singleItem?.serviceId?.title}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <InputField
                    label="Company Change Request"
                    disabled
                    value={
                      singleItem?.serviceDetails?.details?.checkbox
                        ? "Yes"
                        : "No"
                    }
                  />
                </Col>
                {singleItem?.serviceDetails?.details?.checkbox && (
                  <>
                    <InputField
                      label="New Company Name"
                      disabled
                      value={singleItem?.serviceDetails?.details?.newCompany}
                    />
                    <InputField
                      label="New Company Details"
                      disabled
                      value={
                        singleItem?.serviceDetails?.details?.newCompanyDetail
                      }
                    />
                    <InputField
                      label="New Company Designator"
                      disabled
                      value={
                        singleItem?.serviceDetails?.details?.newCompanyOption
                          ?.value
                      }
                    />
                  </>
                )}
              </Row>
            </>
          )}
          {singleItem?.serviceId?.title === "Dissolve Your Company" && (
            <>
              <h6 className="mt-4">Service Information</h6>
              <Row className="align-items-center mb-2 gy-2">
                <Col lg={4} sm={6}>
                  <InputField
                    label="Service Name"
                    disabled
                    value={singleItem?.serviceId?.title}
                  />
                </Col>
              </Row>
            </>
          )}
          {singleItem?.serviceId?.title === "Get a Trademark" && (
            <>
              <h6 className="mt-4">Service Information</h6>
              <Row className="align-items-center mb-2 gy-2">
                <Col lg={4} sm={6}>
                  <InputField
                    label="Service Name"
                    disabled
                    value={singleItem?.serviceId?.title}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <InputField
                    label="Type of trademark"
                    disabled
                    value={
                      singleItem?.serviceDetails.details.activeTab === 0
                        ? "Name"
                        : singleItem?.serviceDetails.details.activeTab === 1
                        ? "Slogan"
                        : singleItem?.serviceDetails.details.activeTab === 2
                        ? "logo"
                        : "Not Selected"
                    }
                  />
                </Col>
                {singleItem?.serviceDetails.details.activeTab === 0 && (
                  <Col lg={4} sm={6}>
                    <InputField
                      label="Business Name"
                      disabled
                      value={singleItem?.serviceDetails.details.businessName}
                    />
                  </Col>
                )}
                {singleItem?.serviceDetails.details.activeTab === 1 && (
                  <Col lg={4} sm={6}>
                    <InputField
                      label="Slogan Name"
                      disabled
                      value={singleItem?.serviceDetails.details.slogan}
                    />
                  </Col>
                )}
                <Col lg={4} sm={6}>
                  <InputField
                    label="List of Products"
                    disabled
                    value={singleItem?.serviceDetails.details.markTags}
                  />
                </Col>{" "}
                <Col lg={4} sm={6}>
                  <InputField
                    label="Currently using the mark"
                    disabled
                    value={
                      singleItem?.serviceDetails.details.usingMark
                        ? "Yes"
                        : " No"
                    }
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <InputField
                    label="Terms & conditions "
                    disabled
                    value={
                      singleItem?.serviceDetails.details.agree ? "Yes" : " No"
                    }
                  />
                </Col>
              </Row>
            </>
          )}
          {singleItem?.serviceId?.title === "Submit an Annual Report" && (
            <>
              <h6 className="mt-4">Service Information</h6>
              <Row className="align-items-center mb-2 gy-2">
                <Col lg={4} sm={6}>
                  <InputField
                    label="Service Name"
                    disabled
                    value={singleItem?.serviceId?.title}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <InputField
                    label="Date of Formation"
                    disabled
                    value={singleItem?.serviceDetails?.details?.dateOfFormation}
                  />
                </Col>
              </Row>
            </>
          )}
          {singleItem?.serviceId?.title === "Get Reinstated" && (
            <>
              <h6 className="mt-4">Service Information</h6>
              <Row className="align-items-center mb-2 gy-2">
                <Col lg={4} sm={6}>
                  <InputField
                    label="Service Name"
                    disabled
                    value={singleItem?.serviceId?.title}
                  />
                </Col>
              </Row>
            </>
          )}

          <h6 className="mt-4">Pricing</h6>
          <span className="mb-2">
            Status {singleItem?.status === "true" ? "Paid" : "Un paid"}
          </span>
          <h6 className="mt-4">Status</h6>
          <Row className="align-items-center mb-2 gy-2">
            <Col lg={4} sm={6}>
              <CustomSelect
                label="Status"
                name="status"
                options={statusOptions}
              />
            </Col>
            <Col lg={4} sm={6}>
              <InputField label="Upload File" id="inpFile" type="file" />
            </Col>
            <Col lg={8}>
              <TextAreaField name="statusMessage" label="Message" />
            </Col>
          </Row>
          <div className={styles.tableWrapper}>
            <Table responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {singleItem?.orderDetails?.map(
                  (item, i) =>
                    Number(item?.price) !== 0 && (
                      <tr key={i}>
                        <td>{item?.name}</td>
                        <td>${item?.price}</td>
                      </tr>
                    )
                )}
                <tr>
                  <td>Total Price</td>
                  <td>${singleItem?.price}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </DetailCard>
      </Container>
    </div>
  )
}

export default UserOrder
