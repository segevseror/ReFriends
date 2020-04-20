import loggedReducer from "./isLogged";
import userNameState from "./userName"
import { combineReducers } from "redux";

const globalReducers = combineReducers({
  logged: loggedReducer,
  name: userNameState
});

export default globalReducers;
