import React, { useEffect, useId, useRef, useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react';
import './Breadcrumbs.css';

export interface DropdownItemOption {
  id: string;
  label: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  onClick?: () => void;
  href?: string;
  separator?: boolean;
  disabled?: boolean;
}

export interface BreadcrumbItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  onClick?: () => void;
  href?: string;
  dropdown?: DropdownItemOption[];
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  surface?: 'default' | 'canvas';
}

export function Breadcrumbs({ items, separator, className = '', ariaLabel = 'Breadcrumb', surface = 'default' }: BreadcrumbsProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);
  const menuRefs = useRef<Record<string, HTMLUListElement | null>>({});
  const instanceId = useId().replace(/:/g, '');

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpenDropdownId(null);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, []);

  useEffect(() => {
    if (!openDropdownId) return;
    menuRefs.current[openDropdownId]?.querySelector<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])')?.focus();
  }, [openDropdownId]);

  if (!items?.length) return null;

  const activate = (item: DropdownItemOption) => {
    if (item.disabled) return;
    item.onClick?.();
    setOpenDropdownId(null);
  };

  const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLUListElement>, itemId: string) => {
    const options = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])'));
    const index = options.indexOf(document.activeElement as HTMLElement);
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpenDropdownId(null);
      document.getElementById(`${instanceId}-${itemId}-trigger`)?.focus();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const step = event.key === 'ArrowDown' ? 1 : -1;
      options[(index + step + options.length) % options.length]?.focus();
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      options[event.key === 'Home' ? 0 : options.length - 1]?.focus();
    }
  };

  return (
    <nav ref={rootRef} className={`cvp-breadcrumb cvp-breadcrumb--${surface} ${className}`.trim()} aria-label={ariaLabel}>
      <ol className="cvp-breadcrumb__list">
        {items.map((item, index) => {
          const isFirst = index === 0;
          const isCurrent = index === items.length - 1;
          const hasDropdown = Boolean(item.dropdown?.length);
          const isOpen = openDropdownId === item.id;
          const Icon = item.icon;
          const leading = isFirst ? <ArrowLeft aria-hidden="true" /> : Icon ? <Icon className="cvp-breadcrumb__item-icon" /> : null;
          const menuId = `${instanceId}-${item.id}-menu`;

          return (
            <React.Fragment key={item.id}>
              <li className="cvp-breadcrumb__item">
                {hasDropdown ? (
                  <span className="cvp-breadcrumb__dropdown">
                    <button
                      id={`${instanceId}-${item.id}-trigger`}
                      type="button"
                      className="cvp-breadcrumb__action cvp-breadcrumb__trigger"
                      aria-haspopup="menu"
                      aria-controls={menuId}
                      aria-expanded={isOpen}
                      onClick={() => setOpenDropdownId(isOpen ? null : item.id)}
                      onKeyDown={event => {
                        if (event.key === 'ArrowDown') {
                          event.preventDefault();
                          setOpenDropdownId(item.id);
                        }
                      }}
                    >
                      {leading}<span>{item.label}</span><ChevronDown className="cvp-breadcrumb__chevron" aria-hidden="true" />
                    </button>
                    {isOpen && (
                      <ul id={menuId} ref={node => { menuRefs.current[item.id] = node; }} className="cvp-breadcrumb__menu" role="menu" aria-label={`${item.label} destinations`} onKeyDown={event => handleMenuKeyDown(event, item.id)}>
                        {item.dropdown!.map((option, optionIndex) => {
                          const OptionIcon = option.icon;
                          return <React.Fragment key={option.id}>
                            {option.separator && optionIndex > 0 && <li className="cvp-breadcrumb__menu-divider" role="separator" />}
                            <li role="none">
                              {option.href && !option.disabled ? (
                                <a className="cvp-breadcrumb__menu-item" role="menuitem" href={option.href} onClick={event => { if (option.onClick) { event.preventDefault(); activate(option); } }}>{OptionIcon && <OptionIcon aria-hidden="true" />}<span>{option.label}</span></a>
                              ) : (
                                <button type="button" className="cvp-breadcrumb__menu-item" role="menuitem" aria-disabled={option.disabled || undefined} disabled={option.disabled} onClick={() => activate(option)}>{OptionIcon && <OptionIcon aria-hidden="true" />}<span>{option.label}</span></button>
                              )}
                            </li>
                          </React.Fragment>;
                        })}
                      </ul>
                    )}
                  </span>
                ) : isCurrent ? (
                  <span className="cvp-breadcrumb__current" aria-current="page">{leading}<span>{item.label}</span></span>
                ) : (
                  <a className="cvp-breadcrumb__action" href={item.href || '#'} onClick={event => { if (item.onClick || !item.href) event.preventDefault(); item.onClick?.(); }}>{leading}<span>{item.label}</span></a>
                )}
              </li>
              {!isCurrent && <li className="cvp-breadcrumb__separator" aria-hidden="true">{separator || <ChevronRight />}</li>}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
