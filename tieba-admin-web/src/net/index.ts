import axios from "axios"
import {useAppStore} from "@/store/app";
import router from "@/router";
import {message} from "@/plugins/toast";


const serviceAxios = axios.create({
  baseURL: "/api", // 基础请求地址
  timeout: 10000, // 请求超时设置
  withCredentials: false, // 跨域请求是否需要携带 cookie
});
serviceAxios.interceptors.request.use(
  (config) => {
    const store = useAppStore()
    config.headers["Authorization"] = store.user.token
    // 设置请求头
    if (!config.headers["content-type"]) { // 如果没有设置请求头
      if (config.method === 'post') {
        config.headers["content-type"] = "application/x-www-form-urlencoded"; // post 请求
      } else {
        config.headers["content-type"] = "application/json"; // 默认类型
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err)
  }
);

serviceAxios.interceptors.response.use(
  (res) => {
    let data = res.data
    // 处理自己的业务逻辑，比如判断 token 是否过期等等
    // 代码块
    return res
  },
  (err) => {
    let msg = "";
    let store = useAppStore()
    if (err && err.response) {
      switch (err.response.status) {
        case 302:
          console.log(err)
          break;
        case 400:
          msg = "参数不正确！";
          break;
        case 401:
          msg = err.response.data.msg
          break;
        case 403:
          msg = "您没有权限操作！"
          if (err.response.data.data.is_first == true) {
            store.set_title('初始化配置')
            router.push('/first_login')
            return Promise.reject(false)
          }
          break;
        case 404:
          msg = `请求地址出错: ${err.response.config.url}`;
          break;
        case 408:
          msg = "请求超时！";
          break;
        case 409:
          msg = "系统已存在相同数据！";
          break;
        case 500:
          msg = "服务器内部错误！";
          break;
        case 501:
          msg = "服务未实现！";
          break;
        case 502:
          msg = "网关错误！";
          break;
        case 503:
          msg = "服务不可用！";
          break;
        case 504:
          msg = "服务暂时无法访问，请稍后再试！";
          break;
        case 505:
          msg = "HTTP 版本不受支持！";
          break;
        default:
          msg = "异常问题，请联系管理员！";
          break;
      }
    }
    if (err.code === "ERR_NETWORK") msg = "请连接网络"
    message.error(msg)
    return Promise.reject(msg);
  }
);

export default serviceAxios;
