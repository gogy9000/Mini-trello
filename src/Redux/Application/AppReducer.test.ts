import {appReducer, InitialAppStateType, thunkApp} from "./AppReducer";

let state:InitialAppStateType
beforeEach(()=>{
    state={
        networkError: '',
        clientsError: [] ,
        waitingList: {} ,
        isWaitingApp: false,
        isInitialization: false
    }
})

test("isInitialization should be true",()=>{
    let action= thunkApp.initializeApp.pending("")
    let newState=appReducer(state,action)
    expect(newState.isInitialization).toBe(true)
})
test("isInitialization should be false",()=>{
    let action= thunkApp.initializeApp.fulfilled(false,"")
    let newState=appReducer(state,action)
    expect(newState.isInitialization).toBe(false)
})