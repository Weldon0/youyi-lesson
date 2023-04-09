// 注册pinia的流程

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
// 把user里面的模块全部导入到当前文件，然后全部导出
export * from './user'
