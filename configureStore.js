// import { createStore } from 'redux';

// const initialState = {}; 

// const reducer = (state = initialState, action) => state; 

// const configureStore = () => {
//   return createStore(reducer);
// };

// export default configureStore;
// *****************************************************



import { configureStore } from '@reduxjs/toolkit';
import authReducer from './src/store/reducer/authReducer';
import clientReducer from './src/store/reducer/clientReducer';
import turnReducer from './src/store/reducer/turnReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientReducer,
    turns: turnReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;

//Desde Redux v4, createStore fue descontinuado y ahora se usa configureStore de @reduxjs/toolkit. Si sigues usando createStore, debes usar legacy_createStore.



// ***************************************************


// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './src/store/reducer'

// const configureStore = () => {
//   return createStore(rootReducer, applyMiddleware(thunk));
// };

// export default configureStore;