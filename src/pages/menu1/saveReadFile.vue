<!-- Created by xj on 2021-01-17. 读取/保存文件 -->
<template>
  <div class="fit q-pa-md">
    <q-card class="fit column">
      <q-card-section class="col overflow-auto scroll">
        <q-btn
          label="保存文件"
          class="q-mt-md"
          @click="saveFile"
        >
        </q-btn>
        <q-btn
          label="读取文件"
          class="q-mt-md"
          @click="readFile"
        >
        </q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'saveReadFile',
  setup (props, { root }) {
    // 保存文件
    function saveFile () {
      const DownloadDom = document.createElement('a')
      // 文件内容
      const fileText = {
        littleName: root.$store.state.baseInfo.setting.littleName,
        yourself: {
          name1: root.$store.state.baseInfo.setting.smallTip.name1,
          name2: root.$store.state.baseInfo.setting.smallTip.name2
        }
      }
      // 文件名字
      DownloadDom.download = 'x001.json'
      if (DownloadDom) {
        // Blob对象
        const myBlob = new Blob([JSON.stringify(fileText)], { type: 'application/json' })
        DownloadDom.href = window.URL.createObjectURL(myBlob)
        console.log('下载文件已就绪')
        DownloadDom.click()
      }
    }

    // 读取文件
    function readFile () {
      const readFileDom = document.createElement('input')
      readFileDom.type = 'file'
      // 监听 文件change事件
      readFileDom.addEventListener('change', event =>
        this.changeFile(event)
      )
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
      saveFile,
      readFile,
      changeFile
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
