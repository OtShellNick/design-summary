export const SET_ACTIVE_MENU: string = 'SET_ACTIVE_MENU';

export const setActiveMenuCreator = (tab: string) => ({type: SET_ACTIVE_MENU, activeNavTab: tab})