import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { withTranslation } from 'react-i18next';
import { forgetPasswordRequest } from '../services/functionsImportHelper';
import UtilityHelper from '../services/UtilityHelper';
import Spin from '../htmlElemants/Spin';
import Applogo from '../images/logo.png';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ForgotPassword extends Component {
  constructor(params) {
    super(params);

    this.state = {
      email: '',
      error: '',
      waiting: false,
    };
  }

  componentDidMount() {
    let emailInput = document.getElementById('emailInput');
    if (emailInput) {
      emailInput.addEventListener('keydown', this.handleEnterKey);
    }
  }

  componentWillUnmount() {
    // Reset state
    this.setState = {
      email: '',
      error: '',
      waiting: false,
    };

    let emailInput = document.getElementById('emailInput');
    if (emailInput) {
      emailInput.removeEventListener('keydown', this.handleEnterKey);
    }
  }

  handleEnterKey = (event) => {
    if (event.keyCode === 13) {
      this.sumbitFunction('forgetEmailSubmit');
    }
  };

  handleChange = (value) => {
    if (value.match(UtilityHelper.getInstance().emailFormat())) {
      this.setState({ error: '' });
    }

    this.setState({ email: value });
  };

  sumbitItem = (type) => {
    if (this.state.email.length === 0) {
      this.setState({ error: 'login.emptyEmailError' });
      return;
    }

    if (!this.state.email.match(UtilityHelper.getInstance().emailFormat())) {
      this.setState({ error: 'login.invalidEmailError' });
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

  sumbitFunction = async () => {
    if (this.state.email.length === 0) {
      this.setState({ error: 'login.emptyEmailError' });
      return;
    }

    if (!this.state.email.match(UtilityHelper.getInstance().emailFormat())) {
      this.setState({ error: 'login.invalidEmailError' });
      return;
    }

    this.setState({ waiting: true, error: '' });

    var body = { email: this.state.email };

    await this.callService(forgetPasswordRequest, body);
    this.setState({ waiting: false, email: '' });
    this.props.handelLoginStates('showLogin');

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
                <h3 className="account-title">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="backArrow"
                    id="showLogin"
                    onClick={() => this.props.handelLoginStates('showLogin')}
                  />
                  {t('login.loginHead')}
                </h3>
                <p className="account-subtitle"></p>

                <div className="form-group marginBottom10">
                  <div className="row">
                    <div className="col">
                      <label>{t('login.forgotEmail')}</label>
                    </div>
                  </div>
                  <input
                    id="emailInput"
                    type="email"
                    onBlur={(e) => this.sumbitItem('email')}
                    placeholder={t('login.email')}
                    className={
                      this.state.error.length > 0
                        ? 'errorText form-control'
                        : 'form-control'
                    }
                    onChange={(e) => this.handleChange(e.target.value)}
                    value={this.state.email}
                  />
                </div>

                <div
                  className="passErrDiv marginBottom15"
                  style={{ height: '20px' }}
                >
                  <div
                    style={{
                      display: this.state.error.length > 0 ? 'block' : 'none',
                    }}
                    className="passErr"
                  >
                    {t(this.state.error)}
                  </div>
                </div>
                <div className="text-center">
                  <button
                    onClick={() => this.sumbitFunction('forgetEmailSubmit')}
                    className="btn button"
                  >
                    {t('login.forgotSubmit')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Spin waiting={this.state.waiting} />
      </div>
    );
    return UI;
  };

  render() {
    return <React.Fragment>{this.arrangeUI()}</React.Fragment>;
  }
}

export default withTranslation()(ForgotPassword);