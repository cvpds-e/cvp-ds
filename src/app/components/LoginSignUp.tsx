import React, { useState } from 'react';
import { Building2, Eye, EyeOff } from 'lucide-react';
import { IconSmallButton } from './IconSmallButton';
import { NotificationBanner } from './NotificationBanner';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';
import { Select } from './Select';
import { TextButton } from './TextButton';
import { TextInput } from './TextInput';
import logoImage from 'figma:asset/127ff0dd4b8f9229c2580dc1dac8c642551383bb.png';
import footerLogo from 'figma:asset/02e366865b9599b5f72e86a8c4970e65156c9f3f.png';
import './LoginSignUp.css';

export interface LoginSignUpProps {
  initialMode?: 'sign-in' | 'sign-up';
  allowModeSwitch?: boolean;
  onSignIn?: (email: string, password: string) => void;
  onSignUp?: (name: string, email: string, password: string) => void;
  onSSOSignIn?: () => void;
  onForgotPassword?: () => void;
  loading?: boolean;
  error?: string;
  logoUrl?: string;
  platformName?: string;
}

const accountOptions = [
  { value: 'rail-manager', label: 'Rail Manager' },
  { value: 'content-ops', label: 'Content Ops' },
  { value: 'admin', label: 'Administration' }
];

export function LoginSignUp({ initialMode = 'sign-in', allowModeSwitch = true, onSignIn, onSignUp, onSSOSignIn,
  onForgotPassword, loading = false, error, logoUrl, platformName = 'Cloud Video Platform' }: LoginSignUpProps) {
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('rail-manager');
  const isSignUp = mode === 'sign-up';
  const isComplete = Boolean(email && password && (!isSignUp || name));

  const switchMode = () => {
    setMode(isSignUp ? 'sign-in' : 'sign-up');
    setShowPassword(false);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isComplete) return;
    if (isSignUp) onSignUp?.(name, email, password);
    else onSignIn?.(email, password);
  };

  return <main className="cvp-login" aria-labelledby="cvp-login-title">
    <div className="cvp-login__brand"><img src={logoUrl ?? logoImage} alt={`${platformName} logo`} /></div>
    <section className="cvp-login__card">
      <header className="cvp-login__heading">
        <h1 id="cvp-login-title">{isSignUp ? 'Sign up' : 'Sign in'}</h1>
        <div className="cvp-login__context">
          <span>{isSignUp ? 'Set up your CVP' : 'Access your CVP'}</span>
          <Select value={selectedAccount} onChange={setSelectedAccount} variant="button" size="compact" options={accountOptions} icon={Building2} />
          <span>account.</span>
        </div>
      </header>

      <form className="cvp-login__form" onSubmit={handleSubmit} noValidate>
        {error && <NotificationBanner title="We couldn’t continue" message={error} variant="error" />}
        {isSignUp && <TextInput label="Full name" autoComplete="name" value={name} onChange={event => setName(event.target.value)} placeholder="Enter your full name" disabled={loading} required />}
        <TextInput label="Email" type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="Enter your email" disabled={loading} required />
        <div className="cvp-login__password">
          <TextInput label="Password" type={showPassword ? 'text' : 'password'} autoComplete={isSignUp ? 'new-password' : 'current-password'} value={password}
            onChange={event => setPassword(event.target.value)} placeholder={isSignUp ? 'Use at least 8 characters' : 'Enter your password'} disabled={loading} required
            helperText={isSignUp ? 'Use at least 8 characters with a mix of letters and numbers.' : undefined} inputClassName="cvp-login__password-control" />
          <div className="cvp-login__password-toggle"><IconSmallButton type="button" onClick={() => setShowPassword(value => !value)} disabled={loading}
            aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</IconSmallButton></div>
        </div>
        {!isSignUp && <div className="cvp-login__recovery"><TextButton type="button" onClick={onForgotPassword} disabled={loading}>Forgot password?</TextButton></div>}
        <PrimaryButton className="cvp-login__full-action" type="submit" disabled={loading || !isComplete}>{loading ? 'Please wait…' : isSignUp ? 'Create account' : 'Sign in'}</PrimaryButton>
      </form>

      <div className="cvp-login__divider" aria-hidden="true"><span /><b>or</b><span /></div>
      <SecondaryButton className="cvp-login__full-action" type="button" onClick={onSSOSignIn} disabled={loading}>Sign In with Single Sign On</SecondaryButton>
      {allowModeSwitch && <p className="cvp-login__switch">{isSignUp ? 'Already have an account?' : 'New to CVP?'} <TextButton type="button" onClick={switchMode} disabled={loading}>{isSignUp ? 'Sign in' : 'Create an account'}</TextButton></p>}
    </section>

    <footer className="cvp-login__footer">
      <img src={footerLogo} alt="Comcast Technology Solutions" />
      <p>© 2010–2025 Comcast Cable Communications Management, LLC. All rights reserved.</p>
      <nav aria-label="Legal"><a href="#privacy">Privacy Policy</a><span aria-hidden="true">•</span><a href="#terms">Terms &amp; Conditions</a></nav>
    </footer>
  </main>;
}
