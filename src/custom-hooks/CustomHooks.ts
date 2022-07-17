import {AppDispatchType, AppRootStateType} from "../Redux/ReduxStore";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const useDispatchApp: () => AppDispatchType = useDispatch
export const useSelectorApp: TypedUseSelectorHook<AppRootStateType> = useSelector