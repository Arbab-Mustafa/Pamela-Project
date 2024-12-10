// ERROR MESSAGES
const ERROR_MESSAGE = {
  SERVICE_NAME_ALREADY_EXIST: "Service name already exist",
  SERVICE_NOT_EXIST: "Service does not not exist",
  SERVICES_NOT_EXIST: "Services doesn't exist",
  FUNDS_TRANSFER_FAIL: "Fund Transfer Failed",
  TRANSACTION_FAIL: "Fund Transfer Failed",
  REGISTRATION_FAIL: "Registration Failed",
  AUTH_FAIL: "Authentication Failed",
  LOGIN_FAIL: "Login Failed",
  INVALID_SECRET: "The secret is invalid",
  EMAIL_PASSWORD_INCORRECT: "Email or Password is Incorrect",
  REQUIRED_PARAMETERS_MISSING: "Required parameters are missing",
  INTERNAL_SERVER_ERROR: "Internal server error",
  REQUIRE_TOKEN: "No token available, authorization denied!",
  INVALID_TOKEN: "Invalid Token, authorization denied",
  INVALID_ID: "Invalid id provided",
  REQUEST_NOT_PROCESSED: "Request was not processed, try again later",
  INVALID_REQUEST: "Request not supported",
  PAYMENT_FAILED: "Payment failed",
}

// HTTP STATUS CODES
const HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOW: 405,
  CONFLICT: 409,
  INTERNAL_SERVER: 500,
}

const CHUNK_SIZE_OF_USERS = 5
const CURRENCY = "usd"

// if (process.env.ENV === "DEVELOPMENT") {
//   FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL_DEV
// } else {
//   FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL_LIVE
// }

const STRIPE_EVENTS = {
  checkoutSessionAsyncPaymentFailed: `checkout.session.async_payment_failed`,
  checkoutSessionAsyncPaymentSuccess: `checkout.session.async_payment_succeeded`,
  checkoutSessionExpired: `checkout.session.expired`,
  checkoutSessionCompleted: `checkout.session.completed`,
}

const websiteUrl =
  process.env.NODE_ENV === "develop"
    ? process.env.NODE_APP_LOCAL_SERVER_PATH
    : process.env.NODE_APP_LIVE_SERVER_PATH

module.exports = {
  ERROR_MESSAGE,
  HTTP_STATUS_CODE,
  CHUNK_SIZE_OF_USERS,
  CURRENCY,
  websiteUrl,
  // FRONTEND_BASE_URL,
  STRIPE_EVENTS,
}
