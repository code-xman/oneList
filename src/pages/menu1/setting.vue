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
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { reactive, watch } from '@vue/composition-api'
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
      littleName: 'shopping',
      yourself: {
        name1: '',
        name2: ''
      }
    })

    // const littleName = ref(null)

    watch(
      () => radioObj.littleName,
      (val, prevVal) => {
        console.log('val :>> ', val)
      }
    )

    return {
      radioObj
    }
  }
}
</script>

<style lang="scss" scoped></style>
