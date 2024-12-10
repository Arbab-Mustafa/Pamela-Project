import React, { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useSelector } from "react-redux"
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"
import styles from "./stepper.module.scss"
import OrderSummary from "../common/OrderSummary"
import StepOne from "../stepOne"
import StepTwo from "../stepTwo"
import StepThree from "../stepThree"
import StepFour from "../stepFour"
import StepFive from "../stepFive"
import StepSix from "../stepSix"
import StepSeven from "../stepSeven"
import StepEight from "../stepEight"
import StepNine from "../stepNine"
import StepTen from "../stepTen"
import ProfitStepTwo from "../nonProfit/stepTwo"
import ProfitStepThree from "../nonProfit/stepThree"
import CorporationStepThree from "../corporation/stepThree"
import CorporationStepFour from "../corporation/stepFour"
import PriceSection from "../../common/PriceSection"
import { routes } from "../../../routes"

const DetailStepperForm = ({ values }) => {
  const [step, setStep] = useState(1)
  const [type, setType] = useState("corporation")
  const localData = JSON.parse(localStorage?.getItem("formData")) || {}

  const [inputFields, setInputFields] = useState(
    JSON.parse(localStorage?.getItem("member")) || []
  )
  const navigate = useNavigate()
  const [inputFields2, setInputFields2] = useState(
    JSON.parse(localStorage?.getItem("shareholder")) || []
  )
  const agentInfo = {
    agentFirstName: localData?.agentFirstName || "",
    agentLastName: localData?.agentLastName || "",
    agentAddress: localData?.agentAddress || "",
    agentStreetAddress: localData?.agentStreetAddress || "",
    agentCity: localData?.agentCity || "",
    agentState:
      {
        label: localData?.agentState?.label || "",
        value: localData?.agentState?.value || "",
      } || "",
    agentZipcode: localData?.agentZipcode || "",
    agentCompanyName: localData?.agentCompanyName || "",
  }

  const user = useSelector((state) => state?.auth?.userData)
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      step: localData?.step || 1,
      // step 1
      statePrice: localData?.statePrice || values.stateName?.price,
      packagePrice: localData?.packagePrice || values.packagePrice,
      packageName: localData?.packageName || values.packageName,
      entityState: localData?.entityState?.value || values.entityType?.value,
      stateFormation: localData?.stateFormation?.value || values?.state?.value,
      package: localData?.package || values?.package,
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      streetAddress: localData?.streetAddress || "",
      address: localData?.address || "",
      city: localData?.city || "",
      state: {
        label: localData?.state?.value,
        value: localData?.state?.value,
      } || {
        label: "Select State",
        value: "",
      },
      postal_code: localData?.postal_code || "",
      // step 2
      companyName: localData?.companyName || "",
      designator: {
        label: localData?.designator?.label || "Select ",
        value: localData?.designator?.value || "",
      },
      members: {
        label: localData?.members?.value || "Select",
        value: localData?.members?.value || "",
      },
      businessPurpose: localData?.businessPurpose || "",
      businessIdea: {
        value: localData?.businessIdea?.value,
        label: localData?.businessIdea?.label,
      } || {
        value: "",
        label: "Select",
      },
      paidAddress: localData?.paidAddress || true,
      shareholderNumber: {
        label: localData?.shareholderNumber?.label || "select",
        value: localData?.shareholderNumber?.value || "",
      },
      shareholderNumberAuth: localData?.shareholderNumberAuth || "",
      sharePerValue: localData?.sharePerValue || "",

      // step 3 S-Coperation
      ceo: localData?.ceo || "",
      ceoSelect: {
        label: localData?.ceoSelect?.label || "select",
        value: localData?.ceoSelect?.value || "",
      },
      secretary: localData?.secretary || "",
      secretarySelect: {
        label: localData?.secretarySelect?.label || "select",
        value: localData?.secretarySelect?.value || "",
      },
      treasurer: localData?.treasurer || "",
      treasurerSelect: {
        label: localData?.treasurerSelect?.label || "select",
        value: localData?.treasurerSelect?.value || "",
      },
      vicePresident: localData?.vicePresident || "",
      vicePresidentSelect: {
        label: localData?.vicePresidentSelect?.label || "select",
        value: localData?.vicePresidentSelect?.value || "",
      },

      // step 5
      agentFree: localData?.agentFree || 0,
      activeTab: localData?.activeTab || 0,
      ...agentInfo,
      // step 6
      foreignIndividual: localData?.foreignIndividual || false,
      einFirstName: localData?.einFirstName || "",
      einLastName: localData?.einLastName || "",
      einNumberType: localData?.einNumberType || "SSN",
      einNumber: localData?.einNumber || "",
      einStreetAddress: localData?.einStreetAddress || "",
      einCity: localData?.einCity || "",
      einState: {
        label: localData?.einState?.value,
        value: localData?.einState?.value,
      } || {
        label: "Select State",
        value: "",
      },
      einPostal_code: localData?.einPostal_code || "",
      // step 7
      businessBanking: localData?.businessBanking || 0,
      // step 8
      taxConsultation: localData?.taxConsultation || true,
      // step 9
      businessLicense: localData?.businessLicense || true,
      businessLicenseStreetAddress:
        localData?.businessLicenseStreetAddress || "",
      businessLicenseAddress: localData?.businessLicenseAddress || "",
      businessLicenseCity: localData?.businessLicenseCity || "",
      businessLicenseState: {
        label: localData?.businessLicenseState?.value || "select",
        value: localData?.businessLicenseState?.value || "",
      },
      businessLicensePostal_code: localData?.businessLicensePostal_code || "",
    },
    validationSchema: Yup.object({
      // step 1
      firstName: Yup.string().when("step", {
        is: 1,
        then: Yup.string().required("Required"),
      }),
      lastName: Yup.string().when("step", {
        is: 1,
        then: Yup.string().required("Required"),
      }),
      email: Yup.string().when("step", {
        is: 1,
        then: Yup.string().required("Required"),
      }),
      phone: Yup.string().when("step", {
        is: 1,
        then: Yup.string().required("Required"),
      }),
      streetAddress: Yup.string().when("step", {
        is: 1,
        then: Yup.string().required("Required"),
      }),

      city: Yup.string().when("step", {
        is: 1,
        then: Yup.string().required("Required"),
      }),
      postal_code: Yup.string().when("step", {
        is: 1,
        then: Yup.string().required("Required"),
      }),
      state: Yup.object().when("step", {
        is: 1,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),
      // step 2
      companyName: Yup.string().when("step", {
        is: 2,
        then: Yup.string().required("Required"),
      }),
      members: Yup.object().when("step", {
        is: 2,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),
      businessIdea: Yup.object().when("step", {
        is: 2,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),
      businessPurpose: Yup.string().when("step", {
        is: 2,
        then: Yup.string()
          .required("Required")
          .min(200, "200 Characters Required"),
      }),
      sharePerValue: Yup.string().when("step", {
        is: 2,
        then: Yup.string().required("Required"),
      }),
      shareholderNumberAuth: Yup.string().when("step", {
        is: 2,
        then: Yup.string().required("Required"),
      }),
      designator: Yup.object().when("step", {
        is: 2,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),
      shareholderNumber: Yup.object().when("step", {
        is: 2,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),
      // step 3
      ceo: Yup.string().when("step", {
        is: 3,
        then: Yup.string().when("ceoSelect[value]", {
          is: "other",
          then: Yup.string().required("Required"),
        }),
      }),
      ceoSelect: Yup.object().when("step", {
        is: 3,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),
      secretary: Yup.string().when("step", {
        is: 3,
        then: Yup.string().when("secretarySelect[value]", {
          is: "other",
          then: Yup.string().required("Required"),
        }),
      }),
      secretarySelect: Yup.object().when("step", {
        is: 3,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),
      treasurer: Yup.string().when("step", {
        is: 3,
        then: Yup.string().when("treasurerSelect[value]", {
          is: "other",
          then: Yup.string().required("Required"),
        }),
      }),
      treasurerSelect: Yup.object().when("step", {
        is: 3,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),
      vicePresident: Yup.string().when("step", {
        is: 3,
        then: Yup.string().when("vicePresidentSelect[value]", {
          is: "other",
          then: Yup.string().required("Required"),
        }),
      }),
      vicePresidentSelect: Yup.object().when("step", {
        is: 3,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),
      // step -5
      agentFirstName: Yup.string().when("step", {
        is: 5,
        then: Yup.string().when("agentFree", {
          is: 1,
          then: Yup.string().when("activeTab", {
            is: 0,
            then: Yup.string().required("Required"),
          }),
        }),
      }),
      agentLastName: Yup.string().when("step", {
        is: 5,
        then: Yup.string().when("agentFree", {
          is: 1,
          then: Yup.string().when("activeTab", {
            is: 0,
            then: Yup.string().required("Required"),
          }),
        }),
      }),
      // agentAddress: Yup.string().when("step", {
      //   is: 5,
      //   then: Yup.string().when("agentFree", {
      //     is: 1,
      //     then: Yup.string().required("Required"),
      //   }),
      // }),
      agentStreetAddress: Yup.string().when("step", {
        is: 5,
        then: Yup.string().when("agentFree", {
          is: 1,
          then: Yup.string().required("Required"),
        }),
      }),
      agentCity: Yup.string().when("step", {
        is: 5,
        then: Yup.string().when("agentFree", {
          is: 1,
          then: Yup.string().required("Required"),
        }),
      }),
      agentZipcode: Yup.string().when("step", {
        is: 5,
        then: Yup.string().when("agentFree", {
          is: 1,
          then: Yup.string().required("Required").max(5, "Max five characters"),
        }),
      }),

      agentCompanyName: Yup.string().when("step", {
        is: 5,
        then: Yup.string().when("agentFree", {
          is: 1,
          then: Yup.string().when("activeTab", {
            is: 1,
            then: Yup.string().required("Required"),
          }),
        }),
      }),
      agentState: Yup.object().when("step", {
        is: 5,
        then: Yup.object().when("agentFree", {
          is: 1,
          then: Yup.object().shape({
            value: Yup.string().required("Required"),
          }),
        }),
      }),
      // step -7
      einFirstName: Yup.string().when("step", {
        is: 6,
        then: Yup.string().required("Required"),
      }),
      einLastName: Yup.string().when("step", {
        is: 6,
        then: Yup.string().required("Required"),
      }),
      einStreetAddress: Yup.string().when("step", {
        is: 6,
        then: Yup.string().required("Required"),
      }),
      einCity: Yup.string().when("step", {
        is: 6,
        then: Yup.string().required("Required"),
      }),
      einPostal_code: Yup.string().when("step", {
        is: 6,
        then: Yup.string().required("Required"),
      }),
      einState: Yup.object().when("step", {
        is: 6,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),
      einNumber: Yup.string().when("step", {
        is: 6,
        then: Yup.string().when("foreignIndividual", {
          is: false,
          then: Yup.string().required("Required").min(10, "9 digits Required"),
        }),
      }),
      // step -9

      businessLicenseStreetAddress: Yup.string().when("step", {
        is: 9,
        then: Yup.string().when("businessLicense", {
          is: true,
          then: Yup.string().required("Required"),
        }),
      }),
      businessLicenseAddress: Yup.string().when("step", {
        is: 9,
        then: Yup.string().when("businessLicense", {
          is: true,
          then: Yup.string().required("Required"),
        }),
      }),
      businessLicenseCity: Yup.string().when("step", {
        is: 9,
        then: Yup.string().when("businessLicense", {
          is: true,
          then: Yup.string().required("Required"),
        }),
      }),

      businessLicensePostal_code: Yup.string().when("step", {
        is: 9,
        then: Yup.string().when("businessLicense", {
          is: true,
          then: Yup.string().required("Required").max(5, "Max five characters"),
        }),
      }),
      businessLicenseState: Yup.object().when("step", {
        is: 9,
        then: Yup.object().when("businessLicense", {
          is: true,
          then: Yup.object().shape({
            value: Yup.string().required("Required"),
          }),
        }),
      }),
    }),
    onSubmit: async (value, action) => {
      const data = [...inputFields]
      const data2 = [...inputFields2]
      if (value.step === 3 && value.members.value !== 0) {
        // if (a !== undefined) toast.error("Please fill  members information")
        const a = data?.find((item) => {
          const err = ""
          if (item.addressCheckbox === null || item.addressCheckbox === true) {
            if (
              item?.firstName?.trim() === "" ||
              item?.lastName?.trim() === "" ||
              item?.state?.value?.trim() === "" ||
              item?.postal_code === "" ||
              item?.addressStreet?.trim() === "" ||
              item?.city?.trim() === ""
            ) {
              return toast.error("Please fill all Felids")
            }
          } else {
            if (
              item?.firstName?.trim() === "" ||
              item?.lastName?.trim() === ""
            ) {
              return toast.error("Please fill all Felids")
            }
          }
          return err
        })

        if (a !== undefined) return
      }
      if (value.step === 4 && value.shareholderNumber.value !== 0) {
        // if (a !== undefined) toast.error("Please fill  members information")
        const a = data2?.find((item) => {
          const err = ""
          if (item.addressCheckbox === null || item.addressCheckbox === true) {
            if (
              (item?.shareholderSelect?.value === "other" &&
                item?.firstName?.trim() === "") ||
              (item?.shareholderSelect?.value === "other" &&
                item?.lastName?.trim() === "") ||
              item?.state?.value?.trim() === "" ||
              item?.postal_code === "" ||
              item?.addressStreet?.trim() === "" ||
              item?.city?.trim() === "" ||
              item?.personShares?.trim() === "" ||
              item?.shareholderSelect?.value?.trim() === ""
            ) {
              return toast.error("Please fill all Felids")
            }
          } else {
            if (
              item?.firstName?.trim() === "" ||
              item?.lastName?.trim() === ""
            ) {
              return toast.error("Please fill all Felids")
            }
          }
          return err
        })

        if (a !== undefined) return
      }

      if (value.step > 9) {
        return navigate(`${routes.amendmentServicePayment}`, {
          state: {
            business: true,
            service: {
              name: value?.entityState,
              serviceId: "63f67b6680b86ad51edbe32a",
              serviceDetails: {
                ...value,
                membersList: [...inputFields],
                shareholders: [...inputFields2],
              },
            },
          },
        })
      }
      action.setValues({ ...value, step: Number(value?.step) + 1 })
      localStorage?.setItem(
        "formData",
        JSON.stringify({ ...value, step: Number(value?.step) + 1 })
      )
    },
  })

  const formik2 = useFormik({
    enableReinitialize: true,
    initialValues: {
      step: localData?.step || 1,
      statePrice: localData?.statePrice || values.stateName?.price,
      packagePrice: localData?.packagePrice || values.packagePrice,
      packageName: localData?.packageName || values.packageName,
      // step 1

      entityState: localData?.entityState?.value || values.entityType?.value,
      stateFormation: localData?.stateFormation?.value || values?.state?.value,
      package: localData?.package || values?.package,
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      streetAddress: localData?.streetAddress || "",
      address: localData?.address || "",
      city: localData?.city || "",
      state: {
        label: localData?.state?.value,
        value: localData?.state?.value,
      } || {
        label: "Select State",
        value: "",
      },
      postal_code: localData?.postal_code || "",

      nonProfitMember: "96% selection rate",
      generalPurposeNonProfit: "96% selection rate",

      // step 2
      companyName: localData?.companyName || "",
      designator: {
        label: localData?.designator?.label || "Select ",
        value: localData?.designator?.value || "",
      },
      members: {
        label: localData?.members?.value || "Select",
        value: localData?.members?.value || "",
      },
      businessPurpose: localData?.businessPurpose || "",
      businessIdea: {
        value: localData?.businessIdea?.value,
        label: localData?.businessIdea?.label,
      } || {
        value: "",
        label: "Select",
      },
      paidAddress: localData?.paidAddress || true,

      // step 3 S-Coperation
      ceo: localData?.ceo || "",
      ceoSelect: {
        label: localData?.ceoSelect?.label || "select",
        value: localData?.ceoSelect?.value || "",
      },
      secretary: localData?.secretary || "",
      secretarySelect: {
        label: localData?.secretarySelect?.label || "select",
        value: localData?.secretarySelect?.value || "",
      },
      treasurer: localData?.treasurer || "",
      treasurerSelect: {
        label: localData?.treasurerSelect?.label || "select",
        value: localData?.treasurerSelect?.value || "",
      },
      vicePresident: localData?.vicePresident || "",
      vicePresidentSelect: {
        label: localData?.vicePresidentSelect?.label || "select",
        value: localData?.vicePresidentSelect?.value || "",
      },

      // step 5
      agentFree: localData?.agentFree || 0,
      activeTab: localData?.activeTab || 0,
      ...agentInfo,
      // step 6
      foreignIndividual: localData?.foreignIndividual || false,
      einFirstName: localData?.einFirstName || "",
      einLastName: localData?.einLastName || "",
      einNumberType: localData?.einNumberType || "SSN",
      einNumber: localData?.einNumber || "",
      einStreetAddress: localData?.einStreetAddress || "",
      einCity: localData?.einCity || "",
      einState: {
        label: localData?.einState?.value,
        value: localData?.einState?.value,
      } || {
        label: "Select State",
        value: "",
      },
      einPostal_code: localData?.einPostal_code || "",
      // step 7
      businessBanking: localData?.businessBanking || 0,
      // step 8
      taxConsultation: localData?.taxConsultation || true,
      // step 9
      businessLicense: localData?.businessLicense || true,
      businessLicenseStreetAddress:
        localData?.businessLicenseStreetAddress || "",
      businessLicenseAddress: localData?.businessLicenseAddress || "",
      businessLicenseCity: localData?.businessLicenseCity || "",
      businessLicenseState: {
        label: localData?.businessLicenseState?.value || "select",
        value: localData?.businessLicenseState?.value || "",
      },
      businessLicensePostal_code: localData?.businessLicensePostal_code || "",
    },
    validationSchema: Yup.object({
      // step 1
      firstName: Yup.string().when("step", {
        is: 1,
        then: Yup.string().required("Required"),
      }),
      lastName: Yup.string().when("step", {
        is: 1,
        then: Yup.string().required("Required"),
      }),
      email: Yup.string().when("step", {
        is: 1,
        then: Yup.string().required("Required"),
      }),
      phone: Yup.string().when("step", {
        is: 1,
        then: Yup.string().required("Required"),
      }),
      streetAddress: Yup.string().when("step", {
        is: 1,
        then: Yup.string().required("Required"),
      }),

      city: Yup.string().when("step", {
        is: 1,
        then: Yup.string().required("Required"),
      }),
      postal_code: Yup.string().when("step", {
        is: 1,
        then: Yup.string().required("Required"),
      }),
      state: Yup.object().when("step", {
        is: 1,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),
      // step 2
      companyName: Yup.string().when("step", {
        is: 3,
        then: Yup.string().required("Required"),
      }),
      members: Yup.object().when("step", {
        is: 3,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),
      businessIdea: Yup.object().when("step", {
        is: 3,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),
      businessPurpose: Yup.string().when("step", {
        is: 3,
        then: Yup.string()
          .required("Required")
          .min(200, "200 Characters Required"),
      }),

      designator: Yup.object().when("step", {
        is: 3,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),

      // step 4
      ceo: Yup.string().when("step", {
        is: 4,
        then: Yup.string().when("ceoSelect[value]", {
          is: "other",
          then: Yup.string().required("Required"),
        }),
      }),
      ceoSelect: Yup.object().when("step", {
        is: 4,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),
      secretary: Yup.string().when("step", {
        is: 4,
        then: Yup.string().when("secretarySelect[value]", {
          is: "other",
          then: Yup.string().required("Required"),
        }),
      }),
      secretarySelect: Yup.object().when("step", {
        is: 4,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),
      treasurer: Yup.string().when("step", {
        is: 4,
        then: Yup.string().when("treasurerSelect[value]", {
          is: "other",
          then: Yup.string().required("Required"),
        }),
      }),
      treasurerSelect: Yup.object().when("step", {
        is: 4,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),
      vicePresident: Yup.string().when("step", {
        is: 4,
        then: Yup.string().when("vicePresidentSelect[value]", {
          is: "other",
          then: Yup.string().required("Required"),
        }),
      }),
      vicePresidentSelect: Yup.object().when("step", {
        is: 4,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),
      // step -5
      agentFirstName: Yup.string().when("step", {
        is: 5,
        then: Yup.string().when("agentFree", {
          is: 1,
          then: Yup.string().when("activeTab", {
            is: 0,
            then: Yup.string().required("Required"),
          }),
        }),
      }),
      agentLastName: Yup.string().when("step", {
        is: 5,
        then: Yup.string().when("agentFree", {
          is: 1,
          then: Yup.string().when("activeTab", {
            is: 0,
            then: Yup.string().required("Required"),
          }),
        }),
      }),
      // agentAddress: Yup.string().when("step", {
      //   is: 5,
      //   then: Yup.string().when("agentFree", {
      //     is: 1,
      //     then: Yup.string().required("Required"),
      //   }),
      // }),
      agentStreetAddress: Yup.string().when("step", {
        is: 5,
        then: Yup.string().when("agentFree", {
          is: 1,
          then: Yup.string().required("Required"),
        }),
      }),
      agentCity: Yup.string().when("step", {
        is: 5,
        then: Yup.string().when("agentFree", {
          is: 1,
          then: Yup.string().required("Required"),
        }),
      }),
      agentZipcode: Yup.string().when("step", {
        is: 5,
        then: Yup.string().when("agentFree", {
          is: 1,
          then: Yup.string().required("Required").max(5, "Max five characters"),
        }),
      }),

      agentCompanyName: Yup.string().when("step", {
        is: 5,
        then: Yup.string().when("agentFree", {
          is: 1,
          then: Yup.string().when("activeTab", {
            is: 1,
            then: Yup.string().required("Required"),
          }),
        }),
      }),
      agentState: Yup.object().when("step", {
        is: 5,
        then: Yup.object().when("agentFree", {
          is: 1,
          then: Yup.object().shape({
            value: Yup.string().required("Required"),
          }),
        }),
      }),
      // step -7
      einFirstName: Yup.string().when("step", {
        is: 6,
        then: Yup.string().required("Required"),
      }),
      einLastName: Yup.string().when("step", {
        is: 6,
        then: Yup.string().required("Required"),
      }),
      einStreetAddress: Yup.string().when("step", {
        is: 6,
        then: Yup.string().required("Required"),
      }),
      einCity: Yup.string().when("step", {
        is: 6,
        then: Yup.string().required("Required"),
      }),
      einPostal_code: Yup.string().when("step", {
        is: 6,
        then: Yup.string().required("Required"),
      }),
      einState: Yup.object().when("step", {
        is: 6,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),
      einNumber: Yup.string().when("step", {
        is: 6,
        then: Yup.string().when("foreignIndividual", {
          is: false,
          then: Yup.string().required("Required").min(10, "9 digits Required"),
        }),
      }),
      // step -9

      // businessLicenseStreetAddress: Yup.string().when("step", {
      //   is: 9,
      //   then: Yup.string().when("businessLicense", {
      //     is: true,
      //     then: Yup.string().required("Required"),
      //   }),
      // }),
      // businessLicenseAddress: Yup.string().when("step", {
      //   is: 9,
      //   then: Yup.string().when("businessLicense", {
      //     is: true,
      //     then: Yup.string().required("Required"),
      //   }),
      // }),
      // businessLicenseCity: Yup.string().when("step", {
      //   is: 9,
      //   then: Yup.string().when("businessLicense", {
      //     is: true,
      //     then: Yup.string().required("Required"),
      //   }),
      // }),

      // businessLicensePostal_code: Yup.string().when("step", {
      //   is: 9,
      //   then: Yup.string().when("businessLicense", {
      //     is: true,
      //     then: Yup.string().required("Required").max(5, "Max five characters"),
      //   }),
      // }),
      // businessLicenseState: Yup.object().when("step", {
      //   is: 9,
      //   then: Yup.object().when("businessLicense", {
      //     is: true,
      //     then: Yup.object().shape({
      //       value: Yup.string().required("Required"),
      //     }),
      //   }),
      // }),
    }),
    onSubmit: async (value, action) => {
      const data = [...inputFields]
      if (value.step === 4 && value.members.value !== 0) {
        // if (a !== undefined) toast.error("Please fill  members information")
        const a = data?.find((item) => {
          const err = ""
          if (item.addressCheckbox === null || item.addressCheckbox === true) {
            if (
              item?.firstName?.trim() === "" ||
              item?.lastName?.trim() === "" ||
              item?.state?.value?.trim() === "" ||
              item?.postal_code === "" ||
              item?.addressStreet?.trim() === "" ||
              item?.city?.trim() === ""
            ) {
              return toast.error("Please fill all Felids")
            }
          } else {
            if (
              item?.firstName?.trim() === "" ||
              item?.lastName?.trim() === ""
            ) {
              return toast.error("Please fill all Felids")
            }
          }
          return err
        })

        if (a !== undefined) return
      }
      // if (value.step === 4 && value.shareholderNumber.value !== 0) {
      //   // if (a !== undefined) toast.error("Please fill  members information")
      //   const a = data2?.find((item) => {
      //     const err = ""
      //     if (item.addressCheckbox === null || item.addressCheckbox === true) {
      //       if (
      //         (item?.shareholderSelect?.value === "other" &&
      //           item?.firstName?.trim() === "") ||
      //         (item?.shareholderSelect?.value === "other" &&
      //           item?.lastName?.trim() === "") ||
      //         item?.state?.value?.trim() === "" ||
      //         item?.postal_code === "" ||
      //
      //         item?.addressStreet?.trim() === "" ||
      //         item?.city?.trim() === "" ||
      //         item?.personShares?.trim() === "" ||
      //         item?.shareholderSelect?.value?.trim() === ""
      //       ) {
      //         return toast.error("Please fill all Felids")
      //       }
      //     } else {
      //       if (
      //         item?.firstName?.trim() === "" ||
      //         item?.lastName?.trim() === ""
      //       ) {
      //         return toast.error("Please fill all Felids")
      //       }
      //     }
      //     return err
      //   })

      //   if (a !== undefined) return
      // }

      if (value.step > 8) {
        return navigate(`${routes.amendmentServicePayment}`, {
          state: {
            business: true,
            service: {
              name: value?.entityState,
              serviceId: "63f67b6680b86ad51edbe32a",
              serviceDetails: {
                ...value,
                membersList: [...inputFields],
              },
            },
          },
        })
      }
      action.setValues({ ...value, step: Number(value?.step) + 1 })
      localStorage?.setItem(
        "formData",
        JSON.stringify({ ...value, step: Number(value?.step) + 1 })
      )
    },
  })

  console.log(formik2.errors, formik2?.values.step)
  const formik3 = useFormik({
    enableReinitialize: true,
    initialValues: {
      statePrice: localData?.statePrice || values.stateName?.price,
      packagePrice: localData?.packagePrice || values.packagePrice,
      packageName: localData?.packageName || values.packageName,
      step: localData?.step || 1,
      // step 1
      entityState: localData?.entityState?.value || values.entityType?.value,
      stateFormation: localData?.stateFormation?.value || values?.state?.value,
      package: localData?.package || values?.package,
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      streetAddress: localData?.streetAddress || "",
      address: localData?.address || "",
      city: localData?.city || "",
      state: {
        label: localData?.state?.value,
        value: localData?.state?.value,
      } || {
        label: "Select State",
        value: "",
      },
      postal_code: localData?.postal_code || "",

      // step 2
      companyName: localData?.companyName || "",
      designator: {
        label: localData?.designator?.label || "Select ",
        value: localData?.designator?.value || "",
      },
      members: {
        label: localData?.members?.value || "Select",
        value: localData?.members?.value || "",
      },
      businessPurpose: localData?.businessPurpose || "",
      businessIdea: {
        value: localData?.businessIdea?.value,
        label: localData?.businessIdea?.label,
      } || {
        value: "",
        label: "Select",
      },
      paidAddress: localData?.paidAddress || true,

      // step 5
      agentFree: localData?.agentFree || 0,
      activeTab: localData?.activeTab || 0,
      ...agentInfo,
      // step 6
      foreignIndividual: localData?.foreignIndividual || false,
      einFirstName: localData?.einFirstName || "",
      einLastName: localData?.einLastName || "",
      einNumberType: localData?.einNumberType || "SSN",
      einNumber: localData?.einNumber || "",
      einStreetAddress: localData?.einStreetAddress || "",
      einCity: localData?.einCity || "",
      einState: {
        label: localData?.einState?.value,
        value: localData?.einState?.value,
      } || {
        label: "Select State",
        value: "",
      },
      einPostal_code: localData?.einPostal_code || "",
      // step 7
      businessBanking: localData?.businessBanking || 0,
      // step 8
      taxConsultation: localData?.taxConsultation || true,
      // step 9
      businessLicense: localData?.businessLicense || true,
      businessLicenseStreetAddress:
        localData?.businessLicenseStreetAddress || "",
      businessLicenseAddress: localData?.businessLicenseAddress || "",
      businessLicenseCity: localData?.businessLicenseCity || "",
      businessLicenseState: {
        label: localData?.businessLicenseState?.value || "select",
        value: localData?.businessLicenseState?.value || "",
      },
      businessLicensePostal_code: localData?.businessLicensePostal_code || "",
    },
    validationSchema: Yup.object({
      // step 1
      firstName: Yup.string().when("step", {
        is: 1,
        then: Yup.string().required("Required"),
      }),
      lastName: Yup.string().when("step", {
        is: 1,
        then: Yup.string().required("Required"),
      }),
      email: Yup.string().when("step", {
        is: 1,
        then: Yup.string().required("Required"),
      }),
      phone: Yup.string().when("step", {
        is: 1,
        then: Yup.string().required("Required"),
      }),
      streetAddress: Yup.string().when("step", {
        is: 1,
        then: Yup.string().required("Required"),
      }),

      city: Yup.string().when("step", {
        is: 1,
        then: Yup.string().required("Required"),
      }),
      postal_code: Yup.string().when("step", {
        is: 1,
        then: Yup.string().required("Required"),
      }),
      state: Yup.object().when("step", {
        is: 1,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),
      // step 2
      companyName: Yup.string().when("step", {
        is: 2,
        then: Yup.string().required("Required"),
      }),
      members: Yup.object().when("step", {
        is: 2,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),
      businessIdea: Yup.object().when("step", {
        is: 2,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),
      businessPurpose: Yup.string().when("step", {
        is: 2,
        then: Yup.string()
          .required("Required")
          .min(200, "200 Characters Required"),
      }),

      designator: Yup.object().when("step", {
        is: 2,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),

      // step 4
      agentFirstName: Yup.string().when("step", {
        is: 4,
        then: Yup.string().when("agentFree", {
          is: 1,
          then: Yup.string().when("activeTab", {
            is: 0,
            then: Yup.string().required("Required"),
          }),
        }),
      }),
      agentLastName: Yup.string().when("step", {
        is: 4,
        then: Yup.string().when("agentFree", {
          is: 1,
          then: Yup.string().when("activeTab", {
            is: 0,
            then: Yup.string().required("Required"),
          }),
        }),
      }),
      // agentAddress: Yup.string().when("step", {
      //   is: 4,
      //   then: Yup.string().when("agentFree", {
      //     is: 1,
      //     then: Yup.string().required("Required"),
      //   }),
      // }),
      agentStreetAddress: Yup.string().when("step", {
        is: 4,
        then: Yup.string().when("agentFree", {
          is: 1,
          then: Yup.string().required("Required"),
        }),
      }),
      agentCity: Yup.string().when("step", {
        is: 4,
        then: Yup.string().when("agentFree", {
          is: 1,
          then: Yup.string().required("Required"),
        }),
      }),
      agentZipcode: Yup.string().when("step", {
        is: 4,
        then: Yup.string().when("agentFree", {
          is: 1,
          then: Yup.string().required("Required").max(5, "Max five characters"),
        }),
      }),

      agentCompanyName: Yup.string().when("step", {
        is: 4,
        then: Yup.string().when("agentFree", {
          is: 1,
          then: Yup.string().when("activeTab", {
            is: 1,
            then: Yup.string().required("Required"),
          }),
        }),
      }),
      agentState: Yup.object().when("step", {
        is: 4,
        then: Yup.object().when("agentFree", {
          is: 1,
          then: Yup.object().shape({
            value: Yup.string().required("Required"),
          }),
        }),
      }),
      // step 5
      einFirstName: Yup.string().when("step", {
        is: 5,
        then: Yup.string().required("Required"),
      }),
      einLastName: Yup.string().when("step", {
        is: 5,
        then: Yup.string().required("Required"),
      }),
      einStreetAddress: Yup.string().when("step", {
        is: 5,
        then: Yup.string().required("Required"),
      }),
      einCity: Yup.string().when("step", {
        is: 5,
        then: Yup.string().required("Required"),
      }),
      einPostal_code: Yup.string().when("step", {
        is: 5,
        then: Yup.string().required("Required"),
      }),
      einState: Yup.object().when("step", {
        is: 5,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),
      einNumber: Yup.string().when("step", {
        is: 5,
        then: Yup.string().when("foreignIndividual", {
          is: false,
          then: Yup.string().required("Required").min(10, "9 digits Required"),
        }),
      }),
      // step -8

      businessLicenseStreetAddress: Yup.string().when("step", {
        is: 8,
        then: Yup.string().when("businessLicense", {
          is: true,
          then: Yup.string().required("Required"),
        }),
      }),
      businessLicenseAddress: Yup.string().when("step", {
        is: 8,
        then: Yup.string().when("businessLicense", {
          is: true,
          then: Yup.string().required("Required"),
        }),
      }),
      businessLicenseCity: Yup.string().when("step", {
        is: 8,
        then: Yup.string().when("businessLicense", {
          is: true,
          then: Yup.string().required("Required"),
        }),
      }),

      businessLicensePostal_code: Yup.string().when("step", {
        is: 8,
        then: Yup.string().when("businessLicense", {
          is: true,
          then: Yup.string().required("Required").max(5, "Max five characters"),
        }),
      }),
      businessLicenseState: Yup.object().when("step", {
        is: 8,
        then: Yup.object().when("businessLicense", {
          is: true,
          then: Yup.object().shape({
            value: Yup.string().required("Required"),
          }),
        }),
      }),
    }),
    onSubmit: async (value, action) => {
      const data = [...inputFields]
      if (value.step === 3 && value.members.value !== 0) {
        // if (a !== undefined) toast.error("Please fill  members information")
        const a = data?.find((item) => {
          const err = ""
          if (item.activeTab === 0) {
            if (
              item?.firstName?.trim() === "" ||
              item?.lastName?.trim() === "" ||
              item?.state?.value?.trim() === "" ||
              item?.postal_code === "" ||
              item?.addressStreet?.trim() === "" ||
              item?.city?.trim() === "" ||
              item?.ownerShip.value?.trim() === ""
            ) {
              return toast.error("Please fill all Felids")
            }
          } else {
            if (
              item?.state?.value?.trim() === "" ||
              item?.companyName.trim() === "" ||
              item?.postal_code === "" ||
              item?.addressStreet?.trim() === "" ||
              item?.city?.trim() === "" ||
              item?.ownerShip.value?.trim() === ""
            ) {
              return toast.error("Please fill all Felids")
            }
          }
          return err
        })

        if (a !== undefined) return
      }
      // if (value.step === 4 && value.shareholderNumber.value !== 0) {
      //   // if (a !== undefined) toast.error("Please fill  members information")
      //   const a = data2?.find((item) => {
      //     const err = ""
      //     if (item.addressCheckbox === null || item.addressCheckbox === true) {
      //       if (
      //         (item?.shareholderSelect?.value === "other" &&
      //           item?.firstName?.trim() === "") ||
      //         (item?.shareholderSelect?.value === "other" &&
      //           item?.lastName?.trim() === "") ||
      //         item?.state?.value?.trim() === "" ||
      //         item?.postal_code === "" ||
      //
      //         item?.addressStreet?.trim() === "" ||
      //         item?.city?.trim() === "" ||
      //         item?.personShares?.trim() === "" ||
      //         item?.shareholderSelect?.value?.trim() === ""
      //       ) {
      //         return toast.error("Please fill all Felids")
      //       }
      //     } else {
      //       if (
      //         item?.firstName?.trim() === "" ||
      //         item?.lastName?.trim() === ""
      //       ) {
      //         return toast.error("Please fill all Felids")
      //       }
      //     }
      //     return err
      //   })

      //   if (a !== undefined) return
      // }

      if (value.step > 8) {
        return navigate(`${routes.amendmentServicePayment}`, {
          state: {
            business: true,
            service: {
              name: value?.entityState,
              serviceId: "63f67b6680b86ad51edbe32a",
              serviceDetails: {
                ...value,
                membersList: [...inputFields],
              },
            },
          },
        })
      }
      action.setValues({ ...value, step: Number(value?.step) + 1 })
      localStorage?.setItem(
        "formData",
        JSON.stringify({ ...value, step: Number(value?.step) + 1 })
      )
    },
  })

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [formik.values.step, formik2.values.step, formik3.values.step])
  // useEffect(() => {
  //   if (formik?.values) {
  //     console.log(formik.values)

  //   }
  // }, [formik.values])

  return (
    <div className={styles.detailStepperWrapper}>
      <Container>
        <Row>
          <Col lg={8}>
            {values.entityType?.value === "LLC" && (
              <>
                {formik3?.values?.step === 1 ? (
                  <StepOne formik={formik3} />
                ) : formik3?.values?.step === 2 ? (
                  <StepTwo formik={formik3} />
                ) : formik3?.values?.step === 3 ? (
                  <StepThree
                    formik={formik3}
                    inputFields={inputFields}
                    setInputFields={setInputFields}
                  />
                ) : formik3?.values?.step === 4 ? (
                  <StepFour formik={formik3} />
                ) : formik3?.values?.step === 5 ? (
                  <StepFive formik={formik3} />
                ) : formik3?.values?.step === 6 ? (
                  <StepSix formik={formik3} />
                ) : formik3?.values?.step === 7 ? (
                  <StepSeven formik={formik3} />
                ) : formik3?.values?.step === 8 ? (
                  <StepEight formik={formik3} />
                ) : formik3?.values?.step === 9 ? (
                  <StepNine formik={formik3} members={inputFields} llc />
                ) : formik3?.values?.step === 10 ? (
                  <StepTen formik={formik3} />
                ) : (
                  ""
                )}
              </>
            )}
            {(values.entityType?.value === "C-Corporation" ||
              values.entityType?.value === "S-Corporation") && (
              <>
                {formik?.values?.step === 1 ? (
                  <StepOne formik={formik} />
                ) : formik?.values?.step === 2 ? (
                  <StepTwo formik={formik} type="corporation" />
                ) : formik?.values?.step === 3 ? (
                  <CorporationStepThree
                    formik={formik}
                    inputFields={inputFields}
                    setInputFields={setInputFields}
                  />
                ) : formik?.values?.step === 4 ? (
                  <CorporationStepFour
                    formik={formik}
                    membersData={inputFields}
                    setMembersData={setInputFields}
                    inputFields={inputFields2}
                    setInputFields={setInputFields2}
                  />
                ) : formik?.values?.step === 5 ? (
                  <StepFour formik={formik} />
                ) : formik?.values?.step === 6 ? (
                  <StepFive formik={formik} />
                ) : formik?.values?.step === 7 ? (
                  <StepSix formik={formik} />
                ) : formik?.values?.step === 8 ? (
                  <StepSeven formik={formik} />
                ) : formik?.values?.step === 9 ? (
                  <StepEight formik={formik} />
                ) : formik?.values?.step === 10 ? (
                  <StepNine
                    formik={formik}
                    members={inputFields}
                    shareholders={inputFields2}
                  />
                ) : formik?.values?.step === 11 ? (
                  <StepTen formik={formik} />
                ) : (
                  ""
                )}
              </>
            )}
            {values.entityType?.value.toLowerCase() ===
              "Nonprofit".toLowerCase() && (
              <>
                {formik2?.values?.step === 1 ? (
                  <StepOne formik={formik2} />
                ) : formik2?.values?.step === 2 ? (
                  <ProfitStepTwo formik={formik2} />
                ) : formik2?.values?.step === 3 ? (
                  <StepTwo formik={formik2} type="non-profit" />
                ) : formik2?.values?.step === 4 ? (
                  <CorporationStepThree
                    formik={formik2}
                    inputFields={inputFields}
                    setInputFields={setInputFields}
                  />
                ) : formik2?.values?.step === 5 ? (
                  <StepFour formik={formik2} />
                ) : formik2?.values?.step === 6 ? (
                  <StepFive formik={formik2} />
                ) : formik2?.values?.step === 7 ? (
                  <StepSix formik={formik2} />
                ) : formik2?.values?.step === 8 ? (
                  <StepSeven formik={formik2} />
                ) : formik2?.values?.step === 9 ? (
                  <StepNine formik={formik2} members={inputFields} />
                ) : formik2?.values?.step === 10 ? (
                  <StepTen formik={formik2} />
                ) : (
                  ""
                )}
              </>
            )}
            {values?.entityType?.value.toLowerCase() ===
            "NonProfit".toLowerCase() ? (
              <>
                <div className={styles.stepperBtnsWrapper}>
                  <Button
                    className={styles.stepperBackBtn}
                    onClick={() =>
                      formik2.setValues({
                        ...formik2.values,
                        step: Number(formik2.values?.step) - 1,
                      })
                    }
                    // disabled={step <= 1}
                  >
                    <BsArrowLeftShort className={styles.icon} />
                    Back
                  </Button>
                  <Button
                    // onClick={step <= 10 ? () => setStep(step + 1) : setStep(1)}
                    disabled={Object.keys(formik2.errors).length !== 0}
                    onClick={() => formik2.handleSubmit()}
                    className={styles.stepperNextBtn}
                  >
                    {formik2?.values?.step === 10 ? "Complete & Pay" : "Next"}
                    <BsArrowRightShort className={styles.icon} />
                  </Button>
                </div>
              </>
            ) : values?.entityType?.value === "LLC" ? (
              <>
                <div className={styles.stepperBtnsWrapper}>
                  <Button
                    className={styles.stepperBackBtn}
                    onClick={() =>
                      formik3.setValues({
                        ...formik3.values,
                        step: Number(formik3.values?.step) - 1,
                      })
                    }
                    // disabled={step <= 1}
                  >
                    <BsArrowLeftShort className={styles.icon} />
                    Back
                  </Button>
                  <Button
                    // onClick={step <= 10 ? () => setStep(step + 1) : setStep(1)}
                    disabled={Object.keys(formik3.errors).length !== 0}
                    onClick={() => formik3.handleSubmit()}
                    className={styles.stepperNextBtn}
                  >
                    {formik3?.values?.step === 10 ? "Complete & Pay" : "Next"}
                    <BsArrowRightShort className={styles.icon} />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className={styles.stepperBtnsWrapper}>
                  <Button
                    className={styles.stepperBackBtn}
                    onClick={() =>
                      formik.setValues({
                        ...formik.values,
                        step: Number(formik.values?.step) - 1,
                      })
                    }
                    // disabled={step <= 1}
                  >
                    <BsArrowLeftShort className={styles.icon} />
                    Back
                  </Button>
                  <Button
                    // onClick={step <= 10 ? () => setStep(step + 1) : setStep(1)}
                    disabled={Object.keys(formik.errors).length !== 0}
                    onClick={() => formik.handleSubmit()}
                    className={styles.stepperNextBtn}
                  >
                    {formik?.values?.step === 10 ? "Complete & Pay" : "Next"}
                    <BsArrowRightShort className={styles.icon} />
                  </Button>
                </div>
              </>
            )}
          </Col>
          <Col lg={4}>
            <PriceSection business />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default DetailStepperForm
