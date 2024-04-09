<template>
  <v-card width="344" class="pa-4">
    <v-card-text class="text-body-1">
      修改密码
    </v-card-text>
    <v-form v-model="form"
            @submit.prevent="submit"
    >
      <v-text-field
          class="mt-2"
          density="compact"
          variant="outlined"
          v-model="password"
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
      <div class="text-end">
        <v-btn
            :disabled="!form"
            :loading="loading"
            block
            color="green"
            type="submit"
        >
          确认
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useAppStore} from "@/store/app";
import {rules} from "@/components/utils";
import {change_password} from "@/net/api";
import {message} from "@/plugins/toast";


const store = useAppStore()
store.set_title('个人中心')
const form = ref(false)

const password = ref('')
const password2 = ref('')
const loading = ref(false)
const visible1 = ref(false)
const visible2 = ref(false)

function submit() {
  loading.value = true
  change_password(password.value).then((res) => {
    password.value = undefined
    password2.value = undefined
    loading.value = false
    message.success(res.data.msg)
    message.success("下次登录请使用新密码")
  })
}

const pwd_fmt = (v: any) => v === password.value || '两次密码必须一致'
</script>

<style scoped>

</style>
