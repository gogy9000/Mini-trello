import {Provider} from "react-redux";
import {store} from "../Redux/ReduxStore";

export const ProviderDecorators=(storiesFn:any)=>{
    return <Provider store={store}>{storiesFn()}</Provider>
}