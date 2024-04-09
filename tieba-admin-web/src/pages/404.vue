<template>
  <v-sheet
      class="pa-4 text-center mx-auto"
      elevation="1"
      max-width="600"
      rounded="lg"
      width="100%"
  >
    <v-img
        class="mb-5"
        aspect-ratio="4/3"
        cover
        src="@/assets/404.svg"
        max-height="260"
    ></v-img>

    <h2 class="text-h5 mb-6">每日一言</h2>

    <p class="mb-4 text-medium-emphasis text-body-2">
      {{ hitokoto }}

      <br>

      —— {{ source }}
    </p>

    <v-divider class="mb-4"></v-divider>

    <div class="text-end">
      <v-btn
          class="text-none"
          color="green"
          variant="flat"
          width="90"
          rounded
      >
        返回主页
      </v-btn>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import axios from "axios";
import {ref} from "vue";
import {useAppStore} from "@/store/app";

const store = useAppStore()
store.set_title('404')

const hitokoto = ref(':D 获取中...')
const source = ref('')

axios.get('https://tenapi.cn/v2/yiyan?format=json')
    .then(({data}) => {
      hitokoto.value = data.data.hitokoto
      source.value = `${data.data.catname}/${data.data.source}`
    })
</script>

<style scoped>

</style>
