import {AppDispatchType, AppThunk} from "./ReduxStore";
import {thunkAuth} from "./auth/Auth";
import {thunks} from "./ToDoReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


let initState = {
    networkError: '',
    clientsError: [] as string[],
    waitingList: {} as { [key: string]: boolean },
    isWaitingApp: false,
    isInitialization: false
}

export const appSlice = createSlice({
    name: 'app',
    initialState: initState,
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
    }
})

export const appReducer = appSlice.reducer

export const actionsApp = appSlice.actions

export const thunkApp = {
    initializeApp: (): AppThunk => async (dispatch: AppDispatchType) => {
        dispatch(actionsApp.setIsInitialization(true))
        const response1 = await dispatch(thunkAuth.authMe())
        const response2 = await dispatch(thunks.getTodolistAndTasks())
        Promise.allSettled([response1, response2]).then((res) => {
            dispatch(actionsApp.setIsInitialization(false))
        })
    }
}