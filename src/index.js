import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import store from "./Redux/store";
import "./index.css";

import useLocalStorageUser from "./Hooks/useLocalStorageUser";

const GoogleclientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function LocalStorageProvider({ children }) {
  useLocalStorageUser();

  return <>{children}</>;
}

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={GoogleclientID}>
      <BrowserRouter>
        <LocalStorageProvider>
          <App />
        </LocalStorageProvider>
      </BrowserRouter>
      <Toaster />
    </GoogleOAuthProvider>
  </Provider>
);
