import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {actions, toDoReducer} from './ToDoReducer';
import {loadState, saveState} from "../local-storage-utils/Local-storage-utils";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {composeWithDevTools} from "@redux-devtools/extension";
import {actionsApp, appReducer, thunkApp} from "./AppReducer";
import {actionsAuth, authReducer} from "./auth/Auth";


export type InferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type InferThunksType<T> = T extends { [keys: string]: (...args: any[]) => (dispatch: AppDispatchType, getState: AppRootStateType) => infer U } ? Promise<U> : never
export type UnionThunkType = InferThunksType<typeof thunkApp>
export type UnionActionsType = InferActionsType<typeof actions | typeof actionsApp | typeof actionsAuth>
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, UnionActionsType>
export type AppThunk<ReturnType = any> = ThunkAction<ReturnType, AppRootStateType, unknown, UnionActionsType>

const persistState = loadState()

const composeEnhancers = composeWithDevTools({
    trace: true,
    traceLimit: 10
});


let rootReducer = combineReducers({
    toDoReducer,
    appReducer,
    authReducer
})


export let store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

store.subscribe(() => {
    // saveState(store.getState())
})

// @ts-ignore
window.store = store
