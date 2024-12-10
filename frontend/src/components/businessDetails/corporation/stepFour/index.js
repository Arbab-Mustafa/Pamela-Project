import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Button } from "react-bootstrap"
import DetailCard from "../../common/DetailCard"
import styles from "./stepFour.module.scss"
import InputField from "../../common/InputField"
import CustomSelect from "../../common/CustomSelect"
import PhoneSelect from "../../common/PhoneInput"

const StepFour = ({
  formik,
  membersData,
  setMembersData,
  inputFields,
  setInputFields,
}) => {
  const handleFormChange = (index, event) => {
    const data = [...inputFields]

    data[index][event.target.name] = event.target.value
    setInputFields(data)
    localStorage?.setItem("shareholder", JSON.stringify(data))

    if (formik.values.shareholderNumber.value !== 0) {
      // if (a !== undefined) toast.error("Please fill  members information")
      if (
        data[index].addressCheckbox === null ||
        data[index].addressCheckbox === true
      ) {
        if (
          (data[index]?.shareholderSelect?.value === "other" &&
            data[index]?.firstName?.trim() === "") ||
          (data[index]?.shareholderSelect?.value === "other" &&
            data[index]?.lastName?.trim() === "") ||
          data[index]?.state?.value?.trim() === "" ||
          data[index]?.postal_code === "" ||
          data[index]?.addressStreet?.trim() === "" ||
          data[index]?.city?.trim() === "" ||
          data[index]?.personShares?.trim() === "" ||
          data[index]?.shareholderSelect?.value?.trim() === ""
        ) {
          data[index]["saveButton"] = false
          setInputFields(data)
          localStorage?.setItem("shareholder", JSON.stringify(data))
        } else {
          data[index]["saveButton"] = true
          setInputFields(data)
          localStorage?.setItem("shareholder", JSON.stringify(data))
        }
      } else {
        if (
          data[index]?.firstName?.trim() === "" ||
          data[index]?.lastName?.trim() === ""
        ) {
          data[index]["saveButton"] = false
          setInputFields(data)
          localStorage?.setItem("shareholder", JSON.stringify(data))
        } else {
          data[index]["saveButton"] = true
          setInputFields(data)
          localStorage?.setItem("shareholder", JSON.stringify(data))
        }
      }
    }
  }
  useEffect(() => {
    const arrayCopy = Array.from({
      length: formik.values.shareholderNumber?.value,
    }).map((e, i) => {
      return {
        saveButton: inputFields[i]?.saveButton || false,
        done: inputFields[i]?.done || false,
        addressCheckbox: inputFields[i]?.addressCheckbox || null,
        firstName: inputFields[i]?.firstName || "",
        lastName: inputFields[i]?.lastName || "",
        postal_code: inputFields[i]?.postal_code || "",
        address: inputFields[i]?.address || "",
        addressStreet: inputFields[i]?.addressStreet || "",
        city: inputFields[i]?.city || "",
        state: inputFields[i]?.state || "",
        shareholderSelect: inputFields[i]?.shareholderSelect || "",
        personShares: inputFields[i]?.personShares || "",
      }
    })
    setInputFields([...arrayCopy])
  }, [formik.values.shareholderNumber?.value])

  const optionsArray = []
  const optionsMember = membersData.map((e) =>
    e?.firstName.trim() !== ""
      ? optionsArray.push({
          value: e?.firstName + " " + e?.lastName,
          label: e?.firstName + " " + e?.lastName,
        })
      : null
  )

  const selectOptions = [...optionsArray, { value: "other", label: "other" }]

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

  return (
    <div className={styles.stepWrapper}>
      {inputFields?.length !== 0 &&
        inputFields?.map((value, index) => (
          <>
            <DetailCard title={`Shareholder ${index + 1}`}>
              {value?.done ? (
                <div>
                  <p>
                    Name :{" "}
                    <span>
                      {value?.firstName
                        ? `${value?.firstName} ${value?.lastName}`
                        : value?.shareholderSelect?.label}
                    </span>
                  </p>
                  <p>No of Shares: {value?.personShares}</p>
                </div>
              ) : (
                <>
                  <div className={styles.detailCardFieldsWrapper}>
                    <div className="w-100">
                      <CustomSelect
                        label="Shareholder *"
                        name="shareholder"
                        placeholder="Select Shareholder"
                        options={selectOptions}
                        value={value?.shareholderSelect}
                        onChange={(e) => {
                          const data = [...inputFields]
                          data[index]["shareholderSelect"] = e
                          setInputFields(data)
                          localStorage?.setItem(
                            "shareholder",
                            JSON.stringify(data)
                          )

                          if (formik.values.shareholderNumber.value !== 0) {
                            // if (a !== undefined) toast.error("Please fill  members information")
                            if (
                              data[index].addressCheckbox === null ||
                              data[index].addressCheckbox === true
                            ) {
                              if (
                                (data[index]?.shareholderSelect?.value ===
                                  "other" &&
                                  data[index]?.firstName?.trim() === "") ||
                                (data[index]?.shareholderSelect?.value ===
                                  "other" &&
                                  data[index]?.lastName?.trim() === "") ||
                                data[index]?.state?.value?.trim() === "" ||
                                data[index]?.postal_code === "" ||
                                data[index]?.addressStreet?.trim() === "" ||
                                data[index]?.city?.trim() === "" ||
                                data[index]?.personShares?.trim() === "" ||
                                data[
                                  index
                                ]?.shareholderSelect?.value?.trim() === ""
                              ) {
                                data[index]["saveButton"] = false
                                setInputFields(data)
                                localStorage?.setItem(
                                  "shareholder",
                                  JSON.stringify(data)
                                )
                              } else {
                                data[index]["saveButton"] = true
                                setInputFields(data)
                                localStorage?.setItem(
                                  "shareholder",
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
                                  "shareholder",
                                  JSON.stringify(data)
                                )
                              } else {
                                data[index]["saveButton"] = true
                                setInputFields(data)
                                localStorage?.setItem(
                                  "shareholder",
                                  JSON.stringify(data)
                                )
                              }
                            }
                          }
                        }}
                      />
                    </div>
                    {value?.shareholderSelect?.value !== "other" &&
                    value?.shareholderSelect !== "" ? (
                      <div className={styles.inpField}>
                        <InputField
                          label="Full Name *"
                          name="fullName"
                          type="text"
                          placeholder="First Name *"
                          autoComplete="off"
                          value={value.shareholderSelect?.value}
                          disabled
                          // onChange={(event) => handleFormChange(index, event)}
                        />
                      </div>
                    ) : (
                      <>
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
                      </>
                    )}

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
                            "shareholder",
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
                    <div className={styles.inpField}>
                      <InputField
                        label="No. Of Shares *"
                        name="personShares"
                        disabled={value?.addressCheckbox}
                        autoComplete="off"
                        type="number"
                        value={value.personShares}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </div>
                    {/* <div className={styles.ssnInpField}>
                      <InputField
                        label="SSN *"
                        name="ssnNumber"
                        type="text"
                        placeholder="000-00-0000"
                      />
                    </div> */}
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
                    localStorage?.setItem("shareholder", JSON.stringify(data))
                  }}
                  className={styles.stepperNextBtn}
                >
                  {value?.done ? "Edit" : "Save"}
                </Button>
              </div>
            </DetailCard>
          </>
        ))}
      {/* <DetailCard title="Representative Information">
        <div className={styles.detailCardDesciption}>
          Please provide the contact information of a company officer or legal
          representative that the IRS may call if any additional information is
          needed.
        </div>
        <div className={styles.detailCardFieldsWrapper}>
          <div className={styles.inpField}>
            <InputField label="Full Name *" name="fullName" type="text" />
          </div>
          <div className={styles.inpField}>
            <PhoneSelect label="Mobile Phone *" name="phone" />
          </div>
        </div>
      </DetailCard> */}
    </div>
  )
}

export default StepFour
