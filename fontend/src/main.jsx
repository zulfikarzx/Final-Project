import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartProvider } from "./Components/Cart/Cart";
import { AdminAuthProvider } from "./Components/Context/AdminAuth";
import { AuthProvider } from "./Components/Context/Auth";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminAuthProvider>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </AdminAuthProvider>
  </StrictMode>
);
