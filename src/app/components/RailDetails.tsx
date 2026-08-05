import React, { useState } from 'react';
import { ChevronDown, Copy, Eye, Save, Sparkles, Plus, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { OutlineButton } from './OutlineButton';
import { Breadcrumbs } from './Breadcrumbs';
import { NotificationBanner } from './NotificationBanner';
import { Tabs } from './Tabs';
import { TextButton } from './TextButton';
import { HeaderNavigation } from './HeaderNavigation';
import { RailContentGallery, RailContentItem } from './RailContentGallery';


interface RailDetailsProps {
  railName?: string;
  totalLabels?: number;
}

export function RailDetails({
  railName = "Trending",
  totalLabels = 22
}: RailDetailsProps) {
  const [activeTab, setActiveTab] = useState('trending');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['showing-type'])
  );

  const contentItems: RailContentItem[] = [
    { id: '1', title: 'The Dark Knight', year: '2008', thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=200&h=300&fit=crop', position: 1, metadata: { status: 'active' } },
    { id: '2', title: 'Inception', year: '2010', thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&h=300&fit=crop', position: 2, metadata: { status: 'active' } },
    { id: '3', title: 'Interstellar', year: '2014', thumbnail: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=200&h=300&fit=crop', position: 3, metadata: { status: 'active' } },
    { id: '4', title: 'Oppenheimer', year: '2023', thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=200&h=300&fit=crop', position: 4, metadata: { status: 'active' } },
    { id: '5', title: 'Tenet', year: '2020', thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=200&h=300&fit=crop', position: 5, metadata: { status: 'pinned' } },
    { id: '6', title: 'Batman Begins', year: '2005', thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=300&fit=crop', position: 6, metadata: { status: 'active' } },
    { id: '7', title: 'The Prestige', year: '2006', thumbnail: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=200&h=300&fit=crop', position: 7, metadata: { status: 'active' } },
    { id: '8', title: 'Memento', year: '2000', thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=300&fit=crop', position: 8, metadata: { status: 'inactive' } },
  ];

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <>
      <style>{`
        .rail-details-page {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          width: 100%;
          overflow-x: hidden;
          background-color: var(--bg-page);
          font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .rail-details-page__footer {
          position: sticky;
          bottom: 0;
          width: 100%;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0 24px;
          gap: 8px;
          background: var(--bg-page);
          border-top: 1px solid var(--border-default);
          z-index: 50;
          flex-shrink: 0;
          margin-top: auto;
          box-sizing: border-box;
        }

        /* Keep the header at the top and let the body fill remaining height */
        .rail-details-page .header-navigation {
          flex-shrink: 0;
          z-index: 10;
        }

        /* Full-width breadcrumb row between header and panels */
        .rail-details-page__breadcrumb-bar {
          flex-shrink: 0;
          border-bottom: 1px solid var(--border-default);
          background-color: var(--bg-surface);
        }

        /* Remove the double bottom border the Breadcrumbs component adds */
        .rail-details-page__breadcrumb-bar .breadcrumbs {
          border-bottom: none;
        }

        [data-theme="light"] .rail-details-page__breadcrumb-bar .breadcrumbs,
        .light-theme .rail-details-page__breadcrumb-bar .breadcrumbs {
          background-color: transparent;
        }

        .rail-details-page__body {
          flex: 1;
          display: flex;
          min-height: 0;
          overflow: hidden;
        }

        .rail-details {
          display: flex;
          flex: 1;
          min-width: 0;
          overflow: hidden;
          background-color: var(--bg-page);
          font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        /* Left Sidebar */
        .rail-details__sidebar {
          width: 260px;
          background-color: var(--bg-surface);
          border-right-width: 1px;
          border-right-style: solid;
          border-right-color: var(--border-default);
          border-radius: 2px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          transition: width 0.2s ease, box-shadow 0.15s ease;
          overflow: hidden;
        }

        .rail-details__sidebar:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .rail-details__sidebar--collapsed {
          width: 0;
          overflow: hidden;
          border-right: none;
          box-shadow: none;
        }

        /* Collapse toggle button — shared between left and right panel headers */
        .rail-details__panel-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          background: transparent;
          border: none;
          border-radius: 4px;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0;
          flex-shrink: 0;
          transition: background-color 0.15s ease, color 0.15s ease;
        }

        .rail-details__panel-toggle:hover {
          background-color: var(--bg-hover);
          color: var(--text-primary);
        }

        .rail-details__panel-toggle:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--focus-ring, var(--border-focus));
        }

        /* Right-panel header bar — mirrors the left sidebar header */
        .rail-details__main-header {
          height: 44px;
          padding: 0 24px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid var(--border-default);
          background-color: var(--bg-surface);
          flex-shrink: 0;
        }

        .rail-details__main-header-title {
          font-size: 14px;
          font-weight: 600;
          line-height: 20px;
          letter-spacing: 0.1px;
          color: var(--foreground);
          margin: 0;
        }

        .rail-details__sidebar-header-main {
          height: 44px;
          padding: 0 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom-width: 1px;
          border-bottom-style: solid;
          border-bottom-color: var(--border-default);
          background-color: var(--bg-surface);
          flex-shrink: 0;
        }

        .rail-details__sidebar-header-title {
          font-size: 14px;
          font-weight: 600;
          line-height: 20px;
          letter-spacing: 0.1px;
          color: var(--foreground);
          margin: 0;
        }

        .rail-details__sidebar-content-wrapper {
          flex: 1;
          overflow-y: auto;
          padding: 0;
        }

        /* Tabs in sidebar — layout only, indicator inherits from base Tabs component */
        .rail-details__sidebar .tabs {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .rail-details__sidebar .tabs-list {
          display: flex;
        }

        /* Each trigger fills equal share of the full panel width */
        .rail-details__sidebar .tabs-trigger {
          flex: 1;
          text-align: center;
        }

        /* Override the fixed 20px inset so the indicator spans nearly the full
           button width — appropriate for full-width tabs in a narrow panel */
        .rail-details__sidebar .tabs-trigger[aria-selected="true"]::after {
          left: 4px;
          right: 4px;
        }

        .rail-details__sidebar .tabs-content {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding-top: 0;
        }

        .rail-details__sidebar .tabs-content > div {
          padding: 0;
        }

        .rail-details__sidebar-section {
          margin-bottom: 0;
        }

        .rail-details__sidebar-section:not(:last-child) {
          margin-bottom: 4px;
        }

        .rail-details__sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 400;
          line-height: 20px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .rail-details__sidebar-header:hover {
          background-color: var(--bg-hover);
          color: var(--text-primary);
        }

        .rail-details__sidebar-header-icon {
          transition: transform 0.15s ease;
          color: var(--icon-muted);
        }

        .rail-details__sidebar-header-icon--expanded {
          transform: rotate(180deg);
        }

        /* Form field styles */
        .rail-details__form {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .rail-details__form-section-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
          padding: 12px 16px 8px 16px;
          margin: 0;
        }

        .rail-details__form-field {
          padding: 6px 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .rail-details__form-label {
          font-size: 12px;
          font-weight: 500;
          color: var(--text-secondary);
          line-height: 16px;
        }

        .rail-details__form-input,
        .rail-details__form-select {
          width: 100%;
          padding: 6px 10px;
          font-size: 13px;
          line-height: 18px;
          font-family: inherit;
          color: var(--text-primary);
          background-color: var(--bg-page);
          border: 1px solid var(--border-default);
          border-radius: 4px;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.15s ease;
          appearance: none;
          -webkit-appearance: none;
        }

        .rail-details__form-select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 8px center;
          padding-right: 28px;
        }

        .rail-details__form-input:focus,
        .rail-details__form-select:focus {
          border-color: var(--border-focus);
          box-shadow: 0 0 0 2px rgba(61, 99, 221, 0.15);
        }

        .rail-details__form-input-number {
          width: 100%;
          padding: 6px 10px;
          font-size: 13px;
          line-height: 18px;
          font-family: inherit;
          color: var(--text-primary);
          background-color: var(--bg-page);
          border: 1px solid var(--border-default);
          border-radius: 4px;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.15s ease;
        }

        .rail-details__form-input-number:focus {
          border-color: var(--border-focus);
          box-shadow: 0 0 0 2px rgba(61, 99, 221, 0.15);
        }

        .rail-details__form-hint {
          font-size: 11px;
          color: var(--text-muted);
          line-height: 15px;
          padding: 4px 16px 8px 16px;
        }

        /* Pill groups */
        .rail-details__pill-group {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .rail-details__pill {
          padding: 3px 10px;
          font-size: 12px;
          font-weight: 500;
          line-height: 18px;
          border-radius: 20px;
          border: 1px solid var(--border-default);
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          font-family: inherit;
          transition: all 0.15s ease;
        }

        .rail-details__pill:hover {
          background: var(--bg-hover);
          color: var(--text-primary);
          border-color: var(--border-strong);
        }

        .rail-details__pill--active {
          background: rgba(61, 99, 221, 0.12);
          border-color: var(--border-focus);
          color: var(--border-focus);
        }

        /* Filter search */
        .rail-details__filter-search {
          padding: 10px 16px 8px 16px;
          position: relative;
        }

        .rail-details__filter-search-input {
          width: 100%;
          padding: 6px 10px;
          font-size: 12px;
          line-height: 18px;
          font-family: inherit;
          color: var(--text-primary);
          background-color: var(--bg-page);
          border: 1px solid var(--border-default);
          border-radius: 4px;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.15s ease;
        }

        .rail-details__filter-search-input::placeholder {
          color: var(--text-muted);
        }

        .rail-details__filter-search-input:focus {
          border-color: var(--border-focus);
          box-shadow: 0 0 0 2px rgba(61, 99, 221, 0.15);
        }

        .rail-details__filter-section {
          border-top: 1px solid var(--border-default);
        }

        .rail-details__filter-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px 6px 16px;
        }

        .rail-details__filter-section-title {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          margin: 0;
        }

        .rail-details__filter-field {
          padding: 4px 16px 10px 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .rail-details__filter-label {
          font-size: 11px;
          font-weight: 500;
          color: var(--text-muted);
          line-height: 16px;
        }

        .rail-details__sidebar-content {
          display: none;
          padding: 4px 16px 8px 16px;
        }

        .rail-details__sidebar-content--expanded {
          display: block;
        }

        .rail-details__sidebar-item {
          padding: 6px 12px;
          font-size: 13px;
          line-height: 20px;
          color: var(--text-secondary);
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.15s ease;
          margin-bottom: 2px;
        }

        .rail-details__sidebar-item:hover {
          background-color: var(--bg-hover);
          color: var(--text-primary);
        }

        .rail-details__sidebar-divider {
          height: 1px;
          background-color: var(--border-default);
          margin: 12px 16px;
        }

        /* Main Content Area */
        .rail-details__main {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* Breadcrumbs Navigation */
        .rail-details__breadcrumbs-nav {
          background-color: var(--bg-surface);
          border-bottom-width: 1px;
          border-bottom-style: solid;
          border-bottom-color: var(--border-default);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          height: 44px;
        }

        /* Remove border-bottom from Breadcrumbs component in Rail Details */
        .rail-details__breadcrumbs-nav .breadcrumbs {
          border-bottom: none;
        }

        /* Ensure no background in light theme */
        [data-theme="light"] .rail-details__breadcrumbs-nav .breadcrumbs,
        .light-theme .rail-details__breadcrumbs-nav .breadcrumbs {
          background-color: transparent;
        }

        .rail-details__nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .rail-details__team-dropdown {
          padding: 6px 12px;
          font-size: 13px;
          line-height: 20px;
          background-color: transparent;
          border-width: 1px;
          border-style: solid;
          border-color: var(--border-default);
          border-radius: 4px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.15s ease;
          font-family: inherit;
        }

        .rail-details__team-dropdown:hover {
          border-color: var(--border-strong);
          color: var(--text-primary);
        }

        .rail-details__team-dropdown:focus {
          outline: 2px solid var(--border-focus);
          outline-offset: 2px;
          box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25);
        }

        /* Content Header */
        .rail-details__content-header {
          background-color: var(--bg-page);
          padding: 24px 24px 16px 24px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .rail-details__content-header-left {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .rail-details__content-title {
          font-size: 14px;
          font-weight: 600;
          line-height: 20px;
          letter-spacing: 0px;
          color: var(--text-primary);
          margin: 0;
        }

        /* Badges */
        .rail-details__badges {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .rail-details__badge {
          padding: 4px 10px;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 500;
          line-height: 16px;
          border: 1px solid;
        }

        .rail-details__badge--success {
          background-color: var(--state-success-bg);
          border-color: var(--state-success-border);
          color: var(--state-success-text);
        }

        .rail-details__badge--neutral {
          background-color: var(--chip-bg);
          border-color: var(--chip-border);
          color: var(--chip-text);
        }

        .rail-details__badge--info {
          background-color: var(--state-info-bg);
          border-color: var(--state-info-border);
          color: var(--state-info-text);
        }

        /* Metadata */
        .rail-details__metadata {
          display: flex;
          align-items: center;
          gap: 24px;
          font-size: 13px;
          line-height: 20px;
        }

        .rail-details__metadata-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .rail-details__metadata-label {
          color: var(--text-muted);
        }

        :root[data-theme="dark"] .rail-details__metadata-label {
          color: #9b9ba5 !important;
        }

        .rail-details__metadata-value {
          color: var(--text-primary);
          font-weight: 400;
        }

        .rail-details__content-header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .rail-details__content-header-actions button {
          white-space: nowrap;
          min-height: 36px;
          box-sizing: border-box;
        }

        .rail-details__content-header-actions svg {
          margin-right: 6px;
          flex-shrink: 0;
          width: 14px;
          height: 14px;
        }


        /* Content Area */
        .rail-details__content {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 24px;
          min-width: 0;
          box-sizing: border-box;
        }

        /* Make gallery fluid within the panel */
        .rail-details__content .rail-content-gallery {
          --rail-gallery-container-max-width: 100%;
        }

        /* Rail Section */
        .rail-details__rail-section {
          margin-bottom: 32px;
        }

        .rail-details__rail-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .rail-details__rail-title {
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          color: var(--text-primary);
          margin: 0;
        }

        .rail-details__rail-header .text-button {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .rail-details__rail-scroll {
          overflow-x: auto;
          overflow-y: hidden;
          margin: 0 -24px;
          padding: 0 24px;
        }

        .rail-details__rail-scroll::-webkit-scrollbar {
          height: 8px;
        }

        .rail-details__rail-scroll::-webkit-scrollbar-track {
          background-color: var(--bg-page);
        }

        .rail-details__rail-scroll::-webkit-scrollbar-thumb {
          background-color: var(--border-strong);
          border-radius: 4px;
        }

        .rail-details__rail-scroll::-webkit-scrollbar-thumb:hover {
          background-color: var(--text-muted);
        }

        .rail-details__rail-items {
          display: flex;
          gap: 16px;
          padding-bottom: 8px;
        }

        .rail-details__rail-item {
          flex-shrink: 0;
          width: 120px;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .rail-details__rail-item:hover {
          transform: translateY(-4px);
        }

        .rail-details__rail-item-image {
          width: 120px;
          height: 180px;
          border-radius: 4px;
          overflow: hidden;
          background-color: var(--bg-surface-raised);
          margin-bottom: 8px;
        }

        .rail-details__rail-item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .rail-details__rail-item-title {
          font-size: 13px;
          font-weight: 400;
          line-height: 18px;
          color: var(--text-primary);
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* Preview Guide */
        .rail-details__preview-guide {
          margin-bottom: 24px;
        }

        .rail-details__preview-text {
          font-size: 13px;
          line-height: 20px;
          color: var(--text-secondary);
          margin: 0;
        }

        /* Scrollbar */
        .rail-details__content::-webkit-scrollbar {
          width: 8px;
        }

        .rail-details__content::-webkit-scrollbar-track {
          background-color: var(--bg-page);
        }

        .rail-details__content::-webkit-scrollbar-thumb {
          background-color: var(--border-strong);
          border-radius: 4px;
        }

        .rail-details__content::-webkit-scrollbar-thumb:hover {
          background-color: var(--text-muted);
        }

        .rail-details__sidebar-content-wrapper::-webkit-scrollbar {
          width: 6px;
        }

        .rail-details__sidebar-content-wrapper::-webkit-scrollbar-track {
          background-color: transparent;
        }

        .rail-details__sidebar-content-wrapper::-webkit-scrollbar-thumb {
          background-color: var(--muted);
          border-radius: 3px;
        }

        .rail-details__sidebar-content-wrapper::-webkit-scrollbar-thumb:hover {
          background-color: var(--accent);
        }

        /* Responsive Media Queries */
        @media (max-width: 1024px) {
          .rail-details__content-header {
            flex-direction: column;
            gap: 16px;
            align-items: stretch;
          }

          .rail-details__content-header-actions {
            flex-wrap: wrap;
            justify-content: flex-start;
          }
        }

        @media (max-width: 900px) {
          .rail-details__sidebar {
            width: 220px;
          }
          .rail-details__content {
            padding: 16px;
          }
        }

        @media (max-width: 680px) {
          .rail-details__sidebar {
            width: 0;
            border-right: none;
          }
          .rail-details__content {
            padding: 12px;
          }
          .rail-details-page__footer {
            padding: 0 12px;
          }
        }
      `}</style>

      <div className="rail-details-page">
        <HeaderNavigation
          variant="static"
          accounts={[
            { id: 'console-vms', name: 'Console VMS' },
            { id: 'enterprise-dashboard', name: 'Enterprise Dashboard' },
            { id: 'content-mgmt', name: 'Content Management Pro' },
          ]}
          selectedAccountId="console-vms"
          teams={[
            { id: 'content-team', name: 'Content Team' },
            { id: 'editorial-team', name: 'Editorial Team' },
            { id: 'operations-team', name: 'Operations Team' },
          ]}
          selectedTeamId="editorial-team"
          userName="Jane Doe"
          userEmail="jane.doe@doe.com"
        />

        {/* Full-width breadcrumb bar — spans both panels */}
        <div className="rail-details-page__breadcrumb-bar">
          <Breadcrumbs
            items={[
              { id: 'rails', label: 'Rails', href: '#' },
              { id: 'content-query', label: 'Content Query', href: '#' },
              { id: 'rail-name', label: railName }
            ]}
          />
        </div>

        <div className="rail-details-page__body">
      <div className="rail-details">
        {/* Left Sidebar */}
        <aside className={`rail-details__sidebar${sidebarCollapsed ? ' rail-details__sidebar--collapsed' : ''}`}>
          <div className="rail-details__sidebar-header-main" style={{ padding: '0px 24px' }}>
            <h3 className="rail-details__sidebar-header-title">Rail Manager</h3>
          </div>
          <Tabs
            tabs={[
              {
                id: 'base',
                label: 'Base',
                content: (
                  <div className="rail-details__sidebar-content-wrapper">
                    <p className="rail-details__form-section-label">Settings</p>

                    <div className="rail-details__form-field">
                      <label className="rail-details__form-label">Rail Name</label>
                      <input
                        type="text"
                        className="rail-details__form-input"
                        defaultValue={railName}
                      />
                    </div>

                    <div className="rail-details__form-field">
                      <label className="rail-details__form-label">Rail Status</label>
                      <select className="rail-details__form-select" defaultValue="active">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>

                    <div className="rail-details__form-field">
                      <label className="rail-details__form-label">Rail Collection</label>
                      <select className="rail-details__form-select" defaultValue="home">
                        <option value="home">Home</option>
                        <option value="movies">Movies</option>
                        <option value="series">Series</option>
                        <option value="sports">Sports</option>
                      </select>
                    </div>

                    <div className="rail-details__form-field">
                      <label className="rail-details__form-label">Rail Position</label>
                      <input
                        type="number"
                        className="rail-details__form-input-number"
                        defaultValue={2}
                        min={1}
                      />
                    </div>

                    <div className="rail-details__form-field">
                      <label className="rail-details__form-label">Number of Content Slots</label>
                      <input
                        type="number"
                        className="rail-details__form-input-number"
                        defaultValue={24}
                        min={1}
                        max={100}
                      />
                    </div>

                    <div className="rail-details__sidebar-divider" />

                    <p className="rail-details__form-section-label">Personalization</p>

                    <div className="rail-details__form-field">
                      <label className="rail-details__form-label">Personalization Configuration</label>
                      <select className="rail-details__form-select" defaultValue="general">
                        <option value="general">General Recommendations</option>
                        <option value="personal">Personalized</option>
                        <option value="editorial">Editorial</option>
                        <option value="trending">Trending</option>
                      </select>
                    </div>

                    <p className="rail-details__form-hint">
                      The ML model generates content recommendations for this rail based on the selected configuration.
                    </p>
                  </div>
                )
              },
              {
                id: 'content-query',
                label: 'Content Query',
                content: (
                  <div className="rail-details__sidebar-content-wrapper">
                    <div className="rail-details__filter-search">
                      <input
                        type="text"
                        className="rail-details__filter-search-input"
                        placeholder="Search filters..."
                      />
                    </div>

                    <div className="rail-details__filter-section">
                      <div className="rail-details__filter-section-header">
                        <p className="rail-details__filter-section-title">Listing Filters</p>
                      </div>

                      <div className="rail-details__filter-field">
                        <span className="rail-details__filter-label">Airing Type</span>
                        <div className="rail-details__pill-group">
                          {['New', 'Repeat', 'Live', 'Premiere'].map(p => (
                            <button key={p} className="rail-details__pill">{p}</button>
                          ))}
                        </div>
                      </div>

                      <div className="rail-details__filter-field">
                        <label className="rail-details__filter-label">Listing Format</label>
                        <select className="rail-details__form-select" defaultValue="">
                          <option value="" disabled>Select format...</option>
                          <option value="full">Full</option>
                          <option value="partial">Partial</option>
                          <option value="preview">Preview</option>
                        </select>
                      </div>

                      <div className="rail-details__filter-field">
                        <label className="rail-details__filter-label">Station ID</label>
                        <select className="rail-details__form-select" defaultValue="">
                          <option value="" disabled>Select station...</option>
                          <option value="s1">Station 1</option>
                          <option value="s2">Station 2</option>
                          <option value="s3">Station 3</option>
                        </select>
                      </div>
                    </div>

                    <div className="rail-details__filter-section">
                      <div className="rail-details__filter-section-header">
                        <p className="rail-details__filter-section-title">Showing Type</p>
                      </div>
                      <div className="rail-details__filter-field">
                        <div className="rail-details__pill-group">
                          {['Full', 'Partial', 'Season', 'Topset'].map(p => (
                            <button key={p} className={`rail-details__pill${p === 'Full' ? ' rail-details__pill--active' : ''}`}>{p}</button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="rail-details__filter-section">
                      <div className="rail-details__filter-section-header">
                        <p className="rail-details__filter-section-title">Media Filters</p>
                      </div>

                      <div className="rail-details__filter-field">
                        <label className="rail-details__filter-label">Availability State</label>
                        <select className="rail-details__form-select" defaultValue="">
                          <option value="" disabled>Select state...</option>
                          <option value="available">Available</option>
                          <option value="unavailable">Unavailable</option>
                          <option value="scheduled">Scheduled</option>
                        </select>
                      </div>

                      <div className="rail-details__filter-field">
                        <label className="rail-details__filter-label">Media Format</label>
                        <select className="rail-details__form-select" defaultValue="">
                          <option value="" disabled>Select format...</option>
                          <option value="hd">HD</option>
                          <option value="4k">4K</option>
                          <option value="sd">SD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )
              }
            ]}
            defaultTab="base"
          />
        </aside>

        {/* Main Content */}
        <main className="rail-details__main">
          {/* Right panel header — mirrors left sidebar header */}
          <div
            style={{
              height: '44px',
              padding: '0 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderBottom: '1px solid var(--border-default)',
              flexShrink: 0,
            }}
          >
            <button
              onClick={() => setSidebarCollapsed(v => !v)}
              aria-label={sidebarCollapsed ? 'Expand configuration panel' : 'Collapse configuration panel'}
              title={sidebarCollapsed ? 'Expand panel' : 'Collapse panel'}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                padding: '0',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                flexShrink: 0,
                color: '#9ca3af',
                backgroundColor: 'rgba(0,0,0,0)',
              }}
            >
              {sidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            </button>
            <h2
              style={{
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: '20px',
                letterSpacing: '0.1px',
                margin: 0,
                color: '#e5e7eb',
              }}
            >
              Content Preview
            </h2>
          </div>

          {/* Content Header */}
          {/* Content Area */}
          <div className="rail-details__content">
            {/* Content Provider Rail */}
            <RailContentGallery
              title={railName}
              items={contentItems}
              variant="display"
              showItemCount={true}
              showNavigation={true}
            />

          </div>
        </main>
      </div>
        </div>{/* rail-details-page__body */}
        {/* Footer overlay */}
        <div className="rail-details-page__footer">
          <OutlineButton>
            <Copy size={14} />
            Duplicate
          </OutlineButton>
          <OutlineButton>
            <Eye size={14} />
            Preview
          </OutlineButton>
          <PrimaryButton>
            <Save size={14} />
            Save Changes
          </PrimaryButton>
        </div>
      </div>{/* rail-details-page */}
    </>
  );
}
