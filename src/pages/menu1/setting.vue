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
            :label="item.label.name1"
            :color="item.color"
          />
          <q-input
            dense
            outlined
            clearable
            class="q-pa-sm"
            placeholder="输入完成标签"
            :disable="radioObj.littleName !== 'yourself'"
            v-model="radioObj.smallTip.name1"
          />
        </div>
        <div class="q-gutter-sm">
          <q-radio
            v-for="(item, index) in radioObj.radioList"
            :key="index"
            v-model="radioObj.littleName"
            :val="item.val"
            :label="item.label.name2"
            :color="item.color"
          />
          <q-input
            dense
            outlined
            clearable
            class="q-pa-sm"
            placeholder="输入未完成标签"
            :disable="radioObj.littleName !== 'yourself'"
            v-model="radioObj.smallTip.name2"
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
import { reactive, watch } from '@vue/composition-api'
import { copy, notify } from 'src/utils/index'
export default {
  name: 'setting',
  setup (props, { root }) {
    const radioObj = reactive({
      radioList: [
        {
          val: 'shopping',
          label: {
            name1: '已购',
            name2: '待购'
          },
          color: 'orange'
        },
        {
          val: 'doing',
          label: {
            name1: '已完成',
            name2: '未完成'
          },
          color: 'red'
        },
        {
          val: 'yourself',
          label: {
            name1: '自定义',
            name2: '自定义'
          },
          color: 'cyan'
        }
      ],
      littleName: copy(root.$store.state.baseInfo.setting.littleName),
      smallTip: copy(root.$store.state.baseInfo.setting.smallTip)
    })

    // const littleName = ref(null)

    watch(
      () => radioObj.littleName,
      (val, prevVal) => {
        console.log('val :>> ', val)
        if (val === 'yourself') {
          radioObj.smallTip = {
            name1: '',
            name2: ''
          }
        } else {
          radioObj.smallTip = radioObj.radioList.find(
            item => item.val === val
          ).label
        }
      }
    )

    // 保存设置
    function saveSetting () {
      const checkedData = radioObj.radioList.find(
        item => item.val === radioObj.littleName
      )
      let sendData = { name1: '', name2: '' }
      if (checkedData.val === 'yourself') {
        sendData = radioObj.smallTip
      } else {
        sendData = checkedData.label
      }
      root.$store.commit('setSetting', {
        littleName: radioObj.littleName,
        smallTip: sendData
      })
      // radioObj.smallTip = copy(root.$store.state.baseInfo.setting.smallTip)
      notify({
        type: 'positive',
        message: '保存成功'
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
