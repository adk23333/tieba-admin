// Utilities
import {defineStore} from 'pinia'

interface User {
  uid: number
  tuid: number
  username: string
  permission: string
}

export const useAppStore = defineStore('app', {
  state: () => ({
    title: '概览',
    is_login: false,
    user: {
      token: '',
      uid: 0,
      tuid: 0,
      username: '',
      portrait: '',
    }
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
    },
    exit() {
      this.user.token = ""
      this.user.uid = 0
      this.user.tuid = 0
      this.user.username = ""
      this.is_login = false
      this.user.portrait = ""
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
