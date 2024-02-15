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
          <v-list>
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
import {ref} from "vue";
import {useAppStore} from "@/store/app";
import {storeToRefs} from "pinia";

const store = useAppStore()
const select_info = [
  ["profile", "概览", "https://gss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/tb.1.9f5a63a2.w1s__jfQF2ejxoCf1OCcmw?t=1533450011"],
  ["modules", "功能管理", "mdi-pencil"],
  ["logcat", "操作日志", "mdi-history"],
  ["manager", "成员管理", "mdi-account-cog"],
]
const drawer = ref(true)
const {user} = storeToRefs(store)
const {title} = storeToRefs(store)


</script>
