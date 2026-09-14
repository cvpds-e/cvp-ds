import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PrototypeApp } from './PrototypeApp';
import '@cvp/design-system/tokens.css';

document.documentElement.dataset.theme = 'dark';
createRoot(document.getElementById('root')!).render(<StrictMode><PrototypeApp /></StrictMode>);
