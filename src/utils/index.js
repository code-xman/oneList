/*
 * @Author: xiangjie
 * @Date: 2020-11-27 17:01:19
 * @Last Modified by: xiangjie
 * @Last Modified time: 2020-11-27 17:05:15
 */

import XEUtils from 'xe-utils'

/***
 * 按值而非引用复制对象
 * @param {*} data 传入的DATA
 * @returns 返回的对象
 */
export function copy (data) {
  return XEUtils.clone(data, true)
}
