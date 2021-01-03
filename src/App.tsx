import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.less";
import VRouter from "./router/router";
import store from "./store";

function App() {
  return (
    <div className="APP">
      <Provider store={store}>
        <BrowserRouter>
          <VRouter></VRouter>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
