<template>
  <v-sheet
    class="d-flex flex-wrap justify-start"
    color="#fff0">

    <v-card class="ma-3"
            max-width="240"
            rounded="lg"
            hover>
      <v-card-title>{{ FullPermission[user.permission] }}</v-card-title>
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
import {get_self_full} from "@/net/api";
import router from "@/router";
import {FullPermission} from "@/components/utils";

const store = useAppStore()
const {user} = storeToRefs(store)
store.set_title('基本信息')
get_self_full().then((res) => {
  store.set_user(res.data.data)
}).catch((err) => {
  if (err) {
    store.login_timeout()
    router.push('/login')
  }
})
</script>

<style>

</style>
