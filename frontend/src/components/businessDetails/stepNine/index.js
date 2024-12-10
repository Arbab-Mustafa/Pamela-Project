import React from "react"
import DetailCard from "../common/DetailCard"
import styles from "./stepNine.module.scss"

const StepNine = ({ formik, members, shareholders, llc }) => {
  return (
    <div className={styles.stepWrapper}>
      <DetailCard title="Formation Info">
        <h6 className={`mb-1 ${styles.detailCardTitle}`}>State of Formation</h6>
        <p className={styles.detailCardDesciption}>
          {formik.values?.stateFormation}
        </p>
        <h6 className={`mb-1 ${styles.detailCardTitle}`}>Entity Type</h6>
        <p className={styles.detailCardDesciption}>
          {formik.values?.entityState}
        </p>
      </DetailCard>
      <DetailCard title="Contact Info">
        <p className={styles.detailCardDesciption}>
          <b>Name:</b>
          {formik.values?.firstName} {formik?.values?.lastName}
        </p>
        <p className={styles.detailCardDesciption}>
          <b>Address:</b>
          {formik?.values?.streetAddress}, {formik?.values?.address},{" "}
          {formik?.values?.city}, {formik.values?.state?.label}{" "}
          {formik?.values?.postal_code}
        </p>
        <p className={styles.detailCardDesciption}>
          <b>Phone:</b>
          {formik?.values?.phone}
        </p>
        <p className={styles.detailCardDesciption}>
          <b>Email:</b>
          {formik?.values?.email}
        </p>
      </DetailCard>
      <DetailCard title="Agent Info">
        {formik.values?.agentFree === 0 ? (
          <p className={styles.detailCardDesciption}>
            You have selected Filthy Rich Idea to provide you with a Registered Agent
            <br />
            <b>First Year Free</b>
          </p>
        ) : (
          <>
            <p className={styles.detailCardDesciption}>
              <b>Agent Name/Company </b>
              {formik?.values?.agentFirstName
                ? `${formik?.values?.agentFirstName} ${formik?.values?.agentLastName}`
                : `${formik?.values?.agentCompanyName}`}
            </p>
            <p className={styles.detailCardDesciption}>
              <b>Agent Street Address </b>
              {formik.values.agentStreetAddress}
            </p>
            <p className={styles.detailCardDesciption}>
              <b>Address (Cont) </b>
              {formik.values.agentAddress}
            </p>
            <p className={styles.detailCardDesciption}>
              <b>City </b>
              {formik.values.agentCity}
            </p>
            <p className={styles.detailCardDesciption}>
              <b>State </b>
              {formik.values.agentState?.label}
            </p>
            <p className={styles.detailCardDesciption}>
              <b>Zip Code</b>
              {formik.values.agentZipcode}
            </p>
          </>
        )}
      </DetailCard>
      <DetailCard title="Company Info">
        <div className="mb-3">
          <h6 className={`mb-2 ${styles.detailCardTitle}`}>Company Name</h6>
          <p className={styles.detailCardDesciption}>
            {formik.values?.companyName} {formik.values?.designator?.value}
          </p>
        </div>
        <div className="mb-3">
          <h6 className={`mb-2 ${styles.detailCardTitle}`}>Business Purpose</h6>
          <p
            className={styles.detailCardDesciption}
            style={{ wordWrap: "break-word" }}
          >
            {formik.values?.businessPurpose}
          </p>
        </div>
        <div className="mb-3">
          <h6 className={`mb-2 ${styles.detailCardTitle}`}>Business Idea</h6>
          <p
            className={styles.detailCardDesciption}
            style={{ wordWrap: "break-word" }}
          >
            {formik.values?.businessIdea?.value}
          </p>
        </div>
        {/* <div className="mb-3">
          <h6 className={`mb-1 ${styles.detailCardTitle}`}>NAICS SUBCODE</h6>
          <p className={styles.detailCardDesciption}>
            Custom Computer Programming Services (541511)
          </p>
        </div> */}
      </DetailCard>
      {!llc
        ? members?.length !== 0 && (
            <DetailCard title="Member Info">
              {members?.length !== 0 &&
                members?.map((e, i) => (
                  <>
                    <div className="d-flex mb-2">
                      <div className={styles.memberNo}>{i + 1}</div>
                      <div>
                        <div className="mb-3 mt-1">
                          <h6 className={`mb-2 ${styles.detailCardTitle}`}>
                            Name
                          </h6>
                          <p className={styles.detailCardDesciption}>
                            {e?.firstName} {e?.lastName}
                          </p>
                        </div>
                        {e?.addressCheckbox === true ||
                        e?.addressCheckbox === null ? (
                          <div className="mb-3">
                            <h6 className={`mb-2 ${styles.detailCardTitle}`}>
                              Address
                            </h6>

                            <p className={styles.detailCardDesciption}>
                              {e?.addressStreet}, {e?.address}, {e?.city},{" "}
                              {e?.state?.value} {e?.postal_code}
                            </p>
                          </div>
                        ) : (
                          <>
                            <p className={styles.detailCardDesciption}>
                              You have selected for Filthy Rich Idea to provide you with
                              a company address.
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                ))}
            </DetailCard>
          )
        : members?.length !== 0 && (
            <DetailCard title="Member Info">
              {members?.length !== 0 &&
                members?.map((value, i) => (
                  <>
                    <div className="d-flex mb-2">
                      <div className={styles.memberNo}>{i + 1}</div>
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
                            {value?.addressStreet}, {value?.address},{" "}
                            {value?.city}, {value?.state?.value}{" "}
                            {value?.postal_code}
                          </span>
                        </p>
                      </div>
                    </div>
                  </>
                ))}
            </DetailCard>
          )}

      {!llc && shareholders?.length !== 0 && (
        <DetailCard title="Shareholders Info">
          {shareholders?.length !== 0 &&
            shareholders?.map((e, i) => (
              <>
                <div className="d-flex mb-2">
                  <div className={styles.memberNo}>{i + 1}</div>
                  <div>
                    <div className="mb-3 mt-1">
                      <h6 className={`mb-2 ${styles.detailCardTitle}`}>Name</h6>
                      <p className={styles.detailCardDesciption}>
                        {e?.shareholderSelect?.value === "other"
                          ? `${e?.firstName} ${e?.lastName}`
                          : e?.shareholderSelect?.value}
                      </p>
                    </div>
                    <div className="mb-3">
                      <h6 className={`mb-2 ${styles.detailCardTitle}`}>
                        Address
                      </h6>
                      <p className={styles.detailCardDesciption}>
                        {e?.addressStreet}, {e?.address}, {e?.city},{" "}
                        {e?.state?.value} {e?.postal_code}
                      </p>
                    </div>
                    <div>
                      <h6 className={`mb-2 ${styles.detailCardTitle}`}>
                        Ownership
                      </h6>
                      <p className={styles.detailCardDesciption}>
                        {e?.personShares}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </DetailCard>
      )}

      {formik?.values?.ceoSelect?.value !== "" ||
        (formik.values.ceo !== "" && (
          <DetailCard title="Officer Info">
            <div className="mb-3">
              <h6 className={`mb-2 ${styles.detailCardTitle}`}>
                President/CEO
              </h6>
              <p className={styles.detailCardDesciption}>
                {formik?.values?.ceoSelect?.value === "other"
                  ? formik.values.ceo
                  : formik?.values?.ceoSelect?.value}
              </p>
            </div>
            <div className="mb-3">
              <h6 className={`mb-2 ${styles.detailCardTitle}`}>Secretary</h6>
              <p className={styles.detailCardDesciption}>
                {" "}
                {formik?.values?.secretarySelect?.value === "other"
                  ? formik.values.secretary
                  : formik?.values?.secretarySelect?.value}
              </p>
            </div>
            <div className="mb-3">
              <h6 className={`mb-2 ${styles.detailCardTitle}`}>Treasurer</h6>
              <p className={styles.detailCardDesciption}>
                {formik?.values?.treasurerSelect?.value === "other"
                  ? formik.values.treasurer
                  : formik?.values?.treasurerSelect?.value}
              </p>
            </div>
            <div className="mb-3">
              <h6 className={`mb-2 ${styles.detailCardTitle}`}>
                Vice President
              </h6>
              <p className={styles.detailCardDesciption}>
                {formik?.values?.vicePresidentSelect?.value === "other"
                  ? formik.values.vicePresident
                  : formik?.values?.vicePresidentSelect?.value}
              </p>
            </div>
          </DetailCard>
        ))}

      <DetailCard title="EIN / Tax Info">
        <div className="mb-3">
          <h6 className={`mb-2 ${styles.detailCardTitle}`}>Name</h6>
          <p className={styles.detailCardDesciption}>
            {formik.values?.einFirstName} {formik.values?.einLastName}{" "}
          </p>
        </div>
        <div className="mb-3">
          <h6 className={`mb-2 ${styles.detailCardTitle}`}>Address</h6>
          <p className={styles.detailCardDesciption}>
            {formik.values?.einStreetAddress} {formik.values?.einCity},{" "}
            {formik.values?.einState?.value} {formik.values?.einPostal_code}
          </p>
        </div>
        {formik.values?.foreignIndividual !== true && (
          <>
            <div className="mb-3">
              <h6 className={`mb-2 ${styles.detailCardTitle}`}>
                {formik.values?.einNumberType}
              </h6>
              <p className={styles.detailCardDesciption}>
                {formik.values?.einNumber}
              </p>
            </div>
            <div className="mb-3">
              <p className={styles.detailCardDesciption}>
                This is a single member LLC (One owner only)
              </p>
            </div>
          </>
        )}
      </DetailCard>
    </div>
  )
}

export default StepNine
