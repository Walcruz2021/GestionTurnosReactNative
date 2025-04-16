import {GET_CLIENTS} from '../actions/actionsClients';

const initialState = {
  allClients: [],
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLIENTS:
      return {...state, allClients: action.payload};

    case 'POST_CLIENT':
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default clientReducer;
