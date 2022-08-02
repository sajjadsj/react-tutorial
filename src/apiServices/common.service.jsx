
 let CryptoJS = require('crypto-js');

export const getApiHeader = async (method, isFile, data) => {
    const userObject = JSON.parse(localStorage.getItem('userObject'));
  
    const reservedToken = userObject
      ? parseInt(atob(userObject.reservedToken))
      : null;
    const tempUserToken = localStorage.getItem('userToken');
  
    const bytes = tempUserToken
      ? CryptoJS.AES.decrypt(tempUserToken, 'pineLogistic')
      : null;
    const userToken = bytes ? bytes.toString(CryptoJS.enc.Utf8) : null;
    let headers = {
      headers: { Authorization: `Bearer ${userToken}`, 'x-role': reservedToken },
    };
  
    if (isFile) {
      headers = { headers: { Authorization: `Bearer ${userToken}` } };
    }
    // if (isFile) {
    //     headers = { headers: { "x-access-token": userToken, "Content-Type": "multipart/form-data" } };
    // }
    if (method) {
      headers = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
          'x-role': reservedToken,
        },
      };
    }
    if (data) {
      headers = {
        data: data,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
          'x-role': reservedToken,
        },
      };
    }
    console.log("header ", headers)
    return headers;
  };