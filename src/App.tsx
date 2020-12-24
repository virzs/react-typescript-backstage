import React from "react";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import "./App.less";
import VRouter from "./router/router";
import store from "./store";

function App() {
  return (
    <div className="APP">
      <Provider store={store}>
        <Router>
          <VRouter></VRouter>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
