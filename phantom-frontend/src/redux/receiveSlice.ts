import {createSlice, type PayloadAction, type Slice} from "@reduxjs/toolkit";
import type {ReceiveState}from "../types/ReceiveStateTypes.ts";

const initialState: ReceiveState = {
    receive:false
}

export const receiveSlice:Slice = createSlice({
    name: 'receive',
    initialState,
    reducers: {
        setReceiveActive: (state:ReceiveState,action:PayloadAction<boolean>):void => {
            state.receive = action.payload
        },
        setReceiveDeactive: (state:ReceiveState,action:PayloadAction<boolean>):void => {
            state.receive = action.payload
        }
    }
})


export const {setReceiveActive, setReceiveDeactive} = receiveSlice.actions
export default receiveSlice.reducer