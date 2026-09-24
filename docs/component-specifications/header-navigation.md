---
assetId: header-navigation
classification: component
lifecycle: approved
specificationStatus: draft
---
# Header Navigation

## Purpose

Header Navigation establishes application identity and provides persistent access to account, team, user, and theme controls in the application header.

## When to use

- An application needs one consistent header for branding and global controls.
- Users switch between accounts or teams and need the current context to remain visible.
- Profile actions, theme selection, and sign-out need persistent access.
- The header must support a fixed or static placement within the application shell.

Choose placement according to how the header participates in the shell:

- **Fixed:** use in the production application shell so global context and actions remain available while page content scrolls.
- **Static:** use when Header Navigation is composed inside a preview or another layout that owns page positioning.

Choose the visible context according to the product workflow:

- **Account selector:** show when people can change tenant or workspace context; keep the current account visible.
- **Team selector:** show when team context changes the work being viewed or edited.
- **Global help:** use for assistance that applies across the application, not one page.
- **User menu:** keep identity, account details, theme selection, and sign-out grouped as global user actions.

Use the fixed header density and responsive layout consistently:

- **Header height:** preserve the component's 48px application-bar height; Header Navigation does not provide alternate density variants.
- **Desktop:** show full product, account, team, help, and user context when each is relevant.
- **Tablet:** condense labels while preserving current context and access to global menus.
- **Mobile:** prioritize product identity, account context, and user access without moving page-specific actions into the header.

Account for these menu states:

- **Closed:** keep the selected account and team visible without exposing menu contents.
- **Account or team menu open:** expose the selected option and available contexts as a single keyboard-operable menu.
- **User menu open:** show identity and global user actions, with sign-out visually and structurally separated from preferences.

## When not to use

- The surface needs only a logo and a small number of links; use a simpler header composition.
- The navigation is local to one page or section; use page-level navigation.
- Account or team switching is not part of the product workflow.
