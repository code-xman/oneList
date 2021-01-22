<!-- Created by xj on 2021-01-17. 读取/保存文件 -->
<template>
  <div class="fit q-pa-md">
    <q-card class="fit column">
      <q-card-section class="col overflow-auto scroll">
        <q-input
          dense
          outlined
          clearable
          class="q-pa-sm"
          label="文件名称"
          v-model="fileObj.name"
          lazy-rules
          :rules="[val => (val && val.length > 0) || '请输入名称']"
        />
        <q-btn label="保存文件" class="q-mt-md" @click="saveFile"> </q-btn>
        <q-btn label="读取文件" class="q-mt-md" @click="readFile"> </q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
export default {
  name: 'saveReadFile',
  setup (props, { root }) {
    const fileObj = reactive({
      name: ''
    })
    // 保存文件
    function saveFile () {
      if (!fileObj.name) {
        return
      }
      const downloadEle = document.createElement('a')
      // 文件内容
      const fileText = root.$store.state.baseInfo.setting
      // 文件名字
      downloadEle.download = fileObj.name + '.json'
      if (downloadEle) {
        // Blob对象
        const myBlob = new Blob([JSON.stringify(fileText)], {
          type: 'application/json'
        })
        downloadEle.href = window.URL.createObjectURL(myBlob)
        console.log('下载文件已就绪')
        downloadEle.click()
      }
    }

    // 读取文件
    function readFile () {
      const readFileDom = document.createElement('input')
      readFileDom.type = 'file'
      // 监听 文件change事件
      readFileDom.addEventListener('change', event => this.changeFile(event))
      readFileDom.click()
    }

    function changeFile (event) {
      // console.log('event :>> ', event.target.files[0])
      var reader = new FileReader()
      // 以文本格式读取内容
      reader.readAsText(event.target.files[0])
      // 该事件将在读取操作完成时触发，在这个事件中我们能访问到FileReader.result属性，得到读取结果
      reader.onload = function () {
        var text = reader.result
        console.log('text :>> ', text)
      }
    }

    return {
      fileObj,
      saveFile,
      readFile,
      changeFile
    }
  }
}
</script>

<style lang="scss" scoped></style>
