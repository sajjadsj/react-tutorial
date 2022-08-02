import { getApiHeader } from './common.service';

const axiosInstance = require('axios').default;
// Set API path
const apiPath = process.env.REACT_APP_API_ENDPOINT;
const axios = axiosInstance.create({
  baseURL: apiPath,
});

export const login = async (body) => {
  let headers = await getApiHeader();
  return (await axios.post('/auth/login', body, headers)).data;
};

export const forgetPasswordRequest = async (body) => {
  let headers = await getApiHeader();
  return (await axios.post('/auth/forgetPasswordRequest', body, headers)).data;
};

export const forgetPasswordApi = async (body) => {
  console.log("body ", body);
  let headers = await getApiHeader();
  return (await axios.post('/auth/forgetPassword', body, headers)).data;
};