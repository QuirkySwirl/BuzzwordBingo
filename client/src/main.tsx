import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Force dark mode
document.documentElement.classList.add('dark');
document.documentElement.setAttribute('data-theme', 'dark');

createRoot(document.getElementById("root")!).render(<App />);
