import { createSlice,type PayloadAction, type Slice } from "@reduxjs/toolkit";
import {type FileState } from '../types/FileType'

const initialState:FileState = {
    file:null
}

export const fileSlice:Slice = createSlice({
    name:'file',
    initialState,
    reducers:{
        setFile: (state:FileState,action:PayloadAction<File>):void =>{
            state.file = action.payload
        },
        removeFile: (state:FileState,action:PayloadAction<null>):void=>{
            state.file = action.payload
        }
    }
})

export default fileSlice.reducer
export const {setFile, removeFile} = fileSlice.actions