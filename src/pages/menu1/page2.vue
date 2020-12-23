<!-- Created by xj on 2020-11-26. page2 表单  -->
<template>
  <div class="fit q-pa-md">
    <q-card class="fit column">
      <!-- <q-card-section> -->
      <q-btn-group spread push>
        <q-btn color="secondary" @click="addFn">添加</q-btn>
        <q-btn color="secondary" @click="deleteFn">删除</q-btn>
        <q-btn color="secondary" @click="restFn">重置</q-btn>
        <q-btn color="secondary" @click="toListFn">查看</q-btn>
      </q-btn-group>
      <!-- </q-card-section> -->
      <q-card-section class="col overflow-auto scroll">
        <q-form>
          <q-input
            dense
            outlined
            clearable
            class="q-mt-sm"
            v-for="(item, index) in listObj.formlist"
            :key="index"
            v-model="item.value"
            @focus="inputFocus(index)"
          >
          </q-input>
        </q-form>
      </q-card-section>
    </q-card>
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
      // lsit: []
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
      if (listObj.formlist.length < 2) {
        return
      }
      listObj.formlist.splice(listObj.inputIndex, 1)
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
      // listObj.list = copy(listObj.formlist)
      // console.log('root.$store:>> ', root.$store)
      root.$store.commit('setList', listObj.formlist)
      root.$router.push('/page3')
    }
    function inputFocus (index) {
      listObj.inputIndex = index
    }
    return {
      listObj,
      addFn,
      deleteFn,
      restFn,
      toListFn,
      inputFocus
    }
  }
}
</script>

<style lang="scss" scoped></style>
