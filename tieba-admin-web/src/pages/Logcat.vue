<template>
  日志界面 todo
</template>

<script lang="ts" setup>
import {useAppStore} from "@/store/app";

const store = useAppStore()
store.set_title('日志')
</script>

<style>

</style>
