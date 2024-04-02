<template>
  <v-sheet class="d-flex flex-column ga-2" color="">
    <v-expansion-panels>
      <v-expansion-panel
        title="添加用户"
      >
        <v-expansion-panel-text>
          <v-sheet class="d-flex flex-wrap ga-2">
            <v-text-field
              class="min-width"
              density="compact"
              variant="outlined"
              v-model="new_user.user"
              label="ID/username/portrait">
            </v-text-field>
            <v-text-field
              class="min-width"
              density="compact"
              variant="outlined"
              v-model="new_user.forum"
              label="所属吧名">
            </v-text-field>
            <v-select
              class="min-width"
              label="权限"
              density="compact"
              v-model="new_user.pm"
              :items="['super', 'high', 'min', 'creator', 'ordinary', 'black']"
              variant="outlined"
            ></v-select>

          </v-sheet>
          <div class="d-flex justify-end ga-2">
            <v-btn variant="outlined" @click="submit(1)">删除</v-btn>
            <v-btn variant="outlined" @click="submit(0)">添加</v-btn>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-data-table-server
      class="rounded-lg text-no-wrap border-sm"
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items-length="totalItems"
      :items="serverItems"
      :loading="loading"
      item-value="id"
      @update:options="loadItems"
    ></v-data-table-server>
  </v-sheet>

</template>

<script lang="ts" setup>
import {useAppStore} from "@/store/app";
import {ref} from "vue"
import {get_users, set_users} from "@/net/api";
import {message} from "@/plugins/toast";

const store = useAppStore()
store.set_title('人员管理')

interface User {
  fid: number
  fname: string
  permission: string
  uid: number
  tuid: number
  username: string
}

const itemsPerPage = ref(5)
const headers = ref([
  {title: 'ID', key: 'tuid', sortable: false,},
  {title: 'username', key: 'username', sortable: false,},
  {title: '所属吧', key: 'fname', sortable: false,},
  {title: '权限', key: 'permission', sortable: false,},
])
const serverItems = ref<User[]>([])
const loading = ref(true)
const totalItems = ref(0)
const new_user = ref({
  user: "",
  forum: "",
  pm: ""
})

// @ts-ignore
function loadItems({page, itemsPerPage, sortBy}) {
  loading.value = true
  get_users().then((res) => {
    serverItems.value = res.data.data
    totalItems.value = res.data.data.length
    loading.value = false
  })
}

function submit(del = 0) {
  set_users(new_user.value.user, new_user.value.forum, new_user.value.pm, del).then((res) => {
    message.success(res.data.msg)
  }).finally(() => {
    loadItems({page: 0, itemsPerPage: 0, sortBy: 0})
  })
}

</script>

<style>
.min-width {
  min-width: 260px;
}
</style>
