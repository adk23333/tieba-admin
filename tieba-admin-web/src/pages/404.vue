<template>
  <h1>每日一言：</h1>
  <h2>{{ hitokoto }}</h2>
  <div class="d-flex justify-end">
    <v-btn to="/" color="green">返回主页</v-btn>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import {ref} from "vue";
import {useAppStore} from "@/store/app";

const store = useAppStore()
store.set_title('404')

const hitokoto = ref(':D 获取中...')

axios.get('https://tenapi.cn/v2/yiyan?format=json')
    .then(({data}) => {
      hitokoto.value = `${data.data.hitokoto} —— ${data.data.catname}/${data.data.source}`
    })
</script>

<style scoped>

</style>
