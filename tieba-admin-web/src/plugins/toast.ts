import {PluginOptions, useToast} from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export const options: PluginOptions = {
  maxToasts: 3,
  timeout: 3000
}

export const message = useToast()
