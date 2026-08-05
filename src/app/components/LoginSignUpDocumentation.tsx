import React, { useState, useEffect } from 'react';
import { LoginSignUp } from './LoginSignUp';
import { LoginSignUpLight } from './LoginSignUpLight';

export function LoginSignUpDocumentation() {
  const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const hasLightTheme = document.documentElement.getAttribute('data-theme') === 'light' ||
                           document.body.getAttribute('data-theme') === 'light';
      setCurrentTheme(hasLightTheme ? 'light' : 'dark');
    };

    checkTheme();

    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .login-signup-docs {
          padding: var(--doc-padding);
          max-width: var(--doc-max-width);
          margin: 0 auto;
          font-family: var(--doc-font-family);
        }

        .login-signup-docs__title {
          color: var(--foreground);
          margin-bottom: var(--spacing-6);
        }

        .login-signup-docs__description {
          font-size: var(--type-scale-l-size);
          line-height: var(--type-scale-l-line-height);
          color: var(--muted-foreground);
          margin-bottom: var(--doc-section-spacing);
        }

        .login-signup-docs__section {
          margin-bottom: var(--doc-section-spacing);
        }

        .login-signup-docs__section-title {
          color: var(--foreground);
          margin-bottom: var(--spacing-6);
          padding-bottom: var(--spacing-3);
          border-bottom: 1px solid var(--border-default);
        }

        .login-signup-docs__preview {
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          padding: 0;
          margin-bottom: var(--spacing-6);
          overflow: hidden;
        }

        .login-signup-docs__preview-full {
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-signup-docs__specs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-6);
          margin-bottom: var(--spacing-6);
        }

        .login-signup-docs__spec-card {
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          padding: var(--spacing-6);
        }

        .login-signup-docs__spec-title {
          color: var(--foreground);
          font-size: var(--type-scale-m-size);
          font-weight: var(--type-scale-m-medium-weight);
          margin-bottom: var(--spacing-4);
        }

        .login-signup-docs__spec-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-3);
        }

        .login-signup-docs__spec-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--spacing-4);
          font-size: var(--type-scale-s-size);
          line-height: var(--type-scale-s-line-height);
          padding-bottom: var(--spacing-3);
          border-bottom: 1px solid var(--border-default);
        }

        .login-signup-docs__spec-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .login-signup-docs__spec-label {
          color: var(--muted-foreground);
          flex-shrink: 0;
        }

        .login-signup-docs__spec-value {
          color: var(--foreground);
          font-family: var(--font-family-mono);
          text-align: right;
          word-break: break-word;
        }

        .login-signup-docs__features-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-3);
        }

        .login-signup-docs__feature-item {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-3);
          font-size: var(--type-scale-m-size);
          line-height: var(--type-scale-m-line-height);
          color: var(--foreground);
        }

        .login-signup-docs__feature-bullet {
          width: 6px;
          height: 6px;
          background-color: var(--primary);
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 8px;
        }

        .login-signup-docs__usage-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-6);
          margin-top: var(--spacing-6);
        }

        .login-signup-docs__usage-card {
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          padding: var(--spacing-6);
        }

        .login-signup-docs__usage-title {
          color: var(--foreground);
          font-size: var(--type-scale-m-size);
          font-weight: var(--type-scale-m-medium-weight);
          margin-bottom: var(--spacing-4);
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
        }

        .login-signup-docs__usage-icon {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        .login-signup-docs__usage-icon--do {
          color: var(--color-green-500);
        }

        .login-signup-docs__usage-icon--dont {
          color: var(--destructive);
        }

        .login-signup-docs__usage-text {
          font-size: var(--type-scale-s-size);
          line-height: var(--type-scale-s-line-height);
          color: var(--muted-foreground);
          margin: 0;
        }

        .login-signup-docs__note {
          background-color: rgba(103, 179, 251, 0.1);
          border: 1px solid rgba(103, 179, 251, 0.3);
          border-radius: 8px;
          padding: var(--spacing-4);
          margin-top: var(--spacing-6);
        }

        .login-signup-docs__note-title {
          color: #67b3fb;
          font-size: var(--type-scale-m-size);
          font-weight: var(--type-scale-m-medium-weight);
          margin: 0 0 var(--spacing-2) 0;
        }

        .login-signup-docs__note-text {
          font-size: var(--type-scale-s-size);
          line-height: var(--type-scale-s-line-height);
          color: var(--foreground);
          margin: 0;
        }

        @media (max-width: 768px) {
          .login-signup-docs {
            padding: var(--spacing-6);
          }

          .login-signup-docs__usage-grid {
            grid-template-columns: 1fr;
          }

          .login-signup-docs__specs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="login-signup-docs">
        <h1 className="login-signup-docs__title">Login / Sign Up</h1>
        
        <p className="login-signup-docs__description">
          A full-page authentication component for user login and single sign-on (SSO) access. Features a modern gradient background, centered card layout, and comprehensive form validation with password visibility toggle.
        </p>

        {/* Dark Theme Version */}
        {currentTheme === 'dark' && (
          <section className="login-signup-docs__section">
            <h2 className="login-signup-docs__section-title">Interactive Example</h2>
            <div className="login-signup-docs__preview login-signup-docs__preview-full">
              <LoginSignUp
                onSignIn={(email, password) => {
                  console.log('Sign in:', email, password);
                  alert(`Signing in with: ${email}`);
                }}
                onSSOSignIn={() => {
                  console.log('SSO sign in');
                  alert('Redirecting to SSO provider...');
                }}
                onForgotPassword={() => {
                  console.log('Forgot password');
                  alert('Password reset link sent to your email');
                }}
                platformName="Cloud Video Platform"
              />
            </div>
          </section>
        )}

        {/* Light Theme Version */}
        {currentTheme === 'light' && (
          <section className="login-signup-docs__section">
            <h2 className="login-signup-docs__section-title">Interactive Example</h2>
            <div className="login-signup-docs__preview login-signup-docs__preview-full">
              <LoginSignUpLight
                onSignIn={(email, password) => {
                  console.log('Sign in:', email, password);
                  alert(`Signing in with: ${email}`);
                }}
                onSSOSignIn={() => {
                  console.log('SSO sign in');
                  alert('Redirecting to SSO provider...');
                }}
                onForgotPassword={() => {
                  console.log('Forgot password');
                  alert('Password reset link sent to your email');
                }}
                platformName="Cloud Video Platform"
              />
            </div>
          </section>
        )}

        {/* Specifications */}
        <section className="login-signup-docs__section">
          <h2 className="login-signup-docs__section-title">Specifications</h2>
          
          <div className="login-signup-docs__specs-grid">
            <div className="login-signup-docs__spec-card">
              <h3 className="login-signup-docs__spec-title">Layout</h3>
              <ul className="login-signup-docs__spec-list">
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Background</span>
                  <span className="login-signup-docs__spec-value">linear-gradient(to right, #182848, #4b6cb7)</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Card Background</span>
                  <span className="login-signup-docs__spec-value">linear-gradient(to right, #2d2e30, #232526)</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Card Border</span>
                  <span className="login-signup-docs__spec-value">none</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Card Max Width</span>
                  <span className="login-signup-docs__spec-value">440px</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Card Padding</span>
                  <span className="login-signup-docs__spec-value">32px</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Card Border Radius</span>
                  <span className="login-signup-docs__spec-value">8px</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Card Shadow</span>
                  <span className="login-signup-docs__spec-value">0 8px 24px rgba(0, 0, 0, 0.4)</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Logo Max Width</span>
                  <span className="login-signup-docs__spec-value">260px</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Logo Opacity</span>
                  <span className="login-signup-docs__spec-value">0.9</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Footer Logo Max Width</span>
                  <span className="login-signup-docs__spec-value">280px</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Footer Logo Margin Bottom</span>
                  <span className="login-signup-docs__spec-value">24px</span>
                </li>
              </ul>
            </div>

            <div className="login-signup-docs__spec-card">
              <h3 className="login-signup-docs__spec-title">Typography</h3>
              <ul className="login-signup-docs__spec-list">
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Title Font Size</span>
                  <span className="login-signup-docs__spec-value">13px (Typescale S)</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Title Font Weight</span>
                  <span className="login-signup-docs__spec-value">500 (Medium)</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Title Transform</span>
                  <span className="login-signup-docs__spec-value">Uppercase</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Title Letter Spacing</span>
                  <span className="login-signup-docs__spec-value">1px</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Body Text</span>
                  <span className="login-signup-docs__spec-value">14px (Typescale M)</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Label Font Size</span>
                  <span className="login-signup-docs__spec-value">13px (--type-scale-s-size)</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Label Font Weight</span>
                  <span className="login-signup-docs__spec-value">500 (--type-scale-s-medium-weight)</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Label Line Height</span>
                  <span className="login-signup-docs__spec-value">20px (--type-scale-s-line-height)</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Label Letter Spacing</span>
                  <span className="login-signup-docs__spec-value">0.1px (--type-scale-s-letter-spacing)</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Label to Input Gap</span>
                  <span className="login-signup-docs__spec-value">6px</span>
                </li>
              </ul>
            </div>

            <div className="login-signup-docs__spec-card">
              <h3 className="login-signup-docs__spec-title">Colors</h3>
              <ul className="login-signup-docs__spec-list">
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Header Text</span>
                  <span className="login-signup-docs__spec-value">#FFFFFF</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Subtext</span>
                  <span className="login-signup-docs__spec-value">#B8C5E0</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Link Text</span>
                  <span className="login-signup-docs__spec-value">#B8C5E0</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Link Hover</span>
                  <span className="login-signup-docs__spec-value">#E0E7F5</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Divider Lines</span>
                  <span className="login-signup-docs__spec-value">1px solid #45454a</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Footer Text</span>
                  <span className="login-signup-docs__spec-value">#E0E7F5</span>
                </li>
              </ul>
            </div>

            <div className="login-signup-docs__spec-card">
              <h3 className="login-signup-docs__spec-title">Components Used</h3>
              <ul className="login-signup-docs__spec-list">
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Input Fields</span>
                  <span className="login-signup-docs__spec-value">TextInput</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Primary Actions</span>
                  <span className="login-signup-docs__spec-value">PrimaryButton</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Text Links</span>
                  <span className="login-signup-docs__spec-value">TextButton</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Password Toggle</span>
                  <span className="login-signup-docs__spec-value">IconSmallButton</span>
                </li>
                <li className="login-signup-docs__spec-item">
                  <span className="login-signup-docs__spec-label">Icons</span>
                  <span className="login-signup-docs__spec-value">lucide-react (Eye, EyeOff)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="login-signup-docs__section">
          <h2 className="login-signup-docs__section-title">Features</h2>
          <ul className="login-signup-docs__features-list">
            <li className="login-signup-docs__feature-item">
              <div className="login-signup-docs__feature-bullet" />
              <span>Full-page gradient background for modern, branded experience</span>
            </li>
            <li className="login-signup-docs__feature-item">
              <div className="login-signup-docs__feature-bullet" />
              <span>Centered card layout with elevated appearance</span>
            </li>
            <li className="login-signup-docs__feature-item">
              <div className="login-signup-docs__feature-bullet" />
              <span>Email and password input fields with proper validation</span>
            </li>
            <li className="login-signup-docs__feature-item">
              <div className="login-signup-docs__feature-bullet" />
              <span>Password visibility toggle for better user experience</span>
            </li>
            <li className="login-signup-docs__feature-item">
              <div className="login-signup-docs__feature-bullet" />
              <span>"Forgot Password?" link for account recovery</span>
            </li>
            <li className="login-signup-docs__feature-item">
              <div className="login-signup-docs__feature-bullet" />
              <span>Primary sign-in button with loading state support</span>
            </li>
            <li className="login-signup-docs__feature-item">
              <div className="login-signup-docs__feature-bullet" />
              <span>Visual divider with "OR" text for alternative auth methods</span>
            </li>
            <li className="login-signup-docs__feature-item">
              <div className="login-signup-docs__feature-bullet" />
              <span>Single Sign-On (SSO) button for enterprise authentication</span>
            </li>
            <li className="login-signup-docs__feature-item">
              <div className="login-signup-docs__feature-bullet" />
              <span>Footer with copyright and legal links</span>
            </li>
            <li className="login-signup-docs__feature-item">
              <div className="login-signup-docs__feature-bullet" />
              <span>Customizable logo and platform name</span>
            </li>
            <li className="login-signup-docs__feature-item">
              <div className="login-signup-docs__feature-bullet" />
              <span>Error message display with proper styling</span>
            </li>
            <li className="login-signup-docs__feature-item">
              <div className="login-signup-docs__feature-bullet" />
              <span>Fully responsive design for mobile and desktop</span>
            </li>
            <li className="login-signup-docs__feature-item">
              <div className="login-signup-docs__feature-bullet" />
              <span>Keyboard navigation and form submission support</span>
            </li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className="login-signup-docs__section">
          <h2 className="login-signup-docs__section-title">Best Practices</h2>
          
          <div className="login-signup-docs__usage-grid">
            <div className="login-signup-docs__usage-card">
              <h3 className="login-signup-docs__usage-title">
                <svg
                  className="login-signup-docs__usage-icon login-signup-docs__usage-icon--do"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Do
              </h3>
              <ul className="login-signup-docs__features-list">
                <li className="login-signup-docs__feature-item">
                  <div className="login-signup-docs__feature-bullet" />
                  <span>Provide clear, actionable error messages</span>
                </li>
                <li className="login-signup-docs__feature-item">
                  <div className="login-signup-docs__feature-bullet" />
                  <span>Use loading states during authentication</span>
                </li>
                <li className="login-signup-docs__feature-item">
                  <div className="login-signup-docs__feature-bullet" />
                  <span>Implement proper email validation</span>
                </li>
                <li className="login-signup-docs__feature-item">
                  <div className="login-signup-docs__feature-bullet" />
                  <span>Allow password visibility toggle</span>
                </li>
                <li className="login-signup-docs__feature-item">
                  <div className="login-signup-docs__feature-bullet" />
                  <span>Support keyboard-only navigation</span>
                </li>
                <li className="login-signup-docs__feature-item">
                  <div className="login-signup-docs__feature-bullet" />
                  <span>Provide "Forgot Password?" functionality</span>
                </li>
              </ul>
            </div>

            <div className="login-signup-docs__usage-card">
              <h3 className="login-signup-docs__usage-title">
                <svg
                  className="login-signup-docs__usage-icon login-signup-docs__usage-icon--dont"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Don't
              </h3>
              <ul className="login-signup-docs__features-list">
                <li className="login-signup-docs__feature-item">
                  <div className="login-signup-docs__feature-bullet" />
                  <span>Show generic "Login failed" messages</span>
                </li>
                <li className="login-signup-docs__feature-item">
                  <div className="login-signup-docs__feature-bullet" />
                  <span>Allow submission with empty fields</span>
                </li>
                <li className="login-signup-docs__feature-item">
                  <div className="login-signup-docs__feature-bullet" />
                  <span>Hide the password field permanently</span>
                </li>
                <li className="login-signup-docs__feature-item">
                  <div className="login-signup-docs__feature-bullet" />
                  <span>Use placeholder text as labels</span>
                </li>
                <li className="login-signup-docs__feature-item">
                  <div className="login-signup-docs__feature-bullet" />
                  <span>Make the form inaccessible to screen readers</span>
                </li>
                <li className="login-signup-docs__feature-item">
                  <div className="login-signup-docs__feature-bullet" />
                  <span>Neglect mobile responsiveness</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Implementation Note */}
        <section className="login-signup-docs__section">
          <div className="login-signup-docs__note">
            <h3 className="login-signup-docs__note-title">Implementation Note</h3>
            <p className="login-signup-docs__note-text">
              This component is designed as a full-page authentication experience and should be rendered as the main content of your application during the login flow. It integrates with existing design system components (TextInput, PrimaryButton, TextButton, IconSmallButton) and follows all established design tokens for consistency. The component accepts callback props for authentication actions, allowing seamless integration with your authentication backend.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}