<template>
  <v-app>
    <v-main>
      <v-toolbar border density="compact" color="white">
        <v-app-bar-nav-icon class="d-sm-none" @click.stop="drawer = !drawer"/>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-navigation-drawer
          mobile-breakpoint="sm"
          v-model="drawer"
          expand-on-hover rail width="260">
          <v-list class="py-0">
            <v-list-item :prepend-avatar="select_info[0].icon"
                         :title="user.username"
                         :to="'/'+select_info[0].uri"/>
          </v-list>
          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-list-item v-for="i in select_info.slice(1)"
                         :prepend-icon="i.icon"
                         :title="i.title"
                         :value="i.uri"
                         :key="i.uri"
                         :to="'/'+i.uri"></v-list-item>
          </v-list>
          <template v-slot:append>
            <div class="pa-2">
              <v-btn block
                     color="green"
                     @click="exit">
                Exit
              </v-btn>
            </div>
          </template>
        </v-navigation-drawer>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>
<style scoped>
.v-container {
  max-width: 2000px;
  height: calc(100% - 50px);
  background: #FAFAFA;
}
</style>
<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";
import {useAppStore} from "@/store/app";
import {storeToRefs} from "pinia";
import {get_portrait} from "@/net/api";
import router from "@/router";

const store = useAppStore()

interface SelectInfo {
  uri: string
  title: string
  icon: string
}

const select_info = ref<SelectInfo[]>([
  {uri: "profile", title: "概览", icon: ""},
  {uri: "modules", title: "功能管理", icon: "mdi-pencil"},
  {uri: "logcat", title: "操作日志", icon: "mdi-history"},
  {uri: "manager", title: "成员管理", icon: "mdi-account-cog"},
  {uri: "account", title: "个人中心", icon: "mdi-home-account"}
])
const drawer = ref(true)
const {user, title} = storeToRefs(store)

function exit() {
  store.exit()
  router.push("/login")
}

onMounted(() => {
  set_portrait2icon()
})

watch(() => store.is_login, (nv, ov) => {
  if (nv) {
    get_portrait().then((res) => {
      store.set_portrait(res.data.data)
      set_portrait2icon()
    })
  } else {
    select_info.value[0].icon = ""
  }
})

function set_portrait2icon() {
  select_info.value[0].icon = `http://tb.himg.baidu.com/sys/portraitn/item/${
    store.user.portrait}?t=${Math.floor(Date.now() / 1000)}`
}
</script>
