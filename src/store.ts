import {AnyAction} from "redux";
import {SET_ACTIVE_MENU} from "@/actions/setActiveMenuAction";

export interface IInitialState {
    activeNavTab: string;
}

export const initialState: IInitialState = {
    activeNavTab: 'about'
}

export const rootReducer = (state: IInitialState = initialState, action: AnyAction) => {
    const {type, activeNavTab} = action;

    switch (type) {
        case SET_ACTIVE_MENU:
            return {
                ...state,
                activeNavTab
            }
        default:
            return state;
    }
}