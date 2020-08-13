import Index from "../page/Index";
const routes = [{
  path: "/",
  component: Index,
  childRoutes: [
    { path: "about", component: "" },
    { path: "inbox", component: "" },
  ],
}];
export default routes;
