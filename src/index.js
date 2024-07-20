import React from "react";
import ReactDOM from "react-dom";
import { ContextProvider } from './Context';
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(<ContextProvider><App /></ContextProvider>, rootElement);

