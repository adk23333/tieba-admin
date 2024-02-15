<template>
  <v-container class="justify-center align-center fill-height">
    <v-card width="344" class="pa-4">
      <v-card-title class="text-center">
        登录
      </v-card-title>
      <v-form
        v-model="form"
        @submit.prevent="submit"
      >
        <v-text-field
          density="compact"
          variant="outlined"
          v-model="user.uid"
          :readonly="loading"
          :rules="[rules.required, rules.numberMatch]"
          class="mb-2"
          label="贴吧UID"

        ></v-text-field>

        <v-text-field
          density="compact"
          variant="outlined"
          v-model="user.password"
          :readonly="loading"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          @click:append-inner="visible = !visible"
          :rules="[rules.required]"
          label="密码"
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
.ant-card {
  width: 344px;
}
</style>

<script setup lang="ts">
import {useAppStore} from "@/store/app";
import {reactive, ref} from "vue";
import {login} from "@/net/api"
import router from "@/router";
import {rules} from "@/components/utils";
import {message} from "@/plugins/toast";


const store = useAppStore()
store.set_title("登录")

interface User {
  uid: string
  password: string
}

const user = reactive<User>({
  uid: '',
  password: '',
})

const form = ref(false)
const loading = ref(false)
const visible = ref(false)


function submit() {
  loading.value = true
  store.set_token_login(user.uid, user.password)
  login().then((res) => {
    store.set_token_access(res.data.access_token)
    message.success('登录成功，3s后进行跳转')
    setTimeout(() => {
      router.push('/')
    }, 3000)

  }).finally(() => {
    loading.value = false
  })


}

</script>
