import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/app/App";
import registerServiceWorker from "./registerServiceWorker";

// global assets
import "./index.css";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
