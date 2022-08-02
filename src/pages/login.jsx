/**
 * Signin Firebase
 */

 import React, { Component } from 'react';
 import { Navigate as Redirect } from 'react-router-dom';
 import { login } from '../apiServices/auth.service';
 import LoginForm from "./LoginForm";
 import Spin from "../htmlElemants/Spin";
 import ForgotPassword from "./ForgotPassword";
 import ResetPassword from "./ResetPassword";
 import UtilityHelper from '../services/UtilityHelper';
//  let CryptoJS = require('crypto-js');

 class Login extends Component {
   constructor(params) {
     super(params);

     this.state = {
       email: '',
       password: '',
       emailError: '',
       passwordError: '',
       waiting: false,
       authentication: 'login',
     };
   }

   componentDidMount() {
     // Check if token is valid
     if (
       localStorage.getItem('userToken') &&
       localStorage.getItem('userToken') !== undefined
     ) {
       this.setState({ authentication: 'logged' });
     }
   }

   componentWillUnmount() {
     // Reset state
     this.setState({
       email: '',
       password: '',
       emailError: '',
       passwordError: '',
       waiting: false,
       authentication: 'login',
     });
   }

   handleChange = (value, type) => {
     // Reset error state variable
     this.setState({ emailError: '', passwordError: '' });

     if (type === 'email') {
       // Update email state variable
       this.setState({ email: value });
     } else if (type === 'password') {
       // Update password state variable
       this.setState({ password: value });
     }
   };

   sumbitItem = (type) => { };

   sumbitFunction = async () => {
     // Check if email exist
     if (this.state.email.length === 0) {
       this.setState({ emailError: 'emptyEmailError' });
       return;
     }

     // Check if password exist
     if (this.state.password.length === 0) {
       this.setState({ passwordError: 'emptyPasswordError' });
       return;
     }

     // Check if email format is correct
     if (!this.state.email.match(UtilityHelper.getInstance().emailFormat())) {
       this.setState({ emailError: 'invalidEmailError' });
       return;
     }

     await this.handelLoginStates('login', {
       email: this.state.email,
       password: this.state.password,
     });
   };

   handelLoginStates = async (params, value) => {
     console.log("params ", params);
     // Show spinner
     this.setState({ waiting: true });
     let userObject = {};

     if (params === 'login') {
       // If user tries to login
       let body = { email: value.email, password: value.password, isWeb: 1 };

       let loginApiResult = {};
       try {
         const response = await login(body);
       } catch (error) {
         const errorResponse = (error.response && error.response.data) ?? {};
         if (!errorResponse.msgKey) {
           this.setState({
             authentication: 'login',
             emailError: 'serverError',
             passwordError: 'serverError',
             waiting: false,
           });
           this.setState({
             waiting: false,
             showPopup: true,
             popupText: errorResponse.msgKey,
           });
           return;
         }

         if (
           errorResponse.msgKey === 'emailPasswordNotMatched' ||
           errorResponse.msgKey === 'emailNotExist'
         )
           this.setState({
             authentication: 'login',
             emailError: 'emailPasswordNotMatched',
             passwordError: 'emailPasswordNotMatched',
             waiting: false,
           });
         else
           this.setState({
             authentication: 'login',
             emailError: 'serverError',
             passwordError: 'serverError',
             waiting: false,
           });

         this.setState({
           waiting: false,
           showPopup: true,
           popupText: errorResponse.msgKey,
         });
       }
     } else if (params === 'forgotPassword') {
       this.setState({
         authentication: 'forgotPassword',
         emailError: '',
         passwordError: '',
         waiting: false,
       });
     } else if (params === 'showLogin') {
       this.setState({
         authentication: 'login',
         emailError: '',
         passwordError: '',
         waiting: false,
       });
     } else if (params === 'logged') {
       this.setState({
         authentication: 'logged',
         emailError: '',
         passwordError: '',
         waiting: false,
       });
     } else {
       this.setState({ waiting: true });
     }
   };

   arrangeUI = () => {
     let UI = (
       <React.Fragment>
         <div
           className="loginPage"
           style={{
             display: this.state.authentication === 'login' ? 'initial' : 'none',
           }}
         >
           <LoginForm
             state={this.state}
             handleChange={this.handleChange}
             sumbitItem={this.sumbitItem}
             sumbitFunction={this.sumbitFunction}
             handelLoginStates={this.handelLoginStates}
           />
           <Spin waiting={this.state.waiting} />
         </div>
         <div
           style={{
             display:
               this.state.authentication === 'forgotPassword'
                 ? 'initial'
                 : 'none',
           }}
         >
           <ForgotPassword
             state={this.state}
             handelLoginStates={this.handelLoginStates}
           />
         </div>
         <div
           style={{
             display:
               this.state.authentication === 'resetPassword'
                 ? 'initial'
                 : 'none',
           }}
         >
           <ResetPassword
             state={this.state}
             handelLoginStates={this.handelLoginStates}
           />
         </div>
       </React.Fragment>
     );
     return UI;
   };

   render() {
     if (this.state.authentication === 'logged') {
       return <Redirect to="/dashboard" />;
     } else {
       return <React.Fragment>{this.arrangeUI()}</React.Fragment>;
     }
   }
 }

 export default Login;