<template>
  <v-sheet
    class="d-flex flex-wrap justify-center"
    color="#fff0">
    <v-card
      class="ma-3"
      max-width="240"
      rounded="lg"
      hover
      v-for="plugin in plugins.values()">
      <v-card-title>{{ plugin.name }}</v-card-title>
      <v-card-text>
        {{ plugin.desc }}
      </v-card-text>
      <v-divider class="mx-3"/>
      <v-card-actions>
        <v-btn color="#660092">设置
          <component :is="getSettingComponent(plugin.plugin)"/>
        </v-btn>
        <v-spacer/>
        <v-switch
          @update:modelValue="onSwitch(plugin.plugin)"
          class="mr-n16 mb-n5"
          color="green"></v-switch>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>
<script lang="ts" setup>
import {defineAsyncComponent, onMounted, ref} from 'vue';
import {useAppStore} from "@/store/app";
import {get_plugins, plugin_info, plugin_status} from "@/net/api";
import {message} from "@/plugins/toast";

interface Plugin {
  status: boolean | null
  plugin: string
  name: string
  desc: string
}

const store = useAppStore()
store.set_title('功能管理')
const plugins = ref<Map<string, Plugin>>(new Map())

const onSwitch = (name: string) => {
  let plugin = plugins.value.get(name) as Plugin
  plugin_status(!plugin.status, plugin.plugin).then((res) => {
    plugin.status = res.data.data.status
    plugins.value.set(plugin.plugin, plugin)
    message.success(res.data.msg)
  })
}

const getSettingComponent = (plugin: string) => {
  let imp: Promise<any>
  switch (plugin) {
    case "review": {
      imp = import('@/components/Reviewer.vue')
      break
    }
    default:
      return null
  }
  return defineAsyncComponent(() => {
    return imp
  })
}

onMounted(() => {
  get_plugins().then((res) => {
    res.data.data.forEach((plugin_name: string, index: number) => {
      plugin_info(plugin_name).then((res) => {
        plugins.value.set(res.data.data.plugin, res.data.data)

        plugin_status(null, plugin_name).then((res) => {

          let plugin = plugins.value.get(plugin_name)
          if (plugin != undefined) {
            plugin.status = res.data.data.status
            plugins.value.set(plugin_name, plugin)
          }
        })
      })

    })
  })
})
</script>

<style></style>
