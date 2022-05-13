import { IState } from '../../interface/interface-state'

export const getToken = (state: IState) => state.auth.token
export const getIsLoadingAuth = (state: IState) => state.auth.isLoading
export const getErrorAuth = (state: IState) => state.auth.error