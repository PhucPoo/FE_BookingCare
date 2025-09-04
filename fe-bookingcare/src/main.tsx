import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "@ant-design/v5-patch-for-react-19";
import "./index.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);
