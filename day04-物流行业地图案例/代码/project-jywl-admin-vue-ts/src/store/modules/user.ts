import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators'
import { getUserInfo } from '@/api/users'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import router, { resetRouter } from '@/router'
import { PermissionModule } from './permission'
import { TagsViewModule } from './tags-view'
import store from '@/store'

export interface IUserState {
  token: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
  email: string
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = getToken() || ''
  public name = ''
  public avatar = ''
  public introduction = ''
  public roles: string[] = []
  public email = ''

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar
  }

  @Mutation
  private SET_INTRODUCTION(introduction: string) {
    this.introduction = introduction
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles
  }

  @Mutation
  private SET_EMAIL(email: string) {
    this.email = email
  }

  @Action
  public async Login() {
  // public async Login(userInfo: { username: string, password: string }) {
    // let { username, password } = userInfo
    // username = username.trim()
    // const { data } = await login({ username, password })
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiNTJlYWUxMS0yYWZiLTQwYjUtODg3NC01OTEwOGU0YjI0NjUiLCJzdWIiOiJ7XCJyb2xlXCI6XCJST0xFX0FETUlOXCIsXCJ0eXBlXCI6XCIyXCIsXCJ1c2VybmFtZVwiOlwiYWRtaW5cIn0iLCJpc3MiOiJhZG1pbiIsImlhdCI6MTYwNjM3MTA3NiwiZXhwIjoxNjA2OTc1ODc2fQ.pCl45pY_v2w8rZU8l60UI4cQx-Ufl7DRw0rZqhY8zeE'
    setToken(token)
    this.SET_TOKEN(token)
  }

  @Action
  public SetRoles(roles: string[]) {
    this.SET_ROLES(roles)
  }

  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }

  @Action
  public async GetUserInfo() {
    if (this.token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }
    const { data } = await getUserInfo({
      /* Your params here */
    })
    if (!data) {
      throw Error('Verification failed, please Login again.')
    }
    const { roles, name, avatar, introduction, email } = data.user
    // roles must be a non-empty array
    if (!roles || roles.length <= 0) {
      throw Error('GetUserInfo: roles must be a non-null array!')
    }
    this.SET_ROLES(roles)
    this.SET_NAME(name)
    this.SET_AVATAR(avatar)
    this.SET_INTRODUCTION(introduction)
    this.SET_EMAIL(email)
  }

  @Action
  public async ChangeRoles(role: string) {
    // Dynamically modify permissions
    const token = role + '-token'
    this.SET_TOKEN(token)
    setToken(token)
    await this.GetUserInfo()
    resetRouter()
    // Generate dynamic accessible routes based on roles
    PermissionModule.GenerateRoutes(this.roles)
    // Add generated routes
    router.addRoutes(PermissionModule.dynamicRoutes)
    // Reset visited views and cached views
    TagsViewModule.delAllViews()
  }

  @Action
  public LogOut() {
    if (this.token === '') {
      throw Error('LogOut: token is undefined!')
    }
    removeToken()
    resetRouter()

    // Reset visited views and cached views
    TagsViewModule.delAllViews()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }
}

export const UserModule = getModule(User)
