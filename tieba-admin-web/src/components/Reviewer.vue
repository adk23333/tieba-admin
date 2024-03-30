<template>
  <v-dialog v-model="dialog" activator="parent" width="360">
    <v-card>
      <v-card-title>
        内容审查 - {{ forums[0].fname }}吧
        <v-switch @update:modelValue="onForumSwitch(forums[0])"
                  v-model="forums[0].enable"
                  class="mr-n16 mb-n6"
                  color="green"></v-switch>
      </v-card-title>

      <v-card-text>
        不实际执行惩罚：
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
        <v-sheet>
          <v-row v-for="func in funcs"
                 class="ml-3"
                 dense>
            <v-col>
              {{ func['function'] }}
            </v-col>
            <v-col>
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
import {
  get_forum_status,
  get_func_status,
  get_keyword,
  get_no_exec,
  set_forum_status,
  set_func_status,
  set_keyword,
  set_no_exec
} from "@/net/api";
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
    set_keyword(keywords.value).then((res) => {
      keywords.value = res.data.data
      message.success("保存成功")
    })
  }
  isEditing.value = !isEditing.value
}

const onExecSwitch = () => {
  set_no_exec(no_exec.value).then((res) => {
    no_exec.value = res.data.data.REVIEW_NO_EXEC
    message.success(res.data.msg)
  })
}

const onForumSwitch = (forum: Forum) => {
  set_forum_status(forum.fname, !forum.enable).then((res) => {
    forums.value = res.data.data
    message.success(res.data.msg)
  })
}

const onFuncSwitch = (func: Function) => {
  set_func_status(func.function, func.fname, !func.enable).then((res) => {
    funcs.value = res.data.data
    message.success(res.data.msg)
  })
}

onMounted(() => {
  get_forum_status().then((res) => {
    forums.value = res.data.data
  })
  get_no_exec().then((res) => {
    no_exec.value = res.data.data.REVIEW_NO_EXEC
  })
  get_keyword().then((res) => {
    keywords.value = res.data.data
  })
  get_func_status().then((res) => {
    funcs.value = res.data.data
  })
})
</script>

<style></style>
