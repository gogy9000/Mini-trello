
import {thunkAuth} from "../auth/Auth";
import {thunks} from "../Todo/ToDoReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const thunkApp = {
    initializeApp: createAsyncThunk( "app/initializeApp",
        (params,{dispatch}) =>{
            const response1 =dispatch(thunkAuth.authMe())
        // @ts-ignore
            const response2 =dispatch(thunks.getTodolistAndTasks())
       return  Promise.allSettled([response1, response2]).then(() => {
            return false

        })
    })
}

export type InitialAppStateType ={
    networkError: string
    clientsError:  string[]
    waitingList: { [key: string]: boolean }
    isWaitingApp: boolean
    isInitialization: boolean
}

const initialState:InitialAppStateType = {
    networkError: '',
    clientsError: [] ,
    waitingList: {} ,
    isWaitingApp: false,
    isInitialization: false
}

 const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeHandleNetworkError: (state, action: PayloadAction<string>) => {
            state.networkError = action.payload
        },
        changeHandleClientsError: (state, actions: PayloadAction<string[]>) => {
            state.clientsError = actions.payload
        },
        addWaitingList: (state, action: PayloadAction<string>) => {
            state.waitingList[action.payload] = true
        },
        removeWaitingList: (state, action: PayloadAction<string>) => {
            delete state.waitingList[action.payload]
        },
        toggleIsWaitingApp: (state, action: PayloadAction<boolean>) => {
            state.isWaitingApp = action.payload
        },
    },
     extraReducers:(builder)=>{
        builder
            .addCase(thunkApp.initializeApp.pending,(state)=>{
            state.isInitialization=true
        }).addCase(thunkApp.initializeApp.fulfilled,(state,action)=>{
            state.isInitialization=action.payload
        })
             }

})

export const appReducer = appSlice.reducer
export const actionsApp = appSlice.actions
