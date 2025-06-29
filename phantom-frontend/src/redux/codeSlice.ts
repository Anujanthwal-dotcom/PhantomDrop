import { createSlice,type PayloadAction, type Slice } from "@reduxjs/toolkit";
import {type CodeState } from '../types/CodeType'

const initialState:CodeState= {
    code:null
}

export const codeSlice:Slice = createSlice({
    name:'file',
    initialState,
    reducers:{
        setCode: (state:CodeState,action:PayloadAction<string>):void =>{
            state.code = action.payload
        },
        removeCode: (state:CodeState,action:PayloadAction<null>):void=>{
            state.code = action.payload
        }
    }
})

export default codeSlice.reducer
export const {setCode, removeCode} = codeSlice.actions