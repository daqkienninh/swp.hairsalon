import { combineReducers, createReducer } from '@reduxjs/toolkit'
import useReducer from '../redux/features/userSlice'
import cartReducer from '../redux/features/cartSlice'
import counterReducer from '../../src/redux/features/counterSlice'

export const rootReducer = combineReducers ({
    user: useReducer,
    cart: cartReducer,
    counter: counterReducer,
})