import { format } from 'date-fns';

class UtilityHelper {
  instance = null;

  static getInstance = () => {
    if (!this.instance) {
      this.instance = new UtilityHelper();
    }

    return this.instance;
  };

  successStatusCode = () => {
    return 200;
  };

  failureStatusCode = () => {
    return 404;
  };

  emailFormat = () => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  };

  phoneFormat = (value) => {
    return /^[0-9]{10,12}$/.test(value);
  };

  conuntryCodeFormat = (value) => {
    if (value)
      return value.match(/^(\+?\d{1,3}|\d{1,4})$/);
  };

  getDate = () => {
    return new Date(new Date().toString().split('GMT')[0] + ' UTC')
      .toISOString()
      .split('.')[0];
  };

  getDateFromSeconds = (seconds) => {
    var time = new Date(0);
    time.setSeconds(seconds);

    return time;
  };

  getStringDateFromSeconds = (seconds) => {
    var time = new Date(0);
    time.setSeconds(seconds);

    var dateString = format(time, 'MMMM dd yyyy');
    return dateString;
  };

  amountCheck = (value, digits) => {
    if (digits === 4) {
      return /^\d{0,4}(\.\d{0,2})?$/.test(value);
    } else {
      return /^\d{0,3}(\.\d{0,2})?$/.test(value);
    }
  };

  convertToTwoDigits = (value) => {
    if (value && value.toString().length < 2) {
      return '0' + value;
    }

    return value;
  };

  getDateTimeInSeconds = (dateInString) => {
    var date = new Date(dateInString);

    var seconds = Math.ceil(date.getTime() / 1000);
    return seconds;
  };

  getCurrentDateTimeInSeconds = () => {
    var date = new Date();

    var seconds = Math.ceil(date.getTime() / 1000);
    return seconds;
  };
}

export default UtilityHelper;