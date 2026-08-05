import React from 'react';
import { Maximize2 } from 'lucide-react';

export function RailDetailsDocumentation() {
  const openFullPage = () => {
    window.open(`${window.location.pathname}?page=rail-details-full`, '_blank');
  };

  return (
    <>
      <style>{`
        .rail-details-docs {
          padding: 48px 0;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        }

        .rail-details-docs__header {
          margin-bottom: 48px;
        }

        .rail-details-docs__title {
          font-size: 32px;
          font-weight: 700;
          line-height: 40px;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .rail-details-docs__description {
          font-size: var(--type-scale-l-size);
          line-height: var(--type-scale-l-line-height);
          color: var(--text-muted);
          margin-bottom: 24px;
        }

        .rail-details-docs__section {
          margin-bottom: 48px;
        }

        .rail-details-docs__section h2 {
          font-size: 24px;
          font-weight: 600;
          line-height: 32px;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .rail-details-docs__section p {
          font-size: var(--type-scale-m-size);
          line-height: var(--type-scale-m-line-height);
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .rail-details-docs__preview-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .rail-details-docs__open-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          font-size: 13px;
          font-weight: 500;
          color: var(--foreground);
          background: var(--secondary);
          border: 1px solid var(--border-default);
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.15s ease;
          font-family: inherit;
        }

        .rail-details-docs__open-btn:hover {
          background: var(--bg-hover);
        }

      `}</style>

      <div className="rail-details-docs">
        <div className="rail-details-docs__header">
          <h1 className="rail-details-docs__title">Rail Details Page</h1>
          <p className="rail-details-docs__description">
            A professional content rail management interface for broadcast and OTT operators. Configure collections, manage metadata, and preview content with status tracking, position controls, and streamlined editing workflows.
          </p>
        </div>

        {/* Preview */}
        <div className="rail-details-docs__section">
          <div className="rail-details-docs__preview-bar">
            <h2 style={{ margin: 0 }}>Preview</h2>
            <button
              className="rail-details-docs__open-btn"
              onClick={openFullPage}
            >
              <Maximize2 size={13} />
              Open full page
            </button>
          </div>
          <p>
            The Rail Details page provides broadcast and OTT operators with a dedicated workspace for managing content rails. The layout combines a compact sidebar for configuration with a main content area for preview and management.
          </p>
        </div>
      </div>
    </>
  );
}
