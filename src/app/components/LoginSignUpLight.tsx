import React from 'react';
import { LoginSignUp, LoginSignUpProps } from './LoginSignUp';

/** @deprecated LoginSignUp is now theme-aware. Retained as a source-compatible migration wrapper. */
export type LoginSignUpLightProps = LoginSignUpProps;
export function LoginSignUpLight(props: LoginSignUpLightProps) {
  return <LoginSignUp {...props} />;
}
