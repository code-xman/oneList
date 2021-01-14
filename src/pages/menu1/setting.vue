<!-- Created by xj on 2021-01-03. 设置页面 -->
<template>
  <div class="fit q-pa-md">
    <q-card class="fit column">
      <q-card-section class="col overflow-auto scroll">
        小标签
        <div class="q-gutter-sm">
          <q-radio
            v-for="(item, index) in radioObj.radioList"
            :key="index"
            v-model="radioObj.littleName"
            :val="item.val"
            :label="item.label[0]"
            :color="item.color"
          />
          <q-input
            dense
            outlined
            class="q-pa-sm"
            placeholder="输入完成标签"
            :disable="radioObj.littleName !== 'yourself'"
            v-model="radioObj.yourself.name1"
          />
        </div>
        <div class="q-gutter-sm">
          <q-radio
            v-for="(item, index) in radioObj.radioList"
            :key="index"
            v-model="radioObj.littleName"
            :val="item.val"
            :label="item.label[1]"
            :color="item.color"
          />
          <q-input
            dense
            outlined
            class="q-pa-sm"
            placeholder="输入未完成标签"
            :disable="radioObj.littleName !== 'yourself'"
            v-model="radioObj.yourself.name2"
          />
        </div>
        <div class="row justify-end">
          <q-btn
            label="保存"
            class="q-mt-md"
            color="primary"
            @click="saveSetting"
          >
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
import { copy } from 'src/utils/index'
export default {
  name: 'setting',
  setup (props, { root }) {
    const radioObj = reactive({
      radioList: [
        {
          val: 'shopping',
          label: ['已购', '待购'],
          color: 'orange'
        },
        {
          val: 'doing',
          label: ['已完成', '未完成'],
          color: 'red'
        },
        {
          val: 'yourself',
          label: ['自定义', '自定义'],
          color: 'cyan'
        }
      ],
      littleName: copy(root.$store.state.baseInfo.setting.littleName),
      yourself: {
        name1: copy(root.$store.state.baseInfo.setting.smallTip.name1),
        name2: copy(root.$store.state.baseInfo.setting.smallTip.name2)
      }
    })

    // const littleName = ref(null)

    // watch(
    //   () => radioObj.littleName,
    //   (val, prevVal) => {
    //     console.log('val :>> ', val)
    //   }
    // )

    // 保存设置
    function saveSetting () {
      const checkedData = radioObj.radioList.find(item => item.val === radioObj.littleName)
      let sendData = { name1: '', name2: '' }
      if (checkedData.val === 'yourself') {
        sendData = radioObj.yourself
      } else {
        sendData = {
          name1: checkedData.label[0],
          name2: checkedData.label[1]
        }
      }
      root.$store.commit('setSetting', {
        littleName: radioObj.littleName,
        smallTip: sendData
      })
    }

    return {
      radioObj,
      saveSetting
    }
  }
}
</script>

<style lang="scss" scoped></style>
