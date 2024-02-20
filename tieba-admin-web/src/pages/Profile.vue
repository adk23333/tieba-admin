<template>
  <v-sheet
    class="d-flex flex-wrap justify-start"
    color="#fff0">

    <v-card class="ma-3"
            max-width="240"
            rounded="lg"
            hover>
      <v-card-title>管理员</v-card-title>
      <v-card-text>
        <a>UID: {{ user["tuid"] }}
          <br/>NAME: {{ user["username"] }}</a>
      </v-card-text>

    </v-card>
  </v-sheet>
</template>

<script lang="ts" setup>
import {useAppStore} from "@/store/app";
import {storeToRefs} from 'pinia'
import {get_self_info} from "@/net/api";
import router from "@/router";

const store = useAppStore()
const {user} = storeToRefs(store)

store.set_title('基本信息')
get_self_info().then((res) => {
  store.set_user(res.data.me)
}).catch((err) => {
  if (err) {
    router.push('/login')
  }
})
</script>

<style>

</style>
