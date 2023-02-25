import { configureStore } from "@reduxjs/toolkit";

import alertReducer from './alertSlice';
import userReducer from './userSlice';


const store = configureStore({
    reducer: {
        alertLoad: alertReducer,
        userAllData: userReducer
    }
});


export default store;