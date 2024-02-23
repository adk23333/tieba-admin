<template>
  <a v-for="log in logs">{{ log }}<br/></a>
</template>

<script lang="ts" setup>
import {useAppStore} from "@/store/app";
import {onMounted, ref} from "vue"
import {get_logs} from "@/net/api";

interface Log {
  id: number
  user: string
  type: string
  note: string
}

const store = useAppStore()
store.set_title('日志')

const logs = ref<Log[]>([])

onMounted(() => {
  get_logs().then((res) => {
    logs.value = res.data.data
  })
})
</script>

<style>

</style>
