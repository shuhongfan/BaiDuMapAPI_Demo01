import Vue from 'vue'
import Vuex from 'vuex'
import { IAppState } from './modules/app'
import { IPermissionState } from './modules/permission'
import { ISettingsState } from './modules/settings'

Vue.use(Vuex)

export interface IRootState {
  app: IAppState
  permission: IPermissionState
  settings: ISettingsState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
