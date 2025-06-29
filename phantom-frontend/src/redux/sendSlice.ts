import {createSlice, type PayloadAction, type Slice} from "@reduxjs/toolkit";
import type {SendState} from "../types/SendStateTypes";

const initialState: SendState = {
    send: false
}

export const sendSlice:Slice = createSlice({
    name: 'send',
    initialState,
    reducers: {
        setSendActive: (state: SendState,action:PayloadAction<boolean>):void => {
            state.send = action.payload
        },
        setSendDeactive: (state:SendState,action:PayloadAction<boolean>):void => {
            state.send = action.payload
        }
    }
})

export const {setSendActive, setSendDeactive} = sendSlice.actions
export default sendSlice.reducer