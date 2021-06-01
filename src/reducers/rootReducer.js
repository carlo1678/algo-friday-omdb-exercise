import {
  SWITCH_NAME,
  SET_LOADING,
  INITIAL_LOADING,
} from "../action-types/action-types";

const initialState = {
  userName: "",
  loading: false,
};

function rootReducer(state = initialState, action, event) {
  switch (action.type) {
    case SWITCH_NAME:
      return { userName: "Carlito" };
    case SET_LOADING:
      return { ...state, loading: true };
    case INITIAL_LOADING:
      return { state };
    default:
      return state;
  }
}

export default rootReducer;
