export default {
  LIST_CHIP: [1, 5, 10, 25, 100, 500, 1000, 5000],
  API: {
    baseURL: 'https://colla-api.playtime.work/',
    CheckPhone: 'api/auth/check-phone',
    VerifyPhone: 'api/auth/verify-phone',
    CheckAuth: 'api/auth/me',
    UpdateProfile: 'api/auth/profile',
    GetListProduct: 'api/product',
    Useraddress: 'api/useraddress',
    Order: 'api/order',
    SignInPhone: 'api/auth/signin-by-phone',
    SignUp: 'api/auth/signup',
    SignIn: 'api/auth/signin',
    SendOtp: 'api/auth/send-otp',
    VerifyOtp: 'api/auth/verify-otp',
    Cart: 'api/cart',
    ForgotPassword: 'api/auth/forgot-password',
    ResetPassword: 'api/auth/reset-password',
    Point: 'api/point',
    ImportProduct: 'api/import/product',
    ImportCart: 'api/import/cart',
    ImportOrder: 'api/import/order',
  },
  RESPONSE_CODES: {
    SUCCESS: {
      SUCCESS: 200,
    },
    ERROR: {
      INTERNAL_SERVER: 500,
      NOT_FOUND: 404,
    },
  },
};
