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

export interface LoginSignUpLightProps {
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

export function LoginSignUpLight({
  onSignIn,
  onSSOSignIn,
  onForgotPassword,
  loading = false,
  error,
  logoUrl,
  platformName = 'Cloud Video Platform'
}: LoginSignUpLightProps) {
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
        .login-signup-light {
          /* Design System Tokens - Light Theme */
          --login-bg-gradient-start: #e0e7ff;
          --login-bg-gradient-middle: #dbeafe;
          --login-bg-gradient-end: #f0f9ff;
          --login-bg-fallback: #eff6ff;
          --login-card-bg: linear-gradient(to bottom right, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95));
          --login-card-border: #e5e7eb;
          --login-header-text: #111827;
          --login-subtext: #4b5563;
          --login-link-text: #3b5bdb;
          --login-link-hover: #2f44ad;
          --login-divider-text: #6b7280;
          --login-footer-text: #6b7280;
          --login-footer-link: #3b5bdb;
          --login-footer-link-hover: #2f44ad;
          --login-logo-size: 32px;
          --login-card-max-width: 440px;
          --login-card-padding: 32px;
          --login-card-border-radius: 12px;
          --login-card-shadow: 0 8px 32px rgba(59, 91, 219, 0.12), 0 2px 8px rgba(59, 91, 219, 0.08);
          --login-input-label-color: #374151;
          --login-button-full-width: 100%;
          
          /* Component Styles */
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--login-bg-fallback);
          background: linear-gradient(135deg, var(--login-bg-gradient-start) 0%, var(--login-bg-gradient-middle) 50%, var(--login-bg-gradient-end) 100%);
          padding: 24px;
          box-sizing: border-box;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        }

        .login-signup-light__header {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 32px;
          width: 100%;
        }

        .login-signup-light__logo {
          width: 100%;
          max-width: 260px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-signup-light__logo-icon {
          width: 100%;
          height: auto;
          object-fit: contain;
          filter: brightness(0) saturate(100%);
        }

        .login-signup-light__account-selector {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .login-signup-light__header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          width: 100%;
        }

        .login-signup-light__platform-name {
          color: var(--login-header-text);
          font-size: 16px;
          font-weight: 600;
          line-height: 24px;
          letter-spacing: -0.01em;
          margin: 0;
        }

        .login-signup-light__card {
          background: var(--login-card-bg);
          border: 1px solid var(--login-card-border);
          border-radius: var(--login-card-border-radius);
          box-shadow: var(--login-card-shadow);
          padding: var(--login-card-padding);
          width: 100%;
          max-width: var(--login-card-max-width);
          box-sizing: border-box;
          backdrop-filter: blur(12px);
        }

        .login-signup-light__title {
          color: var(--login-header-text);
          font-size: 13px;
          font-weight: 600;
          line-height: 20px;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin: 0 0 8px 0;
        }

        .login-signup-light__subtitle {
          color: var(--login-subtext);
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          letter-spacing: 0.15px;
          margin: 0 0 24px 0;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
        }

        .login-signup-light__subtitle-inline-selector {
          display: inline-flex;
          align-items: center;
          vertical-align: middle;
        }

        .login-signup-light__form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .login-signup-light__field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .login-signup-light__label {
          color: var(--login-input-label-color);
          font-size: 13px;
          font-weight: 500;
          line-height: 20px;
          letter-spacing: 0.16px;
          margin: 0;
        }

        .login-signup-light__input-wrapper {
          position: relative;
          width: 100%;
        }

        .login-signup-light__password-toggle {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
        }

        .login-signup-light__forgot-password {
          align-self: flex-start;
          margin-top: -8px;
        }

        .login-signup-light__error {
          color: #991b1b;
          font-size: 13px;
          font-weight: 400;
          line-height: 20px;
          letter-spacing: 0.16px;
          margin: 0;
          padding: 8px 12px;
          background-color: #fee2e2;
          border-radius: 6px;
          border: 1px solid #fca5a5;
        }

        .login-signup-light__submit {
          width: var(--login-button-full-width);
          margin-top: 8px;
        }

        .login-signup-light__divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 16px 0;
        }

        .login-signup-light__divider-line {
          flex: 1;
          height: 1px;
          background-color: #d1d5db;
        }

        .login-signup-light__divider-text {
          color: var(--login-divider-text);
          font-size: 13px;
          font-weight: 400;
          line-height: 20px;
          letter-spacing: 0.16px;
          margin: 0;
        }

        .login-signup-light__sso-button {
          width: 100%;
        }

        .login-signup-light__footer {
          margin-top: 48px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
        }

        .login-signup-light__footer-logo {
          display: flex;
          justify-content: center;
        }

        .login-signup-light__footer-logo-img {
          height: 24px;
          width: auto;
          object-fit: contain;
          filter: brightness(0) saturate(100%) invert(30%) sepia(10%) saturate(400%) hue-rotate(180deg);
        }

        .login-signup-light__footer-text {
          color: var(--login-footer-text);
          font-size: 12px;
          font-weight: 400;
          line-height: 16px;
          letter-spacing: 0.4px;
          margin: 0;
        }

        .login-signup-light__footer-links {
          display: flex;
          gap: 16px;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }

        .login-signup-light__footer-link {
          color: var(--login-footer-link);
          font-size: 12px;
          font-weight: 400;
          line-height: 16px;
          letter-spacing: 0.4px;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .login-signup-light__footer-link:hover {
          color: var(--login-footer-link-hover);
          text-decoration: underline;
        }

        .login-signup-light__footer-separator {
          color: #d1d5db;
          user-select: none;
        }

        /* Responsive adjustments */
        @media (max-width: 480px) {
          .login-signup-light {
            padding: 16px;
          }

          .login-signup-light__card {
            padding: 24px;
          }

          .login-signup-light__footer {
            margin-top: 32px;
          }
        }
      `}</style>

      <div className="login-signup-light">
        <div className="login-signup-light__header">
          <div className="login-signup-light__logo">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="Logo" 
                className="login-signup-light__logo-icon"
              />
            ) : (
              <img 
                src={logoImage} 
                alt="Logo" 
                className="login-signup-light__logo-icon"
              />
            )}
          </div>
        </div>

        <div className="login-signup-light__card">
          <div className="login-signup-light__header-row">
            <h1 className="login-signup-light__platform-name">{platformName}</h1>
            <div className="login-signup-light__account-selector">
              <Select
                value={selectedAccount}
                onChange={(value) => setSelectedAccount(value)}
                options={[
                  { value: 'rail-manager', label: 'Rail Manager' },
                  { value: 'content-ops', label: 'Content Ops' },
                  { value: 'admin', label: 'Admin' }
                ]}
                size="small"
              />
            </div>
          </div>

          <h2 className="login-signup-light__title">Sign In</h2>
          <p className="login-signup-light__subtitle">
            to continue to 
            <span className="login-signup-light__subtitle-inline-selector">
              <Building2 size={14} style={{ marginLeft: '4px', marginRight: '2px' }} />
              {selectedAccount === 'rail-manager' && 'Rail Manager'}
              {selectedAccount === 'content-ops' && 'Content Ops'}
              {selectedAccount === 'admin' && 'Admin'}
            </span>
          </p>

          <form className="login-signup-light__form" onSubmit={handleSubmit}>
            {error && (
              <div className="login-signup-light__error" role="alert">
                {error}
              </div>
            )}

            <div className="login-signup-light__field">
              <label htmlFor="email" className="login-signup-light__label">
                Email
              </label>
              <TextInput
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
            </div>

            <div className="login-signup-light__field">
              <label htmlFor="password" className="login-signup-light__label">
                Password
              </label>
              <div className="login-signup-light__input-wrapper">
                <TextInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  style={{ paddingRight: '40px' }}
                />
                <div className="login-signup-light__password-toggle">
                  <IconSmallButton
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    type="button"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </IconSmallButton>
                </div>
              </div>
            </div>

            <div className="login-signup-light__forgot-password">
              <TextButton 
                onClick={onForgotPassword}
                type="button"
              >
                Forgot password?
              </TextButton>
            </div>

            <PrimaryButton
              type="submit"
              className="login-signup-light__submit"
              disabled={loading || !email || !password}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </PrimaryButton>
          </form>

          <div className="login-signup-light__divider">
            <div className="login-signup-light__divider-line" />
            <span className="login-signup-light__divider-text">or</span>
            <div className="login-signup-light__divider-line" />
          </div>

          <SecondaryButton
            onClick={onSSOSignIn}
            className="login-signup-light__sso-button"
            disabled={loading}
          >
            Sign in with SSO
          </SecondaryButton>
        </div>

        <div className="login-signup-light__footer">
          <div className="login-signup-light__footer-logo">
            <img 
              src={footerLogo} 
              alt="Footer Logo" 
              className="login-signup-light__footer-logo-img"
            />
          </div>
          <p className="login-signup-light__footer-text">
            © 2026 Cloud Video Platform. All rights reserved.
          </p>
          <div className="login-signup-light__footer-links">
            <a href="#" className="login-signup-light__footer-link">Privacy Policy</a>
            <span className="login-signup-light__footer-separator">•</span>
            <a href="#" className="login-signup-light__footer-link">Terms of Service</a>
            <span className="login-signup-light__footer-separator">•</span>
            <a href="#" className="login-signup-light__footer-link">Help Center</a>
          </div>
        </div>
      </div>
    </>
  );
}
