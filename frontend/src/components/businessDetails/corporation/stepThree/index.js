import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Button, Form } from "react-bootstrap"
import DetailCard from "../../common/DetailCard"
import styles from "./stepThree.module.scss"
import InputField from "../../common/InputField"
import CustomSelect from "../../common/CustomSelect"
import CardInfo from "../../common/CardInfo"

const StepThree = ({ formik, inputFields, setInputFields, type }) => {
  const states = useSelector((state) => state?.common?.state)
  const handleFormChange = (index, event) => {
    const data = [...inputFields]
    data[index][event.target.name] = event.target.value
    setInputFields(data)
    localStorage?.setItem("member", JSON.stringify(data))
    if (formik.values.members.value !== 0) {
      // if (a !== undefined) toast.error("Please fill  members information")
      if (
        data[index].addressCheckbox === null ||
        data[index].addressCheckbox === true
      ) {
        if (
          data[index]?.firstName?.trim() === "" ||
          data[index]?.lastName?.trim() === "" ||
          data[index]?.state?.value?.trim() === "" ||
          data[index]?.postal_code === "" ||
          data[index]?.address?.trim() === "" ||
          data[index]?.addressStreet?.trim() === "" ||
          data[index]?.city?.trim() === ""
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
          data[index]?.firstName?.trim() === "" ||
          data[index]?.lastName?.trim() === ""
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
    const arrayCopy = Array.from({ length: formik.values.members?.value }).map(
      (e, i) => {
        return {
          saveButton: inputFields[i]?.saveButton || false,
          done: inputFields[i]?.done || false,
          addressCheckbox:
            inputFields[i]?.addressCheckbox === null
              ? null
              : inputFields[i]?.addressCheckbox,
          firstName: inputFields[i]?.firstName || "",
          lastName: inputFields[i]?.lastName || "",
          postal_code: inputFields[i]?.postal_code || "",
          address: inputFields[i]?.address || "",
          addressStreet: inputFields[i]?.addressStreet || "",
          city: inputFields[i]?.city || "",
          state: inputFields[i]?.state || "",
        }
      }
    )

    setInputFields([...arrayCopy])
  }, [formik.values.members?.value])

  const optionsArray = []
  const optionsMember = inputFields.map((e) =>
    e?.firstName.trim() !== ""
      ? optionsArray.push({
          value: e?.firstName + " " + e?.lastName,
          label: e?.firstName + " " + e?.lastName,
        })
      : null
  )

  const selectOptions = [...optionsArray, { value: "other", label: "other" }]

  const stateOptions = states?.map((value) => {
    return {
      value: value?.value,
      label: value?.name,
      price: value?.price,
      id: value?.id,
      parentName: "State",
    }
  })

  return (
    <div className={styles.stepWrapper}>
      <div className={styles.infoTitle}>Directors Information</div>
      {inputFields?.length !== 0 &&
        inputFields.map((value, index) => (
          <React.Fragment key={index}>
            <DetailCard title={`Director ${index + 1}`}>
              {value?.done ? (
                <div>
                  <p>
                    Name :{" "}
                    <span>
                      {value?.firstName} {value?.lastName}
                    </span>
                  </p>
                </div>
              ) : (
                <>
                  <div className={`mb-4 ${styles.inpCheckWrapper}`}>
                    <Form.Check
                      inline
                      onChange={(e) => {
                        const data = [...inputFields]
                        data[index]["addressCheckbox"] = true
                        data[index]["postal_code"] = formik.values.postal_code
                        data[index]["address"] = formik.values.address
                        data[index]["addressStreet"] =
                          formik.values.streetAddress
                        data[index]["city"] = formik.values.city
                        data[index]["state"] = formik.values.state

                        setInputFields(data)
                        localStorage?.setItem("member", JSON.stringify(data))
                        if (formik.values.members.value !== 0) {
                          // if (a !== undefined) toast.error("Please fill  members information")
                          if (
                            data[index].addressCheckbox === null ||
                            data[index].addressCheckbox === true
                          ) {
                            if (
                              data[index]?.firstName?.trim() === "" ||
                              data[index]?.lastName?.trim() === "" ||
                              data[index]?.state?.value?.trim() === "" ||
                              data[index]?.postal_code === "" ||
                              data[index]?.address?.trim() === "" ||
                              data[index]?.addressStreet?.trim() === "" ||
                              data[index]?.city?.trim() === ""
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
                              data[index]?.firstName?.trim() === "" ||
                              data[index]?.lastName?.trim() === ""
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
                      label="Use your Company Address"
                      name={"newContactCheckbox" + index}
                      checked={value?.addressCheckbox === true ? "checked" : ""}
                      type="radio"
                      className="me-5 mb-3"
                    />
                    <div>
                      <Form.Check
                        inline
                        onChange={(e) => {
                          const data = [...inputFields]

                          data[index]["addressCheckbox"] = false
                          data[index]["postal_code"] = ""
                          data[index]["address"] = ""
                          data[index]["addressStreet"] = ""
                          data[index]["city"] = ""
                          data[index]["state"] = ""

                          setInputFields(data)
                          localStorage?.setItem("member", JSON.stringify(data))
                          if (formik.values.members.value !== 0) {
                            // if (a !== undefined) toast.error("Please fill  members information")
                            if (
                              data[index].addressCheckbox === null ||
                              data[index].addressCheckbox === true
                            ) {
                              if (
                                data[index]?.firstName?.trim() === "" ||
                                data[index]?.lastName?.trim() === "" ||
                                data[index]?.state?.value?.trim() === "" ||
                                data[index]?.postal_code === "" ||
                                data[index]?.address?.trim() === "" ||
                                data[index]?.addressStreet?.trim() === "" ||
                                data[index]?.city?.trim() === ""
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
                                data[index]?.firstName?.trim() === "" ||
                                data[index]?.lastName?.trim() === ""
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
                        label="Use The Assigned Company Address Provided By Filthy Rich Idea"
                        checked={
                          value?.addressCheckbox === false ? "checked" : ""
                        }
                        name={"newContactCheckbox" + index}
                        type="radio"
                        className="me-5"
                      />
                    </div>
                    <div>
                      <Form.Check
                        inline
                        checked={
                          value?.addressCheckbox === null ? "checked" : ""
                        }
                        onChange={(e) => {
                          const data = [...inputFields]

                          data[index]["addressCheckbox"] = null
                          data[index]["postal_code"] = ""
                          data[index]["address"] = ""
                          data[index]["addressStreet"] = ""
                          data[index]["city"] = ""
                          data[index]["state"] = ""
                          setInputFields(data)
                          localStorage?.setItem("member", JSON.stringify(data))
                          if (formik.values.members.value !== 0) {
                            // if (a !== undefined) toast.error("Please fill  members information")
                            if (
                              data[index].addressCheckbox === null ||
                              data[index].addressCheckbox === true
                            ) {
                              if (
                                data[index]?.firstName?.trim() === "" ||
                                data[index]?.lastName?.trim() === "" ||
                                data[index]?.state?.value?.trim() === "" ||
                                data[index]?.postal_code === "" ||
                                data[index]?.address?.trim() === "" ||
                                data[index]?.addressStreet?.trim() === "" ||
                                data[index]?.city?.trim() === ""
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
                                data[index]?.firstName?.trim() === "" ||
                                data[index]?.lastName?.trim() === ""
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
                        label="Add Your own Company"
                        name={"newContactCheckbox" + index}
                        type="radio"
                        className="me-5 mt-3"
                      />
                    </div>
                  </div>
                  <div className={styles.detailCardFieldsWrapper}>
                    <div className={styles.inpField}>
                      <InputField
                        label="First Name *"
                        name="firstName"
                        type="text"
                        placeholder="First Name *"
                        autoComplete="off"
                        value={value.firstName}
                        onChange={(event) => handleFormChange(index, event)}
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
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </div>
                    {(value?.addressCheckbox === true ||
                      value?.addressCheckbox === null) && (
                      <>
                        <div className={styles.inpField}>
                          <InputField
                            label="Street Address *"
                            name="addressStreet"
                            type="text"
                            placeholder="Street Address *"
                            autoComplete="off"
                            disabled={value?.addressCheckbox}
                            value={value.addressStreet}
                            onChange={(event) => handleFormChange(index, event)}
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
                            onChange={(event) => handleFormChange(index, event)}
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
                            onChange={(event) => handleFormChange(index, event)}
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
                            onChange={(event) => handleFormChange(index, event)}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  {value?.addressCheckbox === false && (
                    <CardInfo>
                      We will use the company address for the director
                      information in order to shield your personal information
                      from being publicly available.
                    </CardInfo>
                  )}
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
          </React.Fragment>
        ))}

      <div className={styles.infoTitle}>Officer Information</div>
      <DetailCard title="President/CEO">
        <div className={styles.detailCardDesciption}>
          The President is responsible for overseeing the operations of the
          corporation, and must abide by the decisions and directions of the
          board of directors. They have the duty to ensure the company's goals
          and objectives are met, while ensuring the company operates within the
          scope of its legal authority. The President may also be the CEO (Chief
          Executive Officer).
        </div>
        <div className={styles.detailCardFieldsWrapper}>
          <div className="w-100">
            <CustomSelect
              label="President *"
              name="president"
              placeholder="Select President"
              options={selectOptions}
              value={formik.values?.ceoSelect}
              onChange={(e) =>
                formik.setValues({ ...formik.values, ceoSelect: e })
              }
            />
          </div>
          {formik.values?.ceoSelect?.value === "other" && (
            <div className={styles.inpField}>
              <InputField
                label="Full Name *"
                name="ceo"
                type="text"
                value={formik.values.ceo}
                onChange={formik.handleChange}
                error={formik.errors?.ceo}
              />
            </div>
          )}
        </div>
      </DetailCard>
      <DetailCard title="Secretary">
        <div className={styles.detailCardDesciption}>
          The designated Corporate Secretary will maintain and preserve all
          records of meetings of both directors and shareholders.
        </div>
        <div className={styles.detailCardFieldsWrapper}>
          <div className="w-100">
            <CustomSelect
              label="Secretary *"
              name="secretary"
              placeholder="Select Secretary"
              options={selectOptions}
              value={formik.values?.secretarySelect}
              onChange={(e) =>
                formik.setValues({ ...formik.values, secretarySelect: e })
              }
            />
          </div>
          {formik.values?.secretarySelect?.value === "other" && (
            <div className={styles.inpField}>
              <InputField
                label="Full Name *"
                name="secretary"
                type="text"
                value={formik.values.secretary}
                onChange={formik.handleChange}
                error={formik.errors?.secretary}
              />
            </div>
          )}
        </div>
      </DetailCard>
      <DetailCard title="Treasurer">
        <div className={styles.detailCardDesciption}>
          The Treasurer (aka CFO or Chief Financial Officer) will make sure that
          accurate and up-to-date records of the corporation's assets and
          business activities are kept securely.
        </div>
        <div className={styles.detailCardFieldsWrapper}>
          <div className="w-100">
            <CustomSelect
              label="Treasurer *"
              name="treasurer"
              placeholder="Select Treasurer"
              options={selectOptions}
              value={formik.values?.treasurerSelect}
              onChange={(e) =>
                formik.setValues({ ...formik.values, treasurerSelect: e })
              }
            />
          </div>
          {formik.values?.treasurerSelect?.value === "other" && (
            <div className={styles.inpField}>
              <InputField
                label="Full Name *"
                name="treasurer"
                type="text"
                value={formik.values.treasurer}
                onChange={formik.handleChange}
                error={formik.errors?.treasurer}
              />
            </div>
          )}
        </div>
      </DetailCard>
      <DetailCard title="Vice President ">
        <div className={styles.detailCardDesciption}>
          The role of Vice President , however they are available to step in and
          act on behalf of the President if they are not able to attend meetings
          or make business decisions.
        </div>
        <div className={styles.detailCardFieldsWrapper}>
          <div className="w-100">
            <CustomSelect
              label="Vice President"
              name="vicePresident"
              placeholder="Select Vice President"
              options={selectOptions}
              value={formik.values?.vicePresidentSelect}
              onChange={(e) =>
                formik.setValues({ ...formik.values, vicePresidentSelect: e })
              }
            />
          </div>
          {formik.values?.vicePresidentSelect?.value === "other" && (
            <div className={styles.inpField}>
              <InputField
                label="Full Name *"
                name="vicePresident"
                type="text"
                value={formik.values.vicePresident}
                onChange={formik.handleChange}
                error={formik.errors?.vicePresident}
              />
            </div>
          )}
        </div>
      </DetailCard>
    </div>
  )
}

export default StepThree
