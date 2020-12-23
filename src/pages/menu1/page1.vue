<!-- Created by xj on 2020-11-25. page1 -->
<template>
  <div class="fit q-pa-md">
    <q-card class="fit">
      <q-scroll-area class="fit">
        <q-card-section class="row">
          <q-input
            class="col-6 q-pa-md"
            :label="ZS.name"
            v-model="ZS.value"
          ></q-input>
          <q-input class="col-6 q-pa-md" label="年龄" v-model="age"></q-input>
          <q-input
            class="col-6 q-pa-md"
            :label="LS.name"
            v-model="LS.value"
          ></q-input>
          <q-input class="col-6 q-pa-md" label="年龄" v-model="age"></q-input>
          <!-- 没有很明白，WW.name/WW.age 为ref对象，讲道理这里应该不需要.value -->
          <q-input
            class="col-6 q-pa-md"
            label="姓名"
            v-model="WW.name.value"
          ></q-input>
          <q-input
            class="col-6 q-pa-md"
            label="年龄"
            v-model="WW.age.value"
          ></q-input>
          <q-input
            ref="refNum"
            class="col-6 q-pa-md"
            label="num"
            v-model="num"
          ></q-input>
        </q-card-section>
        <q-card-section>
          <q-btn @click="changeData">隐姓埋名</q-btn>
          <q-btn @click="stop">暂停age</q-btn>
          <!-- <q-btn @click="aaa">暂停num</q-btn> -->
        </q-card-section>
      </q-scroll-area>
    </q-card>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  watchEffect,
  watch,
  onMounted,
  toRefs
} from '@vue/composition-api'
export default {
  name: 'page1',
  setup (props, context) {
    const refNum = ref(null)
    let num = 0
    const age = ref(0)
    const ZS = reactive({ name: '姓名', value: '张三' })
    const LS = reactive({ name: '姓名', value: '李四' })
    const WWobj = reactive({ name: '王五', age: 0 })

    const WW = toRefs(WWobj)
    // toRefs 将WWobj的name和age转为ref对象
    // console.log('ww.name :>> ', WW.name)
    // console.log('ww.age :>> ', WW.age)

    // 立即执行 传入的一个函数(因此会比watch多执行一次)，并响应式追踪其依赖，并在其依赖变更时重新运行该函数。
    // 调用stop可以停止该watchEffect监听，不会影响其他watchEffect
    const stop = watchEffect(() => console.log('age.value :>> ', age.value))
    // watchEffect(async onInvalidate => {
    //   const asyncFn = setTimeout(() => {
    //     console.log('ZS.value :>> ', ZS.value)
    //   }, 1000)
    //   onInvalidate(() => asyncFn.cancel())
    // })

    watch(
      () => LS.value,
      (val, oldVal) => {
        console.log('val :>> ', val)
        console.log('oldVal :>> ', oldVal)
      }
    )

    function changeData () {
      // 这里的context.num为NaN
      // console.log('context :>> ', context)
      ZS.value = `张三${num}号`
      LS.value = `李四${age.value}号`
      age.value++
      num++

      // 这里看上去 WW.age.value === WWobj.age
      console.log('WW.age.value :>> ', WW.age.value)
      WW.age.value++
      console.log('WWobj.age :>> ', WWobj.age)
      WWobj.age++
      console.log('WW.age.value :>> ', WW.age.value)
    }

    onMounted(() => {
      console.log(refNum)
    })

    return {
      refNum,
      num,
      ZS,
      LS,
      WW,
      age,
      changeData,
      stop
    }
  }
}
</script>

<style lang="scss" scoped></style>
