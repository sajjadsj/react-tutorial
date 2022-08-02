import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Applogo from '../images/logo.png';
import { withTranslation } from 'react-i18next';

class LoginForm extends Component {
  constructor(params) {
    super(params);

    this.state = {};
  }

  componentDidMount() {
    let passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
      passwordInput.addEventListener('keydown', this.handleEnterKey);
    }
  }

  componentWillUnmount() {
    let passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
      passwordInput.removeEventListener('keydown', this.handleEnterKey);
    }
  }

  handleEnterKey = (event) => {
    if (event.keyCode === 13) {
      this.props.sumbitFunction();
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
                <h3 className="account-title">{t('login.login')}</h3>
                <p className="account-subtitle">{t('login.dashboard')}</p>
                {/* Account Form */}

                <div className="form-group">
                  <label>{t('login.email')}</label>
                  <input
                    type="email"
                    tabIndex="1"
                    onBlur={(e) => this.props.sumbitItem('email')}
                    placeholder={t('login.email')}
                    className={
                      this.props.state.emailError.length > 0
                        ? 'errorText form-control'
                        : 'form-control'
                    }
                    onChange={(e) =>
                      this.props.handleChange(e.target.value, 'email')
                    }
                    value={this.props.state.email}
                  />
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label>{t('login.password')}</label>
                    </div>
                    <div className="col-auto">
                      <button
                        onClick={() =>
                          this.props.handelLoginStates('forgotPassword')
                        }
                        className="text-muted buttonf"
                      >
                        {t('login.forgot')}
                      </button>
                    </div>
                  </div>
                  <input
                    tabIndex="2"
                    type="password"
                    onBlur={(e) => this.props.sumbitItem('password')}
                    id="passwordInput"
                    onChange={(e) =>
                      this.props.handleChange(e.target.value, 'password')
                    }
                    value={this.props.state.password}
                    placeholder={t('login.loginPassword')}
                    className={
                      this.props.state.passwordError.length > 0
                        ? 'errorText form-control'
                        : 'form-control'
                    }
                  />
                </div>
                <div className="text-center">
                  <button
                    onClick={() => this.props.sumbitFunction()}
                    className="btn button"
                  >
                    {t('login.login')}
                  </button>
                </div>
                {/* /Account Form */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return UI;
  };

  render() {
    return <React.Fragment>{this.arrangeUI()}</React.Fragment>;
  }
}

export default withTranslation()(LoginForm);