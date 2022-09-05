/*
 * @Description:
 * @version:
 * @Author: Murphy
 * @Date: 2022-04-02 10:22:43
 * @LastEditTime: 2022-04-06 09:35:19
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
  // runtimeCompiler:true // 配置完成版，运行时版本无法识别template
})
