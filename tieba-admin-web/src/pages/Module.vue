<template>
  <v-sheet
    class="d-flex flex-wrap justify-center"
    color="#fff0">
    <v-card
      class="ma-3"
      max-width="240"
      rounded="lg"
      hover
      v-if="plugins.includes('review')">
      <v-card-title>内容审查</v-card-title>
      <v-card-text>
        开启这个插件后，将根据设定的关键词或者图片审查指定贴吧的帖子内容
      </v-card-text>
      <v-divider class="mx-3"/>
      <v-card-actions>
        <v-btn color="#660092">设置
          <ReviewerVue/>
        </v-btn>
        <v-spacer/>
        <v-switch
          v-model="plugins_status[0]"
          class="mr-n16 mb-n5"
          color="green"></v-switch>
      </v-card-actions>
    </v-card>


    <v-card
      class="ma-3"
      max-width="240"
      rounded="lg"
      hover
      v-if="plugins.includes('manager')">
      <v-card-title>权限管理</v-card-title>
      <v-card-text>
        开启这个插件后，将分配管理员百度账号在指定贴吧的权限给设定的账号
      </v-card-text>
      <v-divider class="mx-3"/>
      <v-card-actions>
        <v-btn color="#660092">设置

          <v-dialog v-model="dialog[1]" activator="parent" width="auto">
            <v-card>
              <v-card-text>
                test
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-btn>
        <v-spacer/>
        <v-switch
          v-model="plugins_status[1]"
          class="mr-n16 mb-n5"
          color="green"></v-switch>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>
<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue';
import ReviewerVue from '@/components/Reviewer.vue';
import {useAppStore} from "@/store/app";
import {get_plugins, plugin_status} from "@/net/api";
import {message} from "@/plugins/toast";

const store = useAppStore()
store.set_title('功能管理')
const key_words = "a,b,c,d"
const dialog = ref([false, false])
const plugins = ref<string[]>([])
const plugins_status = ref<boolean[]>([])


watch(() => [...plugins_status.value], (nv, ov) => {
  if (ov.length != 0) {
    nv.forEach((obj, index) => {
      if (obj != ov[index]) {
        plugin_status(obj, plugins.value[index]).then((res) => {
          plugins_status.value[index] = res.data.data.status
          message.success(res.data.msg)
        })
      }
    })
  }

})

onMounted(() => {
  get_plugins().then((res) => {
    plugins.value = res.data.data

    plugins.value.forEach((obj, index) => {
      plugin_status(null, obj).then((res) => {
        plugins_status.value[index] = res.data.data.status
      })
    })
  })
})
</script>

<style></style>
