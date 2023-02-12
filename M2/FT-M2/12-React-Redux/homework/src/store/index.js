import { createStore, applyMiddleware } from "redux";
import reducer from "../reducers/index";
import thunk from "redux-thunk"; // middleware para asyncronismo

// import composeWithDevtools
// constwindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
// v6 --> const 3 = createSlice --> podriamos tener slices

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
