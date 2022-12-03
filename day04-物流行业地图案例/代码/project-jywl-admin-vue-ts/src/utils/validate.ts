export const isValidUsername = (str: string) =>
  ['admin', 'editor'].indexOf(str.trim()) >= 0

export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)

export const isArray = (arg: any) => {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

export const isValidURL = (url: string) => {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}
// 表单校验
export const validateNumber = (rule: any, value: any, callback: any) => {
  const numberReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/g
  if (value !== '') {
    if (!numberReg.test(value)) {
      callback(new Error('请输入正确的数字'))
    } else {
      callback()
    }
  } else {
    callback(new Error('请输入体积'))
  }
}
// 手机校验
export function validatePhone(rule: any, value: any, callback: any) {
  const reg = /^[1][3-9][0-9]{9}$/
  if (value === '' || value === undefined || value === null) {
    if (rule.required) {
      callback(new Error('请输入电话号码'))
    } else {
      callback()
    }
  } else {
    if (!reg.test(value) && value !== '') {
      callback(new Error('请输入正确的电话号码'))
    } else {
      callback()
    }
  }
}
// 整数有两位小数点
export const validateValidity = (value: any, error: any) => {
  let data = '' as any
  // 解决首位是点的问题
  if (value.toString().indexOf('.') === 0) {
    error.error('请输入正确的整数')
    return (data = value.replace(/^\./g, ''))
  }
  // 保留两位小数
  if (value) {
    data = value.replace(/^(\d+)\.(\d\d).*$/, '$1.$2')
  }
  // 解决首位是0的问题
  if (value.indexOf('.') < 0 && value !== '') {
    // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    if (value.substr(0, 1) === '0' && value.length === 2) {
      error.error('请输入正确的整数')
      data = value.substr(1, value.length)
    }
  }

  if (data.length > 13) {
    error.error('请输入正确的整数')
    data = value.substr(0, 13)
  }
  return data
}
// 正整数
export const isIntegerNotMust = (value: any) => {
  const reg = /^[0-9]*[1-9][0-9]*$/
  return reg.test(value)
}

// 邮箱验证
export function validateEMail(value: any) {
  const reg = /^([a-zA-Z0-9]+[\w]?)+@[a-zA-Z0-9]+\.[a-z]+$/
  return reg.test(value)
}

// 用户名校验  -----   正确的用户名：admin
// 校验规则：   -----   1.不能为空，为空提示2.用户名不一致提示
export function validateLoginUser(rule: any, value: any, callback: any) {
  if (value) {
    if (value === 'admin') {
      callback()
    } else {
      callback(new Error('账号错误，请重新输入'))
    }
  } else {
    if (rule.required) {
      callback(new Error('请输入账户'))
    } else {
      callback()
    }
  }
}

// 密码校验  -----   正确的密码：111111
// 校验规则：   -----   1.不能为空，为空提示2.密码不一致提示
export function validateLoginPwd(rule: any, value: any, callback: any) {
  if (value) {
    if (value === '111111') {
      callback()
    } else {
      callback(new Error('密码错误，请重新输入'))
    }
  } else {
    if (rule.required) {
      callback(new Error('请输入密码'))
    } else {
      callback()
    }
  }
}

// 校验输入的数据是整数
export function validateInt(rule: any, value: any, callback: any) {
  if (value) {
    if (isIntegerNotMust(value)) {
      if (value > 999999999) {
        callback(new Error('最大值不能超过999999999'))
      } else {
        callback()
      }
    } else {
      callback(new Error('只能输入整数'))
    }
  } else {
    if (rule.required) {
      callback(new Error('请输入正整数'))
    } else {
      callback()
    }
  }
}

// 校验输入的数据是小数
export function validateFloat(rule: any, value: any, callback: any) {
  if (value) {
    const str = String(value).split('.')[1]
    if ((!str || str.length === 2) && value < 999999999) {
      callback()
    } else {
      callback(new Error('只能输入小于999999999的数字且小数点后最多为2位'))
    }
  } else {
    if (rule.required) {
      callback(new Error('请输入小数'))
    } else {
      callback()
    }
  }
}
