import {
  setCurrentNameTypes,
  setCurrentTypes,
  SET_CURRENT,
  SET_CURRENT_NAME,
} from "../actions/route.action";

type ModeifyAction = setCurrentTypes | setCurrentNameTypes;

export const currentRoute = (state: any = {}, action: ModeifyAction) => {
  switch (action.type) {
    case SET_CURRENT:
      return action.route;
    case SET_CURRENT_NAME:
      return { ...state, ...{ name: action.name } };
    default:
      return state;
  }
};
