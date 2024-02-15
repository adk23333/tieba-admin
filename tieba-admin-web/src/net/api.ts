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
  let _status = 1
  if (status) {
    _status = 1
  } else {
    _status = 0
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
  return serviceAxios.post(
    "/review/forum",
    {
      "fname": fname,
      "enable": enable
    }
  )
}


