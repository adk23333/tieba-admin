import serviceAxios from "./index";

export const login = () => {
  return serviceAxios({
    url: "/auth",
    method: "post",
  });
};

export const get_self_info = () => {
  return serviceAxios({
    url: "/auth/self",
    method: "get",
  });
};

export const register_top_admin = (data: object) => {
  return serviceAxios({
    url: "/first_login",
    method: "post",
    data: data,
  });
};

export const get_plugins = () => {
  return serviceAxios({
    url: "/plugins",
    method: "get",
  })
}

export const plugin_status = (status: boolean | null = null, plugin: string | null = null) => {
  let _status
  switch (status) {
    case true: {
      _status = 1
      break
    }
    case false: {
      _status = 0
      break
    }
    default:
      _status = null
  }
  return serviceAxios.postForm(
    "/plugins/status",
    {
      "status": _status,
      "plugin": plugin,
    }
  )
}

export const plugin_info = (plugin: string) => {
  return serviceAxios.get(
    `/${plugin}/info`,
  )
}

export const forum_status = (fname: string | null = null, enable: boolean | null = null) => {
  let data
  if (!(fname == null || enable == null)) {
    data = JSON.stringify({
      "fname": fname,
      "enable": enable
    })
  }
  return serviceAxios.post(
    "/review/forum",
    data
  )
}

export const no_exec_api = (value: boolean | null = null) => {
  let _status
  switch (value) {
    case true: {
      _status = 1
      break
    }
    case false: {
      _status = 0
      break
    }
    default:
      _status = null
  }
  return serviceAxios.postForm(
    "/review/no_exec",
    {
      "bool": _status
    }
  )
}

export const keyword_api = (keyword: string[] | null = null) => {
  return serviceAxios.post(
    "/review/keyword",
    JSON.stringify(keyword),
  )
}

export const func_status = (func: string | null = null, fname: string | null = null, enable: boolean | null = null) => {
  let data
  if (!(func == null || fname == null || enable == null)) {
    data = JSON.stringify({
      "function": func,
      "fname": fname,
      "enable": enable
    })
  }
  return serviceAxios.post(
    "/review/function",
    data
  )
}
