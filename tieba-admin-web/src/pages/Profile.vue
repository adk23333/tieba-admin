<template>
  <a>基本信息面板<br/>开发中...</a>
  <a>{{ user.token }}</a>
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
