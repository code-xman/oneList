<!-- Created by xj on 2020-11-26. page2 表单  -->
<template>
  <div class="fit q-pa-md">
    <q-card class="fit column">
      <q-card-section class="q-px-none row justify-around btn-box">
        <!-- <q-btn-group> -->
        <q-btn outline rounded color="secondary" @click="addFn">
          添加
        </q-btn>
        <q-btn outline rounded color="secondary" @click="deleteFn">
          删除
        </q-btn>
        <q-btn outline rounded color="secondary" @click="restFn">
          重置
        </q-btn>
        <q-btn outline rounded color="secondary" @click="toListFn">
          查看
        </q-btn>
        <!-- </q-btn-group> -->
      </q-card-section>
      <q-card-section class="col overflow-auto scroll">
        <q-form>
          <q-input
            dense
            outlined
            clearable
            class="q-mt-sm"
            v-for="(item, index) in listObj.formlist"
            :key="index"
            :disable="item.type === 'bought'"
            v-model="item.value"
            @focus="inputFocus(index)"
          >
          </q-input>
        </q-form>
      </q-card-section>
    </q-card>
    <q-dialog v-model="tip.show">
      <q-card style="width: 80vw;">
        <q-card-section>
          <div class="text-h6">{{ tip.title }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          {{ tip.text }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="tip.btnText" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
import { copy } from 'src/utils/index'
export default {
  name: 'page2',
  setup (props, { root }) {
    const listObj = reactive({
      formlist: [
        {
          value: '',
          type: 'waitBuy'
        }
      ],
      inputIndex: 0
    })
    const tip = reactive({
      title: '提示',
      text: '检测到有未填写项',
      btnText: '好的',
      show: false
    })

    if (root.$store.state.baseInfo.list[0]?.value) {
      listObj.formlist = copy(root.$store.state.baseInfo.list)
    }

    const addFn = () => {
      listObj.formlist.push({
        value: '',
        type: 'waitBuy'
      })
    }
    const deleteFn = () => {
      if (
        listObj.formlist.length < 2 ||
        listObj.formlist[listObj.inputIndex].type === 'bought'
      ) {
        return
      }
      listObj.formlist.splice(listObj.inputIndex, 1)
      listObj.inputIndex = 0
    }
    const restFn = () => {
      listObj.formlist = [
        {
          value: '',
          type: 'waitBuy'
        }
      ]
    }

    function toListFn () {
      const isNullArr = listObj.formlist.filter(item => !item.value)
      if (isNullArr.length > 0) {
        tip.show = true
      } else {
        root.$store.commit('setList', listObj.formlist)
        root.$router.push('/page3')
      }
    }
    function inputFocus (index) {
      listObj.inputIndex = index
    }
    return {
      listObj,
      tip,
      addFn,
      deleteFn,
      restFn,
      toListFn,
      inputFocus
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-box button {
  min-width: 70px;
}
</style>
