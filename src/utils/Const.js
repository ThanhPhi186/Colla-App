export default {
  LIST_CHIP: [1, 5, 10, 25, 100, 500, 1000, 5000],
  API: {
    baseURL: 'http://202.92.6.90:6739/',
    CheckPhone: 'api/auth/check-phone',
    VerifyPhone: 'api/auth/verify-phone',
    CheckAuth: 'api/auth/me',
    UpdateProfile: 'api/auth/profile',
    GetListProduct: 'api/product',
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
