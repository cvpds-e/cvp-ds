import React, { useState } from 'react';
import { Eye, EyeOff, Building2 } from 'lucide-react';
import { TextInput } from './TextInput';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';
import { TextButton } from './TextButton';
import { IconSmallButton } from './IconSmallButton';
import { Select } from './Select';
import logoImage from 'figma:asset/127ff0dd4b8f9229c2580dc1dac8c642551383bb.png';
import footerLogo from 'figma:asset/02e366865b9599b5f72e86a8c4970e65156c9f3f.png';

export interface LoginSignUpProps {
  /** Callback when sign in is clicked */
  onSignIn?: (email: string, password: string) => void;
  /** Callback when SSO sign in is clicked */
  onSSOSignIn?: () => void;
  /** Callback when forgot password is clicked */
  onForgotPassword?: () => void;
  /** Loading state */
  loading?: boolean;
  /** Error message to display */
  error?: string;
  /** Logo image URL */
  logoUrl?: string;
  /** Platform name */
  platformName?: string;
}

export function LoginSignUp({
  onSignIn,
  onSSOSignIn,
  onForgotPassword,
  loading = false,
  error,
  logoUrl,
  platformName = 'Cloud Video Platform'
}: LoginSignUpProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('rail-manager');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSignIn && email && password) {
      onSignIn(email, password);
    }
  };

  return (
    <>
      <style>{`
        .login-signup {
          /* Design System Tokens */
          --login-bg-gradient-start: #182848;
          --login-bg-gradient-end: #4b6cb7;
          --login-bg-fallback: #4b6cb7;
          --login-card-bg: linear-gradient(to bottom right, rgba(16, 16, 16, 0.98), rgba(4, 4, 4, 0.98));
          --login-card-border: transparent;
          --login-header-text: #fff;
          --login-subtext: #B8C5E0;
          --login-link-text: #B8C5E0;
          --login-link-hover: #E0E7F5;
          --login-divider-text: #B8C5E0;
          --login-footer-text: #E0E7F5;
          --login-footer-link: #E0E7F5;
          --login-footer-link-hover: #fff;
          --login-logo-size: 32px;
          --login-card-max-width: 440px;
          --login-card-padding: 32px;
          --login-card-border-radius: 8px;
          --login-card-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
          --login-input-label-color: #fff;
          --login-button-full-width: 100%;
          
          /* Component Styles */
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--login-bg-fallback);
          background: -webkit-linear-gradient(to right, var(--login-bg-gradient-start), var(--login-bg-gradient-end));
          background: linear-gradient(to right, var(--login-bg-gradient-start), var(--login-bg-gradient-end));
          padding: var(--spacing-6);
          box-sizing: border-box;
          font-family: var(--font-family);
        }

        .login-signup__header {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--spacing-8);
          width: 100%;
        }

        .login-signup__logo {
          width: 100%;
          max-width: 260px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-signup__logo-icon {
          width: 100%;
          height: auto;
          object-fit: contain;
        }

        .login-signup__account-selector {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .login-signup__header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-2);
          width: 100%;
        }

        .login-signup__platform-name {
          color: var(--login-header-text);
          font-size: var(--type-scale-l-size);
          font-weight: var(--type-scale-m-medium-weight);
          line-height: var(--type-scale-l-line-height);
          letter-spacing: var(--type-scale-l-letter-spacing);
          margin: 0;
        }

        .login-signup__card {
          background: var(--login-card-bg);
          border: 1px solid var(--login-card-border);
          border-radius: var(--login-card-border-radius);
          box-shadow: var(--login-card-shadow);
          padding: var(--login-card-padding);
          width: 100%;
          max-width: var(--login-card-max-width);
          box-sizing: border-box;
        }

        .login-signup__title {
          color: var(--login-header-text);
          font-size: var(--type-scale-s-size);
          font-weight: var(--type-scale-s-medium-weight);
          line-height: var(--type-scale-s-line-height);
          letter-spacing: 1px;
          text-transform: uppercase;
          margin: 0 0 var(--spacing-2) 0;
        }

        .login-signup__subtitle {
          color: var(--login-subtext);
          font-size: var(--type-scale-m-size);
          font-weight: var(--type-scale-m-weight);
          line-height: var(--type-scale-m-line-height);
          letter-spacing: var(--type-scale-m-letter-spacing);
          margin: 0 0 var(--spacing-6) 0;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
        }

        .login-signup__subtitle-inline-selector {
          display: inline-flex;
          align-items: center;
          vertical-align: middle;
        }

        .login-signup__form {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-4);
        }

        .login-signup__field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .login-signup__label {
          color: var(--login-input-label-color);
          font-size: var(--type-scale-s-size);
          font-weight: var(--type-scale-s-medium-weight);
          line-height: var(--type-scale-s-line-height);
          letter-spacing: var(--type-scale-s-letter-spacing);
          margin: 0;
        }

        .login-signup__input-wrapper {
          position: relative;
          width: 100%;
        }

        .login-signup__password-toggle {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
        }

        .login-signup__forgot-password {
          align-self: flex-start;
          margin-top: calc(-1 * var(--spacing-2));
        }

        .login-signup__error {
          color: var(--destructive);
          font-size: var(--type-scale-s-size);
          font-weight: var(--type-scale-s-weight);
          line-height: var(--type-scale-s-line-height);
          letter-spacing: var(--type-scale-s-letter-spacing);
          margin: 0;
          padding: var(--spacing-2) var(--spacing-3);
          background-color: rgba(230, 73, 78, 0.1);
          border-radius: var(--radius-sm);
          border: 1px solid var(--destructive);
        }

        .login-signup__submit {
          width: var(--login-button-full-width);
          margin-top: var(--spacing-2);
        }

        .login-signup__divider {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
          margin: var(--spacing-4) 0;
        }

        .login-signup__divider-line {
          flex: 1;
          height: 1px;
          background-color: #45454a;
        }

        .login-signup__divider-text {
          color: var(--login-divider-text);
          font-size: var(--type-scale-s-size);
          font-weight: var(--type-scale-s-weight);
          line-height: var(--type-scale-s-line-height);
          letter-spacing: var(--type-scale-s-letter-spacing);
          text-transform: uppercase;
        }

        .login-signup__sso-button {
          width: var(--login-button-full-width);
        }

        .login-signup__footer {
          margin-top: var(--spacing-8);
          text-align: center;
        }

        .login-signup__footer-logo {
          width: 100%;
          max-width: 280px;
          margin: 0 auto var(--spacing-6);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-signup__footer-logo-img {
          width: 100%;
          height: auto;
          object-fit: contain;
        }

        .login-signup__footer-text {
          color: var(--login-footer-text);
          font-size: var(--type-scale-xs-size);
          font-weight: var(--type-scale-xs-weight);
          line-height: var(--type-scale-xs-line-height);
          letter-spacing: var(--type-scale-xs-letter-spacing);
          margin: 0;
        }

        .login-signup__footer-link {
          color: var(--login-footer-link);
          text-decoration: underline;
          transition: color 0.2s ease;
        }

        .login-signup__footer-link:hover {
          color: var(--login-footer-link-hover);
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .login-signup {
            padding: var(--spacing-4);
          }

          .login-signup__card {
            padding: var(--spacing-6);
          }

          .login-signup__header {
            margin-bottom: var(--spacing-6);
          }
        }
      `}</style>

      <div className="login-signup">
        <div className="login-signup__header">
          <div className="login-signup__logo">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="login-signup__logo-icon" />
            ) : (
              <img 
                src={logoImage} 
                alt="Logo" 
                className="login-signup__logo-icon"
                style={{ opacity: 0.9 }}
              />
            )}
          </div>
        </div>

        <div className="login-signup__card">
          <h2 className="login-signup__title" style={{ fontSize: '13px', fontWeight: 400, lineHeight: '20px', letterSpacing: '0.1px' }}>Sign In</h2>
          <div className="login-signup__subtitle text-[rgb(255,255,255)]" style={{ color: '#bbb' }}>
            <span>Access your CVP</span>
            <span className="login-signup__subtitle-inline-selector">
              <Select
                value={selectedAccount}
                onChange={setSelectedAccount}
                variant="button"
                options={[
                  { value: 'rail-manager', label: 'Rail Manager' },
                  { value: 'console', label: 'Console' }
                ]}
                icon={Building2}
              />
            </span>
            <span>account.</span>
          </div>

          <form className="login-signup__form" onSubmit={handleSubmit}>
            {error && (
              <p className="login-signup__error" role="alert">
                {error}
              </p>
            )}

            <div className="login-signup__field">
              <label htmlFor="email" className="login-signup__label">
                Email
              </label>
              <TextInput
                id="email"
                type="email"
                placeholder="jonas_kahnwald@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="login-signup__field">
              <label htmlFor="password" className="login-signup__label">
                Password
              </label>
              <div className="login-signup__input-wrapper">
                <TextInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                  style={{ paddingRight: '40px' }}
                />
                <div className="login-signup__password-toggle">
                  <IconSmallButton
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </IconSmallButton>
                </div>
              </div>
            </div>

            <div className="login-signup__forgot-password">
              <TextButton
                onClick={onForgotPassword}
                disabled={loading}
                type="button"
              >
                Forgot Password?
              </TextButton>
            </div>

            <PrimaryButton
              type="submit"
              disabled={loading || !email || !password}
              className="login-signup__submit"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </PrimaryButton>
          </form>

          <div className="login-signup__divider">
            <div className="login-signup__divider-line" />
            <span className="login-signup__divider-text">Or</span>
            <div className="login-signup__divider-line" />
          </div>

          <SecondaryButton
            onClick={onSSOSignIn}
            disabled={loading}
            className="login-signup__sso-button"
            type="button"
          >
            Sign In with Single Sign On
          </SecondaryButton>
        </div>

        <div className="login-signup__footer">
          <div className="login-signup__footer-logo">
            <img 
              src={footerLogo} 
              alt="Footer Logo" 
              className="login-signup__footer-logo-img"
              style={{ opacity: 0.8 }}
            />
          </div>
          <p className="login-signup__footer-text">
            © 2010-2025 Comcast Cable Communications Management, LLC. All rights reserved.{' '}
            <a href="#" className="login-signup__footer-link">
              Privacy Policy
            </a>
            {' • '}
            <a href="#" className="login-signup__footer-link">
              Terms & Conditions
            </a>
          </p>
        </div>
      </div>
    </>
  );
}