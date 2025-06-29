import {configureStore, type EnhancedStore} from '@reduxjs/toolkit'
import sendReducer from './sendSlice'
import receiveReducer from './receiveSlice'
import fileReducer from './fileSlice'
import codeReducer from './receiveSlice'

export const store:EnhancedStore = configureStore({
    reducer:{
        send: sendReducer,
        receive: receiveReducer,
        file:fileReducer,
        code:codeReducer
    }
})

export type RootState = ReturnType<typeof store.getState>