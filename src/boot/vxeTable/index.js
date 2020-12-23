// 工具库
import 'xe-utils'
// 基础库
import VXETable from 'vxe-table'
import './vxe.scss'

import './format'
import './render'
import './setup'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file

export default async ({ Vue }) => {
  Vue.use(VXETable)
}
