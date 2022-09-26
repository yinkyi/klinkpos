// import {createStore} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';
import cartSliceReducer from "./cart-slice";
import searchSliceReducer from "./search-slice"
const store = configureStore({
    reducer:{auth:authReducer,cart:cartSliceReducer,search:searchSliceReducer}
})



export default store;