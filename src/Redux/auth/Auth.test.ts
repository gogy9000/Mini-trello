import {actionsAuth, authReducer, InitialStateAuthType, thunkAuth} from "./Auth";


let initialState: InitialStateAuthType
let authData: InitialStateAuthType["authData"]
beforeEach(() => {
        initialState = {
            authData: {
                email: '',
                id: '',
                login: '',
            },
            isAuthorized: false,
            isFetching: false
        }
        authData = {
            email: 'email',
            id: 'id',
            login: 'login',
        }
    }
)
test("AuthData should be removed", () => {
    let action = actionsAuth.setAuthData({})
    let newState = authReducer(initialState, action)
    expect(newState.authData.email).toBe("")
    expect(newState.authData.id).toBe("")
    expect(newState.authData.login).toBe("")
    expect(newState.isAuthorized).toBe(false)
})
test("AuthData should be added", () => {
    let action = actionsAuth.setAuthData(authData)
    let newState = authReducer(initialState, action)
    expect(newState.authData.email).toBe("email")
    expect(newState.authData.id).toBe("id")
    expect(newState.authData.login).toBe("login")
    expect(newState.isAuthorized).toBe(true)
})
test("offAuthPreloader should be false",()=>{
    const action= thunkAuth.authMe.fulfilled
    let newState = authReducer(initialState, action)
    expect(newState.isFetching).toBe(false)
})
test("onAuthPreloader should be truthy",()=>{
    const action= thunkAuth.login.pending
    let newState = authReducer(initialState, action)
    expect(newState.isFetching).toBe(true)
})
test("onAuthPreloader should be truthy",()=>{
    const action= thunkAuth.logout.pending
    let newState = authReducer(initialState, action)
    expect(newState.isFetching).toBe(true)
})
test("onAuthPreloader should be false",()=>{
    const action= thunkAuth.login.fulfilled
    let newState = authReducer(initialState, action)
    expect(newState.isFetching).toBe(false)
})
