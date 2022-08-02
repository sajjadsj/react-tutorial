
export const helperLogOut = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userObject');
    localStorage.removeItem('countries');
    localStorage.removeItem('prerequisites');
    localStorage.removeItem('profile');
    localStorage.removeItem('allStations');
    localStorage.removeItem('i18nextLng');
    window.location.href = '/';
  };

export const getErrorText = async (t, error) => {

    const errorResponse = (error.response && error.response.data) ?? {};
    console.log("errorResponse ", errorResponse);
    if (!errorResponse.msgKey) {
      errorResponse.msgKey = 'serverError';
    }
  
    if (errorResponse.statusCode === 401) {
      helperLogOut();
    }
  
    let errorText = errorResponse.msgKey;
  
    if (errorResponse.row && errorResponse.sheetName) {
      errorText = {
        msgKey: errorResponse.msgKey,
        sheetName: errorResponse.sheetName,
        row: errorResponse.row,
      }
    }
    return {
      showPopup: true,
      popupText: errorText,
      waiting: false
    }
  }

  export const isErrorText = (value) => {
    let errorsList = [
      'serverError',
      'fieldEmailError',
      'cityAlreadyExist',
      'merchantEndTimeError',
      'customerEndTimeError',
      'emailAlreadyExist',
      'noTokenFound',
      'unableToPerformOperation',
      'ER_ROW_IS_REFERENCED_2',
      'someThingWentWrong',
      'invalidJobID',
      'notAllowed',
      'fieldRequiredError',
      'connectionError',
      'unableToUploadFile',
      'invalidOrderNumber',
      'invalidShipper',
      'invalidPaymentType',
      'invalidCurrency',
      'invalidOrderType',
      'invalidShipmentOption',
      'invalidEstimatedDeliveryDate',
      'invalidShipmentValue',
      'invalidPickupCountry',
      'invalidPickupCity',
      'invalidPickupArea',
      'invalidPickupDoorNumber',
      'invalidPickupStreetName',
      'invalidPickupContactNumber',
      'invalidDeliveryCountry',
      'invalidDeliveryCity',
      'invalidDeliveryArea',
      'invalidDeliveryDoorNumber',
      'invalidDeliveryStreetName',
      'invalidDeliveryContactNumber',
      'invalidAmountToCollect',
      'invalidPickupDoorNumberLength',
      'invalidDeliveryDoorNumberLength',
      'invalidCountryCallingCode',
      'invalidPickupStreetNameLength',
      'invalidDeliveryStreetNameLength',
      'invalidPickupNearestLandmarkLength',
      'invalidDeliveryNearestLandmarkLength',
      'invalidDate',
      'invalidPreferredTime',
      'invalidRoleID',
      'invalidStationID',
      'invalidCountryID',
      'invalidShipperID',
      'invalidCurrencyID',
      'invalidDriverTypeID',
      'userNotAllowed',
      'emailPasswordNotMatched',
      'invalidData',
      'hashNotMatched',
      'countryAlreadyExist',
      'stationAlreadyExist',
      'countryNotExist',
      'cityNotExist',
      'invalidShipmentsArray',
      'invalidDriver',
      'shipmentAssignmentNotAllowed',
      'invalidShipmentStatus',
    ];
    let isError = errorsList.indexOf(value) > -1 ? true : false;
    return isError;
  };