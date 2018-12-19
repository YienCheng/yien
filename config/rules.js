module.exports = {
  // 字母开头，允许5-16字节，允许字母数字下划线
  username: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/,
  // 允许5-16字节，允许字母数字特殊字符：_-~!@#$%^&*.?
  loginPassword: /^[a-zA-z0-9_-~!@#$%^&*.?,]{5,16}$/,
  // 例如: cye_orange@163.com
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  // 例如: 32位md5验证
  md5: /^[a-fA-F0-9]{32}$/
}
