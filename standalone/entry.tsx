import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BeadStudio } from "../app/BeadStudio";
import "../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BeadStudio />
  </StrictMode>,
);
