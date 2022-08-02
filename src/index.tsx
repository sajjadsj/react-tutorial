import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';

import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';

import Login from "./pages/login";

// ToDo:Frontend
//import 'font-awesome/css/font-awesome.min.css';

class App extends Component {
  constructor(params:any) {
    super(params);
    this.state = {
      popupText: 'emailNotExist',
    };
  }

  render() {
    return (
      <Router>
        <Route path="/" element={<Login />} />
        {/* <Route path="/resetPassword/:value" element={<ResetPassword />} /> */}

        {/* <Route
          path={'/dashboard/:fromDate?/:toDate?/:timeType?/:week?'}
          component={Graphs}
        /> */}

      </Router>
    );
  }
}

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>,
  document.getElementById('root'),
);