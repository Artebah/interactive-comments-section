// react
import React from "react";
import ReactDOM from "react-dom/client";
// global styles and font
import "./index.css";
import "@fontsource/rubik";
// mui
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme";
// components
import App from "./App";
// redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
);
