import { setCurrentTypes, SET_CURRENT } from "../actions/route.action";

export const currentRoute = (state: any = {}, action: setCurrentTypes) => {
  switch (action.type) {
    case SET_CURRENT:
      return action.route;
    default:
      return state;
  }
};
