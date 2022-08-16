import {authReducer, InitialStateAuthType, thunkAuth} from "./Auth";


let initialState:InitialStateAuthType
let authData:InitialStateAuthType
beforeEach(()=>{
    initialState={
       email: '',
       id: '',
       login: '',
       isAuthorized: false,
    }
    authData= {
        email: 'email',
        id: 'id',
        login: 'login',
        isAuthorized: true,
    }
}
)
test("AuthData should be removed",()=>{
    let action= thunkAuth.logout.fulfilled({},"")
    let newState=authReducer(initialState,action)
    expect(newState.email).toBe("")
    expect(newState.id).toBe("")
    expect(newState.login).toBe("")
    expect(newState.isAuthorized).toBe(false)
})
test("AuthData should be removed",()=>{
    let action= thunkAuth.authMe.fulfilled(authData,"")
    let newState=authReducer(initialState,action)
    expect(newState.email).toBe("email")
    expect(newState.id).toBe("id")
    expect(newState.login).toBe("login")
    expect(newState.isAuthorized).toBe(true)
})