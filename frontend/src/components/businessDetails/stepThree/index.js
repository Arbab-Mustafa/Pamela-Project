import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Button, Form } from "react-bootstrap"
import DetailCard from "../common/DetailCard"
import styles from "./stepThree.module.scss"
import InputField from "../common/InputField"
import CustomSelect from "../common/CustomSelect"
import CardInfo from "../common/CardInfo"

const StepThree = ({ formik, inputFields, setInputFields }) => {
  const [activeTab, setActiveTab] = useState(0)
  const states = useSelector((state) => state?.common?.state)
  const stateOptions = states?.map((value) => {
    return {
      value: value?.value,
      label: value?.name,
      price: value?.price,
      id: value?.id,
      parentName: "State",
    }
  })
  const ownershipOptions = [
    {
      value: "100",
      label: "100%",
    },
    {
      value: "75",
      label: "75%",
    },
    {
      value: "50",
      label: "50%",
    },
    {
      value: "25",
      label: "25%",
    },
  ]

  const handleFormChange = (index, event) => {
    const data = [...inputFields]
    data[index][event.target.name] = event.target.value
    setInputFields(data)
    localStorage?.setItem("member", JSON.stringify(data))
    if (formik.values.members.value !== 0) {
      // if (a !== undefined) toast.error("Please fill  members information")
      if (data[index].activeTab === 0) {
        if (
          data[index]?.firstName?.trim() === "" ||
          data[index]?.lastName?.trim() === "" ||
          data[index]?.state?.value?.trim() === "" ||
          data[index]?.postal_code === "" ||
          data[index]?.address?.trim() === "" ||
          data[index]?.addressStreet?.trim() === "" ||
          data[index]?.city?.trim() === "" ||
          data[index]?.ownerShip.value?.trim() === ""
        ) {
          data[index]["saveButton"] = false
          setInputFields(data)
          localStorage?.setItem("member", JSON.stringify(data))
        } else {
          data[index]["saveButton"] = true
          setInputFields(data)
          localStorage?.setItem("member", JSON.stringify(data))
        }
      } else {
        if (
          data[index]?.state?.value?.trim() === "" ||
          data[index]?.companyName.trim() === "" ||
          data[index]?.postal_code === "" ||
          data[index]?.address?.trim() === "" ||
          data[index]?.addressStreet?.trim() === "" ||
          data[index]?.city?.trim() === "" ||
          data[index]?.ownerShip.value?.trim() === ""
        ) {
          data[index]["saveButton"] = false
          setInputFields(data)
          localStorage?.setItem("member", JSON.stringify(data))
        } else {
          data[index]["saveButton"] = true
          setInputFields(data)
          localStorage?.setItem("member", JSON.stringify(data))
        }
      }
    }
  }

  useEffect(() => {
    const arrayCopy = Array.from({
      length: formik.values.members?.value,
    }).map((e, i) => {
      return {
        key: i,
        activeTab: inputFields[i]?.activeTab || 0,
        saveButton: inputFields[i]?.saveButton || false,
        done: inputFields[i]?.done || false,
        companyName: inputFields[i]?.companyName || "",
        firstName: inputFields[i]?.firstName || "",
        lastName: inputFields[i]?.lastName || "",
        postal_code: inputFields[i]?.postal_code || "",
        address: inputFields[i]?.address || "",
        addressStreet: inputFields[i]?.addressStreet || "",
        city: inputFields[i]?.city || "",
        state: inputFields[i]?.state || "",
        ownerShip: inputFields[i]?.ownerShip || "",
      }
    })
    setInputFields([...arrayCopy])
  }, [formik.values.members?.value])

  return (
    <div className={styles.stepWrapper}>
      {inputFields?.map((value, index) => (
        <>
          <DetailCard title={`Member ${index + 1}`}>
            {value?.done ? (
              <div>
                <p>
                  Name :{" "}
                  <span>
                    {value?.firstName
                      ? `${value?.firstName} ${value?.lastName}`
                      : value?.companyName}
                  </span>
                </p>
                <p>
                  OwnerShip : <span>{value?.ownerShip?.value}%</span>
                </p>
                <p>
                  Address :{" "}
                  <span>
                    {" "}
                    {value?.addressStreet}, {value?.address}, {value?.city},{" "}
                    {value?.state?.value} {value?.postal_code}
                  </span>
                </p>
              </div>
            ) : (
              <>
                <div className={styles.tabsWrapper}>
                  <div className={styles.tabBtnsWrapper}>
                    <div
                      className={styles.tabBtn}
                      role="button"
                      onClick={() => {
                        const data = [...inputFields]
                        data[index]["companyName"] = ""
                        data[index]["activeTab"] = 0
                        setInputFields(data)
                        localStorage?.setItem("member", JSON.stringify(data))
                        if (formik.values.members.value !== 0) {
                          // if (a !== undefined) toast.error("Please fill  members information")
                          if (data[index].activeTab === 0) {
                            if (
                              data[index]?.firstName?.trim() === "" ||
                              data[index]?.lastName?.trim() === "" ||
                              data[index]?.state?.value?.trim() === "" ||
                              data[index]?.postal_code === "" ||
                              data[index]?.address?.trim() === "" ||
                              data[index]?.addressStreet?.trim() === "" ||
                              data[index]?.city?.trim() === "" ||
                              data[index]?.ownerShip.value?.trim()
                            ) {
                              data[index]["saveButton"] = false
                              setInputFields(data)
                              localStorage?.setItem(
                                "member",
                                JSON.stringify(data)
                              )
                            } else {
                              data[index]["saveButton"] = true
                              setInputFields(data)
                              localStorage?.setItem(
                                "member",
                                JSON.stringify(data)
                              )
                            }
                          } else {
                            if (
                              data[index]?.state?.value?.trim() === "" ||
                              data[index]?.postal_code === "" ||
                              data[index]?.address?.trim() === "" ||
                              data[index]?.addressStreet?.trim() === "" ||
                              data[index]?.city?.trim() === "" ||
                              data[index]?.ownerShip.value?.trim() ||
                              data[index]?.companyName?.trim() === ""
                            ) {
                              data[index]["saveButton"] = false
                              setInputFields(data)
                              localStorage?.setItem(
                                "member",
                                JSON.stringify(data)
                              )
                            } else {
                              data[index]["saveButton"] = true
                              setInputFields(data)
                              localStorage?.setItem(
                                "member",
                                JSON.stringify(data)
                              )
                            }
                          }
                        }
                      }}
                      tabIndex={0}
                    >
                      <div>
                        <Form.Check
                          inline
                          name={"newContactCheckboxx" + index}
                          type="radio"
                          checked={value?.activeTab === 0 ? "checked" : ""}
                        />
                      </div>
                      <div>
                        <h6>Individual</h6>
                        <p>Select if Member is a person.</p>
                      </div>
                    </div>
                    <div
                      className={styles.tabBtn}
                      role="button"
                      onClick={() => {
                        const data = [...inputFields]
                        data[index]["activeTab"] = 1
                        data[index]["firstName"] = ""
                        data[index]["lastName"] = ""
                        setInputFields(data)
                        localStorage?.setItem("member", JSON.stringify(data))
                        if (formik.values.members.value !== 0) {
                          // if (a !== undefined) toast.error("Please fill  members information")
                          if (data[index].activeTab === 0) {
                            if (
                              data[index]?.firstName?.trim() === "" ||
                              data[index]?.lastName?.trim() === "" ||
                              data[index]?.state?.value?.trim() === "" ||
                              data[index]?.postal_code === "" ||
                              data[index]?.address?.trim() === "" ||
                              data[index]?.addressStreet?.trim() === "" ||
                              data[index]?.city?.trim() === "" ||
                              data[index]?.ownerShip.value?.trim()
                            ) {
                              data[index]["saveButton"] = false
                              setInputFields(data)
                              localStorage?.setItem(
                                "member",
                                JSON.stringify(data)
                              )
                            } else {
                              data[index]["saveButton"] = true
                              setInputFields(data)
                              localStorage?.setItem(
                                "member",
                                JSON.stringify(data)
                              )
                            }
                          } else {
                            if (
                              data[index]?.state?.value?.trim() === "" ||
                              data[index]?.companyName?.trim() === "" ||
                              data[index]?.postal_code === "" ||
                              data[index]?.address?.trim() === "" ||
                              data[index]?.addressStreet?.trim() === "" ||
                              data[index]?.city?.trim() === "" ||
                              data[index]?.ownerShip.value?.trim()
                            ) {
                              data[index]["saveButton"] = false
                              setInputFields(data)
                              localStorage?.setItem(
                                "member",
                                JSON.stringify(data)
                              )
                            } else {
                              data[index]["saveButton"] = true
                              setInputFields(data)
                              localStorage?.setItem(
                                "member",
                                JSON.stringify(data)
                              )
                            }
                          }
                        }
                      }}
                      tabIndex={0}
                    >
                      <div>
                        <Form.Check
                          inline
                          name={"newContactCheckboxx" + index}
                          type="radio"
                          checked={value?.activeTab === 1 ? "checked" : ""}
                        />
                      </div>
                      <div>
                        <h6>Company</h6>
                        <p>Select if Member is a company.</p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.tabsContentWrapper}>
                    {value?.activeTab === 0 ? (
                      <>
                        <div className={styles.detailCardFieldsWrapper}>
                          <div className={styles.inpField}>
                            <InputField
                              label="First Name *"
                              name="firstName"
                              type="text"
                              placeholder="First Name *"
                              autoComplete="off"
                              value={value.firstName}
                              onChange={(event) =>
                                handleFormChange(index, event)
                              }
                            />
                          </div>
                          <div className={styles.inpField}>
                            <InputField
                              label="Last Name *"
                              name="lastName"
                              placeholder="Last Name *"
                              autoComplete="off"
                              type="text"
                              value={value.lastName}
                              onChange={(event) =>
                                handleFormChange(index, event)
                              }
                            />
                          </div>
                          <div className={styles.inpField}>
                            <InputField
                              label="Street Address *"
                              name="addressStreet"
                              type="text"
                              placeholder="Street Address *"
                              autoComplete="off"
                              disabled={value?.addressCheckbox}
                              value={value.addressStreet}
                              onChange={(event) =>
                                handleFormChange(index, event)
                              }
                            />
                          </div>
                          <div className={styles.inpField}>
                            <InputField
                              placeholder="Address (Cont)"
                              name="address"
                              label="Address (Cont)"
                              autoComplete="off"
                              type="text"
                              disabled={value?.addressCheckbox}
                              value={value.address}
                              onChange={(event) =>
                                handleFormChange(index, event)
                              }
                            />
                          </div>
                          <div className={styles.inpField}>
                            <InputField
                              label="City *"
                              name="city"
                              type="text"
                              disabled={value?.addressCheckbox}
                              placeholder="City *"
                              autoComplete="off"
                              value={value.city}
                              onChange={(event) =>
                                handleFormChange(index, event)
                              }
                            />
                          </div>
                          <div className={styles.inpField}>
                            <CustomSelect
                              label="State *"
                              name="state"
                              disabled={value?.addressCheckbox}
                              placeholder="Select State"
                              options={stateOptions}
                              value={value?.state}
                              onChange={(e) => {
                                const data = [...inputFields]
                                data[index]["state"] = e
                                setInputFields(data)
                                localStorage?.setItem(
                                  "member",
                                  JSON.stringify(data)
                                )
                              }}
                              id="state"
                            />
                          </div>
                          <div className={styles.inpField}>
                            <InputField
                              label="Zip Code *"
                              placeholder="Zip Code *"
                              name="postal_code"
                              disabled={value?.addressCheckbox}
                              autoComplete="off"
                              type="number"
                              value={value.postal_code}
                              onChange={(event) =>
                                handleFormChange(index, event)
                              }
                            />
                          </div>
                          <div className={styles.inpField}>
                            <CustomSelect
                              label="% of Ownership *"
                              name="state"
                              placeholder="Select "
                              options={ownershipOptions}
                              value={value?.ownerShip}
                              onChange={(e) => {
                                const data = [...inputFields]
                                data[index]["ownerShip"] = e
                                setInputFields(data)
                                localStorage?.setItem(
                                  "member",
                                  JSON.stringify(data)
                                )
                              }}
                            />
                          </div>
                        </div>
                        <CardInfo>
                          The articles of organization will include the names
                          and or addresses of the initial members of the LLC.
                        </CardInfo>
                      </>
                    ) : value?.activeTab === 1 ? (
                      <>
                        <div className={styles.detailCardFieldsWrapper}>
                          <div className="w-100">
                            <InputField
                              label="Company Name *"
                              name="companyName"
                              type="text"
                              value={value?.companyName}
                              onChange={(event) =>
                                handleFormChange(index, event)
                              }
                            />
                          </div>
                          <div className={styles.inpField}>
                            <InputField
                              label="Street Address *"
                              name="addressStreet"
                              type="text"
                              placeholder="Street Address *"
                              autoComplete="off"
                              disabled={value?.addressCheckbox}
                              value={value.addressStreet}
                              onChange={(event) =>
                                handleFormChange(index, event)
                              }
                            />
                          </div>
                          <div className={styles.inpField}>
                            <InputField
                              placeholder="Address (Cont)"
                              name="address"
                              label="Address (Cont)"
                              autoComplete="off"
                              type="text"
                              disabled={value?.addressCheckbox}
                              value={value.address}
                              onChange={(event) =>
                                handleFormChange(index, event)
                              }
                            />
                          </div>
                          <div className={styles.inpField}>
                            <InputField
                              label="City *"
                              name="city"
                              type="text"
                              disabled={value?.addressCheckbox}
                              placeholder="City *"
                              autoComplete="off"
                              value={value.city}
                              onChange={(event) =>
                                handleFormChange(index, event)
                              }
                            />
                          </div>
                          <div className={styles.inpField}>
                            <CustomSelect
                              label="State *"
                              name="state"
                              disabled={value?.addressCheckbox}
                              placeholder="Select State"
                              options={stateOptions}
                              value={value?.state}
                              onChange={(e) => {
                                const data = [...inputFields]
                                data[index]["state"] = e
                                setInputFields(data)
                                localStorage?.setItem(
                                  "member",
                                  JSON.stringify(data)
                                )
                              }}
                              id="state"
                            />
                          </div>
                          <div className={styles.inpField}>
                            <InputField
                              label="Zip Code *"
                              placeholder="Zip Code *"
                              name="postal_code"
                              disabled={value?.addressCheckbox}
                              autoComplete="off"
                              type="number"
                              value={value.postal_code}
                              onChange={(event) =>
                                handleFormChange(index, event)
                              }
                            />
                          </div>
                          <div className={styles.inpField}>
                            <CustomSelect
                              label="% of Ownership *"
                              name="state"
                              placeholder="Select "
                              options={ownershipOptions}
                              value={value?.ownerShip}
                              onChange={(e) => {
                                const data = [...inputFields]
                                data[index]["ownerShip"] = e
                                setInputFields(data)
                                localStorage?.setItem(
                                  "member",
                                  JSON.stringify(data)
                                )
                              }}
                            />
                          </div>
                        </div>
                        <CardInfo>
                          The articles of organization will include the names
                          and or addresses of the initial members of the LLC.
                        </CardInfo>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </>
            )}
            <div>
              <Button
                // onClick={step <= 10 ? () => setStep(step + 1) : setStep(1)}
                disabled={!value?.saveButton}
                onClick={() => {
                  const data = [...inputFields]
                  if (value?.done) {
                    data[index]["done"] = false
                  } else {
                    data[index]["done"] = true
                  }
                  setInputFields(data)
                  localStorage?.setItem("member", JSON.stringify(data))
                }}
                className={styles.stepperNextBtn}
              >
                {value?.done ? "Edit" : "Save"}
              </Button>
            </div>
          </DetailCard>
        </>
      ))}
    </div>
  )
}

export default StepThree
