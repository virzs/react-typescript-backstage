import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "./App.less";
import { GlobalLoading } from "./components/Global_Loading/GlobalLoading";
import VRouter from "./router/router";
import store, { persistor } from "./store";

function App() {
  return (
    <div className="APP">
      <Provider store={store}>
        <PersistGate loading={<GlobalLoading />} persistor={persistor}>
          <BrowserRouter>
            <VRouter></VRouter>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
