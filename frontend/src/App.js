import React, { useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUpPage from "./components/signup"
import Amendment from "./pages/services/amendment"
import ArticleOfAmendmentPage from "./pages/services/articleofamendment"
import AmendmentServicePayment from "./pages/services/amendmentservicepayment"
import RegisteredAgentPage from "./pages/services/registeredagent"
import VirtualAddress from "./pages/services/virtualaddress"
import EmployerIdentification from "./pages/services/employeridentification"
import CertificateOfGood from "./pages/services/certificateofgoodstanding"
import ForeignQualification from "./pages/services/foreignqualification"
import ChangeRegisteredAgent from "./pages/services/changeregisteredagent"
import BusinessLicense from "./pages/services/businesslicense"
import DoingBusiness from "./pages/services/doingbusiness"
import StartBusiness from "./pages/startBusiness/StartBusiness"
import ServiceForm from "./pages/services/ServiceForm"
import UserOrder from "./components/user/MyOrders/UserOrder"
import RouteNotFound from "./pages/404Page"
import Hoc from "./components/layout/Hoc"
import AdminPanelLayout from "./components/layout/AdminPanel"
import { getServices, stateGet } from "./_features/commonSlice"
import { routes } from "./routes"
import BusinessDetails from "./pages/startBusiness/businessDetails"
import ForgetPassword from "./pages/ForgetPassword"
import ResetPassword from "./pages/ResetPassword"
import Users from "./pages/admin/Users"
import Orders from "./pages/admin/Orders"
import Services from "./pages/admin/services"
import Order from "./pages/admin/SingleOrder"
import User from "./pages/admin/SingleUser"
import ScrollToTop from "./hooks/ScrollTop"
import MyProfile from "./pages/user/MyProfile"
import MyOrders from "./pages/user/MyOrders"
import CompanyDissolution from "./pages/services/companyDissolution"
import Trademark from "./pages/services/trademark"
import Reinstatement from "./pages/services/reinstatement"
import AnnualReport from "./pages/services/annualReport"
import { checkToken } from "./utils/helperApis"
import ViewOrder from "./components/admin/viewOrder/ViewOrder"
import AdminViewOrder from "./components/admin/adminViewOrder/ViewOrder"
import Header from "./components/layout/Header"

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state?.auth)
  useEffect(() => {
    dispatch(stateGet())
    dispatch(getServices())
  }, [dispatch])
  useEffect(() => {
    if (user?.userData) {
      checkToken()
    }
  }, [user])
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path={routes.home}
          element={
            <Hoc>
              <Home />
            </Hoc>
          }
        />
        <Route path={routes.login} element={<Login />} index />
        <Route path={routes.register} element={<SignUpPage />} />
        <Route path={routes.forgetPass} element={<ForgetPassword />} />
        <Route path={`${routes.resetPass}:token`} element={<ResetPassword />} />
        <Route
          path={routes.amendment}
          element={
            <Hoc>
              <Amendment />
            </Hoc>
          }
        />
        <Route
          path={routes.companyNameChange}
          element={
            <Hoc>
              <Amendment />
            </Hoc>
          }
        />
        <Route
          path={routes.article0fAmendment}
          element={
            <Hoc>
              <ArticleOfAmendmentPage />
            </Hoc>
          }
        />
        <Route
          path={routes.amendmentServicePayment}
          element={
            <Hoc>
              <AmendmentServicePayment />
            </Hoc>
          }
        />
        <Route
          path={routes.registeredAgent}
          element={
            <Hoc>
              <RegisteredAgentPage />
            </Hoc>
          }
        />
        <Route
          path={routes.virtualAddress}
          element={
            <Hoc>
              <VirtualAddress />
            </Hoc>
          }
        />
        <Route
          path={routes.employerIdentification}
          element={
            <Hoc>
              <EmployerIdentification />
            </Hoc>
          }
        />
        <Route
          path={routes.certificateOfGoodStanding}
          element={
            <Hoc>
              <CertificateOfGood />
            </Hoc>
          }
        />
        <Route
          path={routes.foreignQualification}
          element={
            <Hoc>
              <ForeignQualification />
            </Hoc>
          }
        />
        <Route
          path={routes.changeRegisteredAgent}
          element={
            <Hoc>
              <ChangeRegisteredAgent />
            </Hoc>
          }
        />
        <Route
          path={routes.businessLicense}
          element={
            <Hoc>
              <BusinessLicense />
            </Hoc>
          }
        />
        {/*  service form */}

        <Route
          path={`${routes.ServiceForm}:id`}
          element={
            <Hoc>
              <ServiceForm />
            </Hoc>
          }
        />

        <Route
          path={routes.servicePayment}
          element={
            <Hoc>
              <AmendmentServicePayment />
            </Hoc>
          }
        />
        {/*  */}
        <Route
          path={routes.doingBusiness}
          element={
            <Hoc>
              <DoingBusiness />
            </Hoc>
          }
        />
        <Route
          path={routes.formOrderNow}
          element={
            <Hoc>
              <StartBusiness />
            </Hoc>
          }
        />
        <Route
          path={routes.businessDetails}
          element={
            <Hoc>
              <BusinessDetails />
            </Hoc>
          }
        />
        <Route
          path={routes.adminUsers}
          element={
            <AdminPanelLayout>
              <Users />
            </AdminPanelLayout>
          }
        />
        <Route
          path={routes.adminOrders}
          element={
            <AdminPanelLayout>
              <Orders />
            </AdminPanelLayout>
          }
        />
        <Route path={`${routes.userOrders}/:id`} element={<ViewOrder />} />
        <Route
          path={routes.adminServices}
          element={
            <AdminPanelLayout>
              <Services />
            </AdminPanelLayout>
          }
        />
        <Route
          path={`${routes.adminUser}:id`}
          element={
            <AdminPanelLayout>
              <User />
            </AdminPanelLayout>
          }
        />
        <Route
          path={`${routes.adminOrder}:id`}
          element={
            <AdminPanelLayout>
              <AdminViewOrder />
            </AdminPanelLayout>
          }
        />
        <Route
          path={`${routes.myOrder}:id`}
          element={
            <Hoc>
              <UserOrder />
            </Hoc>
          }
        />
        <Route
          path={routes.myProfile}
          element={
            <Hoc>
              <MyProfile />
            </Hoc>
          }
        />
        <Route
          path={routes.myOrders}
          element={
            <Hoc>
              <MyOrders />
            </Hoc>
          }
        />
        <Route
          path={routes.companyDissolution}
          element={
            <Hoc>
              <CompanyDissolution />
            </Hoc>
          }
        />
        <Route
          path={routes.trademark}
          element={
            <Hoc>
              <Trademark />
            </Hoc>
          }
        />
        <Route
          path={routes.reinstatement}
          element={
            <Hoc>
              <Reinstatement />
            </Hoc>
          }
        />
        <Route
          path={routes.annualReport}
          element={
            <Hoc>
              <AnnualReport />
            </Hoc>
          }
        />
        <Route path="/*" element={<Navigate to={routes.login} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
