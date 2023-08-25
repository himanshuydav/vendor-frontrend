import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/auth/authSlice'
import ContractReducer from '../redux/staff/ContractSlice'




export const store = configureStore({
    reducer: {
        auth: authReducer,
        contract:ContractReducer
    },
})