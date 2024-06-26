export const rules = {
  required: (v: any) => !!v || '必填项',
  numberMatch: (v: any) => /^\d+$/.test(v) || '必须是数字',
  passwordMatch: (v: any) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!/]).*$/g.test(v) || '必须包含大小写字母、数字和特殊字符',
  min: (v: any) => v.length >= 8 || '最少8位',
  max: (v: any) => v.length <= 32 || '最多32位',
  passwordMatchNullable: (v: any) => v == "" || rules.passwordMatch(v),
  minNullable: (v: any) => v.length == 0 || rules.min(v),
}

export const Permission: {
  [key: string]: string
} = {
  super: "大吧主",
  high: "高权限小吧主",
  min: "小吧主",
  creator: "优秀创作者",
  ordinary: "普通成员",
  black: "黑名单",
}

export const FullPermission: { [key: string]: string } = {master: "管理员", ...Permission}
