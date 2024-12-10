import React from "react"
import {
  NavDropdown,
  Button,
  Navbar,
  Nav,
  Container,
  Dropdown,
} from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { userLogOut } from "../../../_features/authSlice"
import styles from "./header.module.scss"
import logo from "../../../images/home/header/logo-filthy2.png"
import { resetCart } from "../../../_features/cartSlice"
import { routes } from "../../../routes"
import { selectService } from "../../../_features/commonSlice"
function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state?.auth)

  const headerService = useSelector((state) => state?.common?.services)
  const selectedService = useSelector((state) => state?.common?.selectedService)

  return (
    <Navbar bg="light" expand="lg" className={`${styles.nav} fixed-top`}>
      <Container>
        <NavLink to="https://filthyrichidea.com" className={styles.logo}>
          <Navbar.Brand>
            <img src={logo} alt="logo" style={{ maxWidth: "70px" }} />
          </Navbar.Brand>
        </NavLink>
        <div className="d-flex d-lg-none align-items-center">
          {auth?.userToken && (
            <div className={styles.profileDropDownWrapper}>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {auth.userData.firstName[0].toUpperCase() +
                    auth.userData.lastName[0].toUpperCase()}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Button}
                    onClick={() => {
                      dispatch(userLogOut())
                      dispatch(resetCart())
                    }}
                  >
                    My Profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Button}
                    onClick={() => {
                      dispatch(userLogOut())
                      dispatch(resetCart())
                    }}
                  >
                    My Orders
                  </Dropdown.Item>
                  {auth.userData.isAdmin && (
                    <Dropdown.Item as={Link} to={routes.adminUsers}>
                      Admin Panel
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item
                    as={Button}
                    onClick={() => {
                      dispatch(userLogOut())
                      dispatch(resetCart())
                    }}
                  >
                    Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className={styles.navbarcol}
          />
        </div>
        <Navbar.Collapse id="basic-navbar-nav" className="me-auto">
          <Nav className="me-auto">
            <NavDropdown title="Services" id="basic-nav-dropdown">
              {headerService?.map((value) => (
                <NavDropdown.Item
                  key={value?.title}
                  as={Link}
                  to={value?.slug}
                  onClick={() => dispatch(selectService(value))}
                >
                  {value?.title}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
          <div className={styles.btnblock}>
            <Button
              variant="outline-success"
              className={styles.btn}
              onClick={() => navigate(routes.formOrderNow)}
            >
              Incorporate Now
            </Button>
            {auth?.userToken ? (
              <div
                className={`d-none d-lg-block ${styles.profileDropDownWrapper}`}
              >
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {auth.userData.firstName[0].toUpperCase() +
                      auth.userData.lastName[0].toUpperCase()}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      as={Button}
                      onClick={() => {
                        navigate(routes.myProfile)
                      }}
                    >
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Button}
                      onClick={() => {
                        navigate(routes.myOrders)
                      }}
                    >
                      My Orders
                    </Dropdown.Item>
                    {auth.userData.isAdmin && (
                      <Dropdown.Item as={Link} to={routes.adminUsers}>
                        Admin Panel
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item
                      as={Button}
                      onClick={() => {
                        dispatch(userLogOut())
                        dispatch(resetCart())
                      }}
                    >
                      Log Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ) : (
              <NavLink to={routes.login} className={styles.login}>
                Login
              </NavLink>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
