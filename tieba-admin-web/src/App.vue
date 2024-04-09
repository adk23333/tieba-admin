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
            <v-list-item :prepend-avatar="select_info[0][2]"
                         :title="user.username"
                         :subtitle="user.permission"
                         :to="'/'+select_info[0][0]"/>
          </v-list>
          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-list-item v-for="i in select_info.slice(1)"
                         :prepend-icon="i[2]"
                         :title="i[1]"
                         :value="i[0]"
                         :key="i[0]"
                         :to="'/'+i[0]"></v-list-item>
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
import {onMounted, ref} from "vue";
import {useAppStore} from "@/store/app";
import {storeToRefs} from "pinia";
import {get_portrait} from "@/net/api";
import router from "@/router";

const store = useAppStore()

const select_info = ref([
  ["profile", "概览", ""],
  ["modules", "功能管理", "mdi-pencil"],
  ["logcat", "操作日志", "mdi-history"],
  ["manager", "成员管理", "mdi-account-cog"],
  ["account", "个人中心", "mdi-home-account"]
])
const drawer = ref(true)
const {user} = storeToRefs(store)
const {title} = storeToRefs(store)

function exit() {
  store.exit()
  router.push("/")
}

onMounted(() => {
  get_portrait().then((res) => {
    select_info.value[0][2] = "https://gss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/" + res.data.data
  })
})

</script>
