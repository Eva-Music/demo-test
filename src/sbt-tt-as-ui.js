import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { App } from "./pages/cards/index";
import "@cloudscape-design/global-styles/index.css";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
