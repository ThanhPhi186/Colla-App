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
