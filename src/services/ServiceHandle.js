import {Const} from '../utils';
import {create} from 'apisauce';

const api = create({
  baseURL: Const.API.baseURL,
  timeout: 20000,
  headers: {
    'Content-Type': `application/json`,
  },
});

const apiUpload = create({
  baseURL: Const.API.baseURL,
  timeout: 20000,
  headers: {
    'content-type': `multipart/form-data`,
  },
});

const returnData = respone => {
  console.log('response =====>', respone);
  if (respone.status === Const.RESPONSE_CODES.SUCCESS.SUCCESS) {
    return {
      data: respone.data,
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: respone.data.message,
    };
  }
};

const setToken = token => {
  api.setHeader('Authorization', `Bearer ${token}`);
  apiUpload.setHeader('Authorization', `Bearer ${token}`);
};

const get = async (url, params) => {
  const respone = await api.get(url, params);
  return returnData(respone);
};
const post = async (url, payload) => {
  const respone = await api.post(url, payload);
  return returnData(respone);
};
const put = async (url, payload) => {
  const respone = await api.put(url, payload);
  return returnData(respone);
};
const deleteApi = async (url, payload) => {
  const respone = await api.delete(url, payload);
  return returnData(respone);
};
const uploadImage = async (url, payload) => {
  const respone = await apiUpload.post(url, payload);
  return returnData(respone);
};
// uploadImage = async file => {
//   const response = await this.apiUpload.post("upload/", file);
//   // logic handle response here
//   return response.data;
// };

export {get, post, put, deleteApi, setToken, uploadImage};
