export const rules = {
  required: (v: any) => !!v || '必填项',
  numberMatch: (v: any) => /^\d+$/.test(v) || '必须是数字',
  passwordMatch: (v: any) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!/]).*$/g.test(v) || '必须包含大小写字母、数字和特殊字符',
  min: (v: any) => v.length >= 8 || '最少8位',
  max: (v: any) => v.length <= 32 || '最多32位',
}
