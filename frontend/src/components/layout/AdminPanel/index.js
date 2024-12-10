import React, { useEffect, useState } from "react"
import { useNavigate, useLocation, Navigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Button, Dropdown } from "react-bootstrap"
import { FaBars } from "react-icons/fa"
import styles from "./styles.module.scss"
import { routes } from "../../../routes"
import logo1 from "../../../images/home/header/logo-filthy.png"
import { getUsers } from "../../../_features/usersSlice"
import { getOrders } from "../../../_features/ordersSlice"
import { userLogOut } from "../../../_features/authSlice"

const AdminPanelLayout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true)
  const userData = useSelector((state) => state?.auth?.userData)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUsers())
    dispatch(getOrders())
  }, [])
  useEffect(() => {
    function handleResize() {
      setShowSidebar(window.innerWidth > 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  if (!userData?.isAdmin) {
    return <Navigate to={routes.home} replace />
  }

  return (
    <div className={styles.adminLayoutWrapper}>
      {showSidebar && (
        <div className={styles.adminSidebar}>
          <div className={styles.sidebarLogo}>
            <div>
              <img src={logo1} alt="logo" style={{ maxWidth: "70px" }} />
            </div>
            <Button
              className={styles.sidebarToggler}
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <FaBars />
            </Button>
          </div>
          <div className={styles.sidebarLinksWrapper}>
            <Button
              onClick={() => navigate(routes.adminUsers)}
              className={
                pathname === routes.adminUsers ||
                pathname.slice(0, 12) === routes.adminUser
                  ? "active"
                  : ""
              }
            >
              Users
            </Button>
            <Button
              onClick={() => navigate(routes.adminOrders)}
              className={
                pathname === routes.adminOrders ||
                pathname.slice(0, 13) === routes.adminOrder
                  ? "active"
                  : ""
              }
            >
              Orders
            </Button>
          </div>
        </div>
      )}
      <div className={styles.adminContent}>
        <div className={styles.adminHeader}>
          {!showSidebar && (
            <div>
              <Button
                className={styles.sidebarToggler}
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <FaBars />
              </Button>
            </div>
          )}
          <div className={styles.profileDropDownWrapper}>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Admin
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={routes.home}>
                  Home
                </Dropdown.Item>
                <Dropdown.Item
                  as={Button}
                  onClick={() => dispatch(userLogOut())}
                >
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className={styles.adminChildrenWrapper}>{children}</div>
      </div>
    </div>
  )
}

export default AdminPanelLayout
