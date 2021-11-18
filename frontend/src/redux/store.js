import { configureStore } from "@reduxjs/toolkit";

import animalsReducer from './slice/animal.slice'

export const store = configureStore({
    reducer:{
        animals: animalsReducer
    }
}) 