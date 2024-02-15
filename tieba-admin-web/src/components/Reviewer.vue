<template>
  <v-dialog v-model="dialog" activator="parent" width="360">
    <v-card title="内容审查">
      <v-card-text>
        实际执行惩罚：
        <v-switch class="mr-n16 mb-n12" color="green"></v-switch>
      </v-card-text>

      <v-card-text>
        关键词审查：
        <v-combobox :hint="!isEditing ? '点击右边按钮编辑' : '点击右边按钮保存'" :readonly="!isEditing"
                    :label="`违禁词—${isEditing ? '编辑中' : '只读'}`" v-model="keywords" class="mt-2" chips
                    closable-chips multiple
                    variant="outlined">
          <template v-slot:append>
            <v-slide-x-reverse-transition mode="out-in">
              <v-icon :key="`icon-${isEditing}`" :color="isEditing ? 'success' : 'info'"
                      :icon="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"
                      @click="isEditing = !isEditing"></v-icon>
            </v-slide-x-reverse-transition>
          </template>
        </v-combobox>
      </v-card-text>

      <v-card-text v-for="forum in forums">
        {{ forum["fname"] }}吧
        <v-switch class="mr-n16 mb-n6" color="green"></v-switch>
        <v-sheet>
          <v-row class="ml-3" dense>
            <v-col>
              check_keyword
            </v-col>
            <v-col>
              <v-switch class="mr-n16 mb-n6 mt-n4" color="green"></v-switch>
            </v-col>
          </v-row>
        </v-sheet>

      </v-card-text>

    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {forum_status} from "@/net/api";

interface Forum {
  fname: string
  enable: boolean
}

const isEditing = ref(false)
const dialog = ref(false)
const keywords = ref([])
const forums = ref<Forum[]>([])

onMounted(() => {
  forum_status().then((res) => {
    forums.value = res.data.data
  })
})
</script>

<style></style>
