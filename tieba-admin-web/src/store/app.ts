// Utilities
import {defineStore} from 'pinia'

export class User {
  uid: number = 0
  tuid: number = 0
  username: string = ''
  permission: string = ''
  fid: number = 0
  fname: string = ''
  token: string = ''
  portrait: string = ''
}

export const useAppStore = defineStore('app', {
  state: () => ({
    title: '概览',
    is_login: false,
    user: new User()
  }),
  actions: {
    set_title(title: string) {
      this.title = title
    },
    set_token_login(uid: string, password: string) {
      let str = `${uid}:${password}`
      this.user.token = `Basic ${window.btoa(str)}`
    },
    set_token_access(token: string) {
      this.user.token = 'Bearer ' + token
      this.is_login = true
    },
    set_user(object: User) {
      this.user.uid = object.uid
      this.user.tuid = object.tuid
      this.user.username = object.username
      this.user.permission = object.permission
      this.user.fid = object.fid
      this.user.fname = object.fname
    },
    exit() {
      this.user = new User()
    },
    set_portrait(portrait: string) {
      this.user.portrait = portrait
    }
  },
  persist: {
    storage: window.localStorage,
    paths: ['user', 'is_login']
  }
})
