import {thunkAuth} from "../auth/Auth";
import {thunks} from "../Todo/ToDoReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const thunkApp = {
    initializeApp: createAsyncThunk("app/initializeApp",
        async (params, {dispatch}) => {
            await dispatch(thunkAuth.authMe())

        })
}

export type InitialAppStateType = {
    networkError: string
    clientsError: string[]
    // waitingList: { [key: string]: boolean }
    isWaitingApp: boolean
    isInitialization: boolean
}

const initialState: InitialAppStateType = {
    networkError: '',
    clientsError: [],
    // waitingList: {},
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
        // addWaitingList: (state, action: PayloadAction<string>) => {
        //     state.waitingList[action.payload] = true
        // },
        // removeWaitingList: (state, action: PayloadAction<string>) => {
        //     delete state.waitingList[action.payload]
        // },
        toggleIsWaitingApp: (state, action: PayloadAction<boolean>) => {
            state.isWaitingApp = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(thunkApp.initializeApp.pending, (state) => {
                state.isInitialization = true
            }).addCase(thunkApp.initializeApp.fulfilled, (state) => {
            state.isInitialization = false
        })
    }

})

export const appReducer = appSlice.reducer
export const actionsApp = appSlice.actions
