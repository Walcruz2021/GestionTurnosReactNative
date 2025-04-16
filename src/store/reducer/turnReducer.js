import {GET_TURNOS, DELETE_TURNO, UPDATE_TURNO} from '../actions/actionsTurnos';

const initialState = {
  allTurnos: [],
};

const turnReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TURNOS:
      return {...state, allTurnos: action.payload};
    case DELETE_TURNO:
      return {
        ...state,
      };

    case UPDATE_TURNO:
      return {
        ...state,
        allTurnos: action.payload,
      };

    case 'POST_TURNOS':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default turnReducer;
