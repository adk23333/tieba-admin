<template>
  人员管理 todo
</template>

<script lang="ts" setup>
import {useAppStore} from "@/store/app";

const store = useAppStore()
store.set_title('人员管理')
</script>

<style>

</style>
