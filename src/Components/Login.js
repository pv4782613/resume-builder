// Components/Login.js
import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import style from '../Styles/Login.module.css';

const Login = () => {
  return (
    <div className={style.container}>
      <h2>Please Login</h2>
      <SignIn redirectUrl="/resume-builder" />
    </div>
  );
};

export default Login;
