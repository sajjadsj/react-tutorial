import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Navigate as Redirect } from 'react-router-dom';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isErrorText } from '../services/HelperServices';

class Popup extends Component {
  constructor(params) {
    super(params);
    this.state = {
      isError: false,
    };
  }

  arrangeUI = () => {
    const { t } = this.props;

    if (typeof this.props.state.popupText === 'object') {
      let errorDefination = t('popup.' + this.props.state.popupText.msgKey);
      let sheetName =
        t('popup.sheetName') + ': ' + this.props.state.popupText.sheetName;
      let row = t('popup.row') + ': ' + this.props.state.popupText.row;
      let text = errorDefination + ', ' + sheetName + ', ' + row;

      let UI = (
        <React.Fragment>
          <div className="errorAlert cusomtModel">
            <div style={{ float: 'left', display: 'contents' }}>{text}</div>
            <div style={{ float: 'right', margin: '5px 0 0 10px' }}>
              <FontAwesomeIcon icon={faTimes} className="marginRight3" />
            </div>
          </div>
        </React.Fragment>
      );
      return UI;
    } else if (this.props.state.popupText === 'needAttention') {
      let UI = (
        <React.Fragment>
          <div
            className="modal custom-modal fade show"
            id="delete_employee"
            role="dialog"
            aria-modal="true"
            style={{ paddingRight: '17px', display: 'block' }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="form-header">
                    <h3>{t('popup.needAttention')}</h3>
                    <p>{this.props.state.needAttentionMsg}</p>
                    <p>{t('popup.pleaseContact')}</p>
                  </div>
                  <div className="modal-btn delete-action">
                    <div className="row">
                      <div className="col-6">
                        <button
                          onClick={() =>
                            this.props.needAttentionFuntion('acknowledged')
                          }
                          className="btn btn-primary continue-btn"
                          style={{ float: 'right', width: '170px' }}
                        >
                          {t('popup.acknowledged')}
                        </button>
                      </div>
                      <div className="col-6">
                        <button
                          onClick={() => {}}
                          className="btn btn-primary cancel-btn"
                          style={{ width: '170px' }}
                        >
                          {t('confirm.cancel')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
      return UI;
    } else {
      let isError = false;
      if (isErrorText(this.props.state.popupText)) isError = true;
      else isError = false;

      let languageText = this.props.state.popupText
        ? t('popup.' + this.props.state.popupText)
        : '';

      let UI = (
        <React.Fragment>
          <div className={isError ? 'errorAlert cusomtModel' : 'cusomtModel'}>
            <div style={{ float: 'left', display: 'contents' }}>
              {languageText}
            </div>
            <div style={{ float: 'right', margin: '5px 0 0 10px' }}>
              <FontAwesomeIcon icon={faTimes} className="marginRight3" />
            </div>
          </div>
        </React.Fragment>
      );
      return UI;
    }
  };

  render() {
    if (this.state.authentication === 'logged') {
      return <Redirect to="/" />;
    } else {
      return <React.Fragment>{this.arrangeUI()}</React.Fragment>;
    }
  }
}

export default withTranslation()(Popup);