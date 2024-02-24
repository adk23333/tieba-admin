<template>
  <v-data-table-server
    class="rounded-lg text-no-wrap"
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items-length="totalItems"
    :items="serverItems"
    :loading="loading"
    item-value="id"
    @update:options="loadItems"
  ></v-data-table-server>
</template>

<script lang="ts" setup>
import {useAppStore} from "@/store/app";
import {ref} from "vue"
import {get_logs} from "@/net/api";

interface Log {
  id: number
  user: string
  type: string
  note: string
  obj: number
  date_created: string
  date_updated: string
}

const store = useAppStore()
store.set_title('日志')

const itemsPerPage = ref(5)
const headers = ref([
  {title: '操作', align: 'start', key: 'type', sortable: false,},
  {title: '操作者', key: 'user', align: 'end', sortable: false,},
  {title: '被执行对象', key: 'obj', align: 'end', sortable: false,},
  {title: '备注', key: 'note', align: 'end', sortable: false,},
  {title: '时间', key: 'date_updated', align: 'end', sortable: false,},
])
const serverItems = ref<Log[]>([])
const loading = ref(true)
const totalItems = ref(0)

// @ts-ignore
function loadItems({page, itemsPerPage, sortBy}) {
  loading.value = true
  get_logs(page, itemsPerPage, sortBy).then((res) => {
    serverItems.value = res.data.data.items
    totalItems.value = res.data.data.total
    loading.value = false
  })
}

</script>

<style>

</style>
