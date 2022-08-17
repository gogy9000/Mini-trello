import {actionsApp, appReducer, InitialAppStateType, thunkApp} from "./AppReducer";

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
    let state={
        networkError: '',
        clientsError: [] ,
        waitingList: {} ,
        isWaitingApp: false,
        isInitialization: true
    }
    let action= thunkApp.initializeApp.fulfilled(false,"")
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

describe("waitingList",()=>{

    it("waitingList item should be added",()=>{
        let action=actionsApp.addWaitingList("id")
        let newState=appReducer(state,action)
        expect(Object.keys(newState.waitingList).length).toBe(1)
        expect(newState.waitingList["id"]).toBe(true)
        expect(Object.keys(newState.waitingList).length).not.toBe(2)
    })
    it("waitingList item should be removed",()=>{
        let state={
            networkError: '',
            clientsError: [] ,
            waitingList: {id:true} ,
            isWaitingApp: false,
            isInitialization: false
        }
        let action=actionsApp.removeWaitingList("id")
        let newState=appReducer(state,action)
        expect(Object.keys(newState.waitingList).length).toBe(0)
    })
})

test.skip("initialThunk",()=>{
    const thunk=thunkApp.initializeApp()
    const dispatchMock=jest.fn()
    thunk(dispatchMock,()=>state,{})
    expect(dispatchMock).toBeCalledTimes(4)
    // expect(dispatchMock).toHaveBeenLastCalledWith({})
})