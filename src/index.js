import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./Redux/store";
import "./index.css";

import useLocalStorageUser from "./Hooks/useLocalStorageUser";

function LocalStorageProvider({ children }) {
  useLocalStorageUser();

  return <>{children}</>;
}

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <LocalStorageProvider>
        <App />
      </LocalStorageProvider>
    </BrowserRouter>
  </Provider>
);
