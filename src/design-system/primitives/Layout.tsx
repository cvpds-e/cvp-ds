import React, { forwardRef } from 'react';
import './Primitives.css';

export type Spacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: Spacing;
  surface?: 'none' | 'default' | 'raised' | 'sunken';
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(({ padding = 'none', surface = 'none', className = '', ...props }, ref) => (
  <div {...props} ref={ref} className={`cvp-box cvp-box--padding-${padding} cvp-box--surface-${surface} ${className}`.trim()} />
));
Box.displayName = 'Box';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'page' | 'reading';
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(({ size = 'page', className = '', ...props }, ref) => (
  <div {...props} ref={ref} className={`cvp-container cvp-container--${size} ${className}`.trim()} />
));
Container.displayName = 'Container';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: Spacing;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(({ gap = 'md', className = '', ...props }, ref) => (
  <div {...props} ref={ref} className={`cvp-stack cvp-gap-${gap} ${className}`.trim()} />
));
Stack.displayName = 'Stack';

export interface InlineProps extends StackProps {
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between';
  wrap?: boolean;
}

export const Inline = forwardRef<HTMLDivElement, InlineProps>(({ gap = 'md', align = 'center', justify = 'start', wrap = true, className = '', ...props }, ref) => (
  <div {...props} ref={ref} className={`cvp-inline cvp-gap-${gap} cvp-inline--align-${align} cvp-inline--justify-${justify} ${wrap ? '' : 'cvp-inline--nowrap'} ${className}`.trim()} />
));
Inline.displayName = 'Inline';

export interface GridProps extends StackProps {
  /** Omit for an auto-fitting grid. Fixed columns collapse to one below 600px. */
  columns?: 1 | 2 | 3 | 4;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(({ gap = 'md', columns, className = '', ...props }, ref) => (
  <div {...props} ref={ref} className={`cvp-grid cvp-gap-${gap} ${columns ? `cvp-grid--${columns}` : ''} ${className}`.trim()} />
));
Grid.displayName = 'Grid';

export const Spacer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className = '', ...props }, ref) => (
  <div {...props} ref={ref} aria-hidden="true" className={`cvp-spacer ${className}`.trim()} />
));
Spacer.displayName = 'Spacer';

export interface ButtonGroupProps extends InlineProps {
  label: string;
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(({ label, gap = 'sm', ...props }, ref) => (
  <Inline {...props} ref={ref} gap={gap} role="group" aria-label={label} />
));
ButtonGroup.displayName = 'ButtonGroup';
