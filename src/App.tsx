import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Index from "./page/Index/Index";
import About from "./page/About/About";
import "./App.less";

function App() {
  return (
    <div className="APP">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Index></Index>
          </Route>
          <Route path="/about" exact>
            <About></About>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
