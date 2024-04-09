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
    url: "/auth/first_login",
    method: "post",
    data: data,
  });
};

export const get_portrait = () => {
  return serviceAxios.get(
    "/auth/portrait"
  )
}

export const get_plugins = () => {
  return serviceAxios({
    url: "/plugins",
    method: "get",
  })
}

export const set_plugin_status = (status: boolean | null = null, plugin: string | null = null) => {
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


export const get_plugin_status = (plugin: string | null = null) => {
  return serviceAxios.get(
    "/plugins/status?plugin=" + plugin,
  )
}


export const plugin_info = (plugin: string) => {
  return serviceAxios.get(
    `/${plugin}/info`,
  )
}

export const set_forum_status = (fname: string | null = null, enable: boolean | null = null) => {
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

export const get_forum_status = () => {
  return serviceAxios.get("/review/forum")
}

export const set_no_exec = (value: boolean | null = null) => {
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

export const get_no_exec = () => {
  return serviceAxios.get("/review/no_exec")
}

export const set_keyword = (keyword: string[] | null = null) => {
  return serviceAxios.post(
    "/review/keyword",
    JSON.stringify(keyword),
  )
}

export const get_keyword = () => {
  return serviceAxios.get("/review/keyword")
}

export const set_func_status = (func: string | null = null, enable: boolean | null = null) => {
  let data
  if (!(func == null || enable == null)) {
    data = JSON.stringify({
      "function": func,
      "enable": enable
    })
  }
  return serviceAxios.post(
    "/review/function",
    data
  )
}

export const get_func_status = () => {
  return serviceAxios.get("/review/function")
}

export const get_logs = (pn: number = 1, limit: number = 20, sort: string | null = null) => {
  return serviceAxios.get(`/logs/exec?limit=${limit}&pn=${pn}`)
}

export const get_users = () => {
  return serviceAxios.get("/manager/user_pm")
}

export const set_users = (user: string, forum: string, pm: string, del: number = 0, password: string | null = null) => {
  return serviceAxios.postForm(
    "/manager/user_pm",
    {
      user: user,
      forum: forum,
      pm: pm,
      del: del,
      password: password
    }
  )
}

export const change_password = (password: string) => {
  return serviceAxios.postForm(
    "/auth/change_pwd",
    {
      password: password
    }
  )
}
