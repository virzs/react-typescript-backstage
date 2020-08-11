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
          <Route path="/about" component={About} exact></Route>
          <Route path="/" component={Index} exact></Route>
          {/* 错误页面 */}
          <Route
            render={() => {
              return <h1>错误</h1>;
            }}
          ></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
