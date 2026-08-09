
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  const previewTheme = new URLSearchParams(window.location.search).get('theme');
  if (previewTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    document.body.setAttribute('data-theme', 'light');
  } else if (previewTheme === 'dark') {
    document.documentElement.removeAttribute('data-theme');
    document.body.removeAttribute('data-theme');
  }

  createRoot(document.getElementById("root")!).render(<App />);
