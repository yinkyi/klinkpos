// import {createStore} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';
import cartSliceReducer from "./cart-slice"
const store = configureStore({
    reducer:{auth:authReducer,cart:cartSliceReducer}
})



export default store;