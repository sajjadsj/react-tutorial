import React, { Component } from 'react';
import { Navigate as Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  forgetPasswordApi,
  getErrorText
} from '../services/functionsImportHelper';
import Spin from '../htmlElemants/Spin';
import Popup from '../popups/Popup';
import { withTranslation } from 'react-i18next';
import Applogo from '../images/logo.png';

class ResetPassword extends Component {
  constructor(params) {
    super(params);

    this.state = {
      forgotPassword: '',
      forgotRePassword: '',
      error: '',
      waiting: false,
      hash: this.props.location
        ? this.props.location.pathname.replace('/resetPassword/', '')
        : '',
      requestType: '',
      authentication: '',
    };
  }

  componentDidMount() {
    let forgotRePasswordInput = document.getElementById(
      'forgotRePasswordInput',
    );
    if (forgotRePasswordInput) {
      forgotRePasswordInput.addEventListener('keydown', this.handleEnterKey);
    }
  }

  componentWillUnmount() {
    // Reset state
    this.setState({
      forgotPassword: '',
      forgotRePassword: '',
      error: '',
      waiting: false,
      hash: this.props.location
        ? this.props.location.pathname.replace('/resetPassword/', '')
        : '',
      requestType: '',
    });

    let forgotRePasswordInput = document.getElementById(
      'forgotRePasswordInput',
    );
    if (forgotRePasswordInput) {
      forgotRePasswordInput.removeEventListener('keydown', this.handleEnterKey);
    }
  }

  handleEnterKey = (event) => {
    if (event.keyCode === 13) {
      this.sumbitFunction('resetPasswordSubmit');
    }
  };

  handleChange = (value, type) => {
    if (type === 'forgotPassword') {
      this.setState({ forgotPassword: value, error: '' });
    } else if (type === 'forgotRePassword') {
      this.setState({ forgotRePassword: value, error: '' });
    }
  };

  openCloseDialog = (type, item) => {
    if (type === 'showPopup') {
      this.setState({ showPopup: !this.state.showPopup });
    }
  }

  sumbitItem = (type) => {
    // Check if password length is >= 8
    if (this.state.forgotPassword.length < 8 && type === 'forgotPassword') {
      this.setState({ error: 'login.forgotPasswordError' });
      return;
    }

    // Check if both password matched
    if (
      this.state.forgotPassword !== this.state.forgotRePassword &&
      type === 'forgotRePassword'
    ) {
      this.setState({ error: 'login.forgotRePasswordError' });
      return;
    }
  };

  callService = async (service, param1, param2) => {
    try {
      let data = await service(param1, param2);
      return data
    } catch (error) {
      await this.handleError(error);
    }
  }

  handleError = async (error) => {
    const { t } = this.props;

    // { showPopup: true, popupText: errorText, waiting: false, }
    const errorObject = await getErrorText(t, error);
    this.setState(errorObject);
    throw error
  };

  sumbitFunction = async () => {
    // Check if password length is >= 8
    if (this.state.forgotPassword.length < 8) {
      this.setState({ error: 'login.forgotPasswordError' });
      return;
    }

    // Check if both password matched
    if (this.state.forgotPassword !== this.state.forgotRePassword) {
      this.setState({ error: 'login.forgotRePasswordError' });
      return;
    }

    this.setState({ waiting: true, error: '' });

    let body = { password: this.state.forgotRePassword };
    if (this.state.hash) {
      body.hash = this.state.hash;
    }

    // Check request type
    this.setState({ requestType: 'resetPassword' });
    // let request = '/auth/resetPassword';

    if (this.state.hash.length > 0) {
      // Reset request
      this.setState({ requestType: 'forgetPassword' });
      await this.callService(forgetPasswordApi, body);

      if (this.state.requestType === 'resetPassword')
        this.props.handelLoginStates('logged');
      else
        this.setState({ authentication: 'login' });
    }

  };
  arrangeUI = () => {
    const { t } = this.props;

    let UI = (
      <div className="main-wrapper">
        <Helmet>
          <title>{t('login.pineLogistic')}</title>
          <meta name="description" content="Login page" />
        </Helmet>
        <div className="account-content">
          <div className="container">
            {/* Account Logo */}
            <div className="account-logo">
              <button className="buttonf">
                <img src={Applogo} alt="Logo" />
              </button>
            </div>
            {/* /Account Logo */}
            <div className="account-box">
              <div className="account-wrapper">
                <h3 className="account-title marginBottom35">
                  {t('login.createPassword')}
                </h3>

                <div className="form-group">
                  <label>
                    {t('login.resetPassword')}{' '}
                    <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="password"
                    value={this.state.forgotPassword}
                    onBlur={() => this.sumbitItem('forgotPassword')}
                    onChange={(e) =>
                      this.handleChange(e.target.value, 'forgotPassword')
                    }
                    placeholder={t('login.min8Char')}
                    className={
                      this.state.error.length > 0
                        ? 'errorText form-control'
                        : 'form-control'
                    }
                  />
                </div>

                <div className="form-group marginBottom10">
                  <label>
                    {t('login.resetRePassword')}{' '}
                    <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    id="forgotRePasswordInput"
                    type="password"
                    value={this.state.forgotRePassword}
                    onBlur={() => this.sumbitItem('forgotRePassword')}
                    onChange={(e) =>
                      this.handleChange(e.target.value, 'forgotRePassword')
                    }
                    placeholder={''}
                    className={
                      this.state.error.length > 0
                        ? 'errorText form-control'
                        : 'form-control'
                    }
                  />
                </div>
                <div
                  className="passErrDiv marginBottom15"
                  style={{ height: '20px' }}
                >
                  <div
                    style={{
                      display: this.state.error !== '' ? 'block' : 'none',
                    }}
                    className="passErr"
                  >
                    {t(this.state.error)}
                  </div>
                </div>
                <button
                  onClick={() => this.sumbitFunction('resetPasswordSubmit')}
                  type="submit"
                  className="btn button"
                >
                  {t('login.resetSubmit')}
                </button>
              </div>
              <Spin waiting={this.state.waiting} />
            </div>
          </div>
        </div>
        <div
          onClick={() => this.openCloseDialog('showPopup')}
          className="modal"
          style={{ display: this.state.showPopup ? 'block' : 'none' }}
        >
          <Popup popupText={this.state.popupText} state={this.state} />
        </div>
      </div>
    );
    return UI;
  };

  render() {
    if (this.state.authentication.length > 0) {
      return <Redirect to="/" />;
    } else {
      return <React.Fragment>{this.arrangeUI()}</React.Fragment>;
    }
  }
}

export default withTranslation()(ResetPassword);