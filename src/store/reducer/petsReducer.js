import ADD_PETS from '../actions/actionsPets';

const initialState = {};

const petsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PETS:
        return {
            ...state,
          };
    default:
      return state;
  }
};


export default petsReducer
