
import {thunkAuth} from "./auth/Auth";
import {thunks} from "./ToDoReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const thunkApp = {
    initializeApp: createAsyncThunk( "app/initializeApp",
        (params,{dispatch}) =>{
            dispatch(actionsApp.setIsInitialization(true))
            const response1 =dispatch(thunkAuth.authMe())
        // @ts-ignore
            const response2 =dispatch(thunks.getTodolistAndTasks())
        Promise.allSettled([response1, response2]).then(() => {
            dispatch(actionsApp.setIsInitialization(false))
        })
    })
}



const initialState = {
    networkError: '',
    clientsError: [] as string[],
    waitingList: {} as { [key: string]: boolean },
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
        setIsInitialization: (state, action: PayloadAction<boolean>) => {
            state.isInitialization = action.payload
        },
    },

})

export const appReducer = appSlice.reducer
export const actionsApp = appSlice.actions
