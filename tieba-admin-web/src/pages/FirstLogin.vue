<template>
  <v-container class="justify-center align-center fill-height">
    <v-card width="344" class="pa-4">
      <v-card-title class="text-center">
        注册管理员
      </v-card-title>
      <v-form
        v-model="form"
        @submit.prevent="submit"
      >
        <v-text-field
          density="compact"
          variant="outlined"
          v-model="user.BDUSS"
          :readonly="loading"
          :rules="[rules.required]"
          class="mb-2"
          label="BDUSS"

        ></v-text-field>

        <v-text-field
          density="compact"
          variant="outlined"
          v-model="user.STOKEN"
          :readonly="loading"
          :rules="[rules.required]"
          class="mb-2"
          label="STOKEN"

        ></v-text-field>

        <v-text-field
          density="compact"
          variant="outlined"
          v-model="user.fname"
          :readonly="loading"
          :rules="[rules.required]"
          class="mb-2"
          label="贴吧吧名"

        ></v-text-field>

        <v-text-field
          class="mt-2"
          density="compact"
          variant="outlined"
          v-model="user.password"
          :readonly="loading"
          :append-inner-icon="visible1 ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible1 ? 'text' : 'password'"
          @click:append-inner="visible1 = !visible1"
          :rules="[rules.required, rules.passwordMatch, rules.min, rules.max]"
          label="密码"
        ></v-text-field>

        <v-text-field
          class="mt-2"
          density="compact"
          variant="outlined"
          v-model="password2"
          :readonly="loading"
          :append-inner-icon="visible2 ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible2 ? 'text' : 'password'"
          @click:append-inner="visible2 = !visible2"
          :rules="[rules.required, pwd_fmt]"
          label="再次输入密码"
        ></v-text-field>

        <br>

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
        >
          登录
        </v-btn>

      </v-form>

    </v-card>
  </v-container>
</template>

<style scoped>

</style>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {rules} from "@/components/utils";
import {register_top_admin} from "@/net/api";
import router from "@/router";
import {useAppStore} from "@/store/app";
import {message} from "@/plugins/toast";


const store = useAppStore()
store.set_title('创建管理员')
const form = ref(false)
const user = reactive({
  BDUSS: '',
  password: '',
  fname: '',
  STOKEN: '',
})
const password2 = ref('')
const loading = ref(false)
const visible1 = ref(false)
const visible2 = ref(false)

function submit() {
  register_top_admin(user).then((res) => {
    message.success(res.data.msg)
    setTimeout(() => {
      router.push('/profile')
    }, 3000)
  }).catch((err) => {
    message.error(err.data.msg)
  })
}

const pwd_fmt = (v: any) => v === user.password || '两次密码必须一致'
</script>

