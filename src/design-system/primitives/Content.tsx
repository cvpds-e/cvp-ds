import React, { forwardRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import './Primitives.css';

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'primary' | 'secondary' | 'muted' | 'success' | 'error';
  truncate?: boolean;
}

export const Text = forwardRef<HTMLSpanElement, TextProps>(({ tone = 'primary', truncate = false, className = '', ...props }, ref) => (
  <span {...props} ref={ref} className={`cvp-text cvp-text--${tone} ${truncate ? 'cvp-text--truncate' : ''} ${className}`.trim()} />
));
Text.displayName = 'Text';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 'title' | 'headline' | 'display';
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(({ level = 2, size = 'title', className = '', ...props }, ref) => {
  const Tag = level === 1 ? 'h1' : level === 2 ? 'h2' : level === 3 ? 'h3' : level === 4 ? 'h4' : level === 5 ? 'h5' : 'h6';
  return <Tag {...props} ref={ref} className={`cvp-heading cvp-heading--${size} ${className}`.trim()} />;
});
Heading.displayName = 'Heading';

export const Paragraph = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className = '', ...props }, ref) => (
  <p {...props} ref={ref} className={`cvp-text cvp-paragraph ${className}`.trim()} />
));
Paragraph.displayName = 'Paragraph';

export const Caption = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ className = '', ...props }, ref) => (
  <small {...props} ref={ref} className={`cvp-caption ${className}`.trim()} />
));
Caption.displayName = 'Caption';

export const Link = forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(({ className = '', ...props }, ref) => (
  <a {...props} ref={ref} className={`cvp-link ${className}`.trim()} />
));
Link.displayName = 'Link';

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'children'> {
  icon: LucideIcon;
  label?: string;
  size?: 'small' | 'medium' | 'large';
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(({ icon: Glyph, label, size = 'medium', className = '', ...props }, ref) => (
  <Glyph {...props} ref={ref} className={`cvp-icon cvp-icon--${size} ${className}`.trim()} role={label ? 'img' : undefined} aria-label={label} aria-hidden={!label || undefined} focusable="false" />
));
Icon.displayName = 'Icon';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Meaningful description, or an empty string for a decorative image. */
  alt: string;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(({ className = '', alt, ...props }, ref) => (
  <img {...props} ref={ref} alt={alt} className={`cvp-image ${className}`.trim()} />
));
Image.displayName = 'Image';

export const HelperText = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className = '', ...props }, ref) => (
  <p {...props} ref={ref} className={`cvp-helper-text ${className}`.trim()} />
));
HelperText.displayName = 'HelperText';

export const ValidationMessage = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className = '', role = 'alert', ...props }, ref) => (
  <p {...props} ref={ref} role={role} className={`cvp-validation-message ${className}`.trim()} />
));
ValidationMessage.displayName = 'ValidationMessage';
