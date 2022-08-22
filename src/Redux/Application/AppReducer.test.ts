import {actionsApp, appReducer, InitialAppStateType, thunkApp} from "./AppReducer";

let state:InitialAppStateType

beforeEach(()=>{
    state={
        networkError: '',
        clientsError: [] ,
        // waitingList: {} ,
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
    let state={
        networkError: '',
        clientsError: [] ,
        waitingList: {} ,
        isWaitingApp: false,
        isInitialization: true
    }
    let action= thunkApp.initializeApp.fulfilled
    let newState=appReducer(state,action)
    expect(newState.isInitialization).toBe(false)
})

describe("changeHandleClientsError",()=>{

it("networkError should be changed", ()=>{
    let action=actionsApp.changeHandleClientsError(["errorNetwork"])
    let newState=appReducer(state,action)
    expect(newState.clientsError.length).toBe(1)
})

it("networkError should be removed", ()=>{
    let action=actionsApp.changeHandleClientsError([])
    let newState=appReducer(state,action)
    expect(newState.clientsError.length).toBe(0)
})
})

test("clientsError should be changed", ()=>{
    let action=actionsApp.changeHandleNetworkError("errorNetwork")
    let newState=appReducer(state,action)
    expect(newState.networkError).toBe("errorNetwork")
})



test("initialThunk",()=>{
    const thunk=thunkApp.initializeApp()
    const dispatchMock=jest.fn()
    thunk(dispatchMock,()=>state,{})
    expect(dispatchMock).toBeCalledTimes(2)
})