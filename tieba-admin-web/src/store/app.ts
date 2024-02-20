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
    user: {
      token: '',
      uid: 0,
      tuid: 0,
      username: '',
      permission: '',
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
    },
    set_user(object: User) {
      this.user.uid = object.uid
      this.user.tuid = object.tuid
      this.user.username = object.username
      this.user.permission = object.permission
    },
  },
  persist: {
    storage: window.localStorage,
    paths: ['user.token']
  }
})
