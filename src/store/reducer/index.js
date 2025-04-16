import { combineReducers } from 'redux';
import authReducer from './authReducer';
import clientReducer from './clientReducer';
import turnReducer from './turnReducer';
import petsReducer from "./petsReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  clients: clientReducer,
  turns: turnReducer,
  pets:petsReducer
});

export default rootReducer;