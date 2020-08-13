import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Index from "./page/Index";
import About from "./page/About";
import Error from "./page/Error";
import "./App.less";

function App() {
  return (
    <div className="APP">
      <BrowserRouter>
        <Switch>
          <Route path="/about" component={About} exact></Route>
          <Route path="/" component={Index} exact></Route>
          {/* 错误页面 */}
          <Route component={Error}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
