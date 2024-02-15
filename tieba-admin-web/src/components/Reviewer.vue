<template>
  <v-dialog v-model="dialog" activator="parent" width="360">
    <v-card title="内容审查">
      <v-card-text>
        实际执行惩罚：
        <v-switch
          v-model="no_exec"
          @update:modelValue="onExecSwitch"
          class="mr-n16 mb-n12"
          color="green"></v-switch>
      </v-card-text>

      <v-card-text>
        关键词审查：
        <v-combobox :hint="!isEditing ? '点击右边按钮编辑' : '点击右边按钮保存'"
                    :readonly="!isEditing"
                    :label="`违禁词—${isEditing ? '编辑中' : '只读'}`"
                    v-model="keywords" class="mt-2"
                    chips
                    closable-chips
                    multiple
                    variant="outlined">
          <template v-slot:append>
            <v-slide-x-reverse-transition mode="out-in">
              <v-icon :key="`icon-${isEditing}`"
                      :color="isEditing ? 'success' : 'info'"
                      :icon="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"
                      @click="onEdit"></v-icon>
            </v-slide-x-reverse-transition>
          </template>
        </v-combobox>
      </v-card-text>

      <v-card-text v-for="forum in forums">
        {{ forum["fname"] }}吧
        <v-switch @update:modelValue="onForumSwitch(forum)"
                  v-model="forum.enable"
                  class="mr-n16 mb-n6"
                  color="green"></v-switch>
        <v-sheet>
          <v-row v-for="func in funcs"
                 class="ml-3"
                 dense>
            <v-col v-if="func['fname']==forum['fname']">
              {{ func['function'] }}
            </v-col>
            <v-col v-if="func['fname']==forum['fname']">
              <v-switch @update:modelValue="onFuncSwitch(func)"
                        v-model="func.enable"
                        class="mr-n16 mb-n6 mt-n4"
                        color="green"></v-switch>
            </v-col>
          </v-row>
        </v-sheet>

      </v-card-text>

    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {forum_status, func_status, keyword_api, no_exec_api} from "@/net/api";
import {message} from "@/plugins/toast";

interface Forum {
  fname: string
  enable: boolean
}

interface Function {
  function: string
  fname: string
  enable: boolean
}

const isEditing = ref(false)
const dialog = ref(false)
const keywords = ref<string[]>([])
const forums = ref<Forum[]>([])
const no_exec = ref(false)
const funcs = ref<Function[]>([])

const onEdit = () => {
  if (isEditing.value) {
    keyword_api(keywords.value).then((res) => {
      keywords.value = res.data.data
      message.success("保存成功")
    })
  }
  isEditing.value = !isEditing.value
}

const onExecSwitch = () => {
  no_exec_api(no_exec.value).then((res) => {
    no_exec.value = res.data.data.REVIEW_NO_EXEC
    message.success(res.data.msg)
  })
}

const onForumSwitch = (forum: Forum) => {
  forum_status(forum.fname, !forum.enable).then((res) => {
    forums.value = res.data.data
    message.success(res.data.msg)
  })
}

const onFuncSwitch = (func: Function) => {
  func_status(func.function, func.fname, !func.enable).then((res) => {
    funcs.value = res.data.data
    message.success(res.data.msg)
  })
}

onMounted(() => {
  forum_status().then((res) => {
    forums.value = res.data.data
  })
  no_exec_api().then((res) => {
    no_exec.value = res.data.data.REVIEW_NO_EXEC
  })
  keyword_api().then((res) => {
    keywords.value = res.data.data
  })
  func_status().then((res) => {
    funcs.value = res.data.data
  })
})
</script>

<style></style>
