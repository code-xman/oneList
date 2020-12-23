<!-- Created by xj on 2020-11-30. page3 list -->
<template>
  <div class="fit q-pa-md">
    <q-card class="fit q-pa-md column">
      <q-page-sticky
        class="z-top"
        position="bottom-right"
        :offset="fabObj.fabPos"
      >
        <q-fab
          direction="up"
          padding="sm"
          color="accent"
          icon="keyboard_arrow_up"
          v-touch-pan.prevent.mouse="moveFab"
        >
          <q-fab-action color="accent" @click="backEdit" icon="menu" />
          <q-fab-action color="accent" @click="upFn" icon="keyboard_arrow_up" />
        </q-fab>
      </q-page-sticky>
      <q-list
        ref="refList"
        class="col full-width overflow-auto-y scroll"
        bordered
        separator
      >
        <q-item
          clickable
          v-ripple
          v-for="(item, index) in listObj.list"
          :key="index"
          class="aItem q-pa-sm overflow-hidden"
          :class="item.type === 'waitBuy' ? 'waitBuyItem' : 'boughtItem'"
          @click="changeList(index)"
        >
          <q-item-section class="text-body1 itemText">
            {{ item.value }}
          </q-item-section>
          <q-chip
            size="sm"
            :color="item.type === 'bought' ? 'primary' : 'orange'"
            text-color="white"
          >
            {{ item.type === 'bought' ? '已购' : '待购' }}
          </q-chip>
        </q-item>
        <!-- <q-separator spaced /> -->
      </q-list>
    </q-card>
  </div>
</template>

<script>
import { copy } from 'src/utils/index'
import { reactive, ref } from '@vue/composition-api'
export default {
  name: 'page3',
  setup (props, { root }) {
    const listObj = reactive({ list: [] })
    const fabObj = reactive({
      fabPos: [30, 30],
      draggingFab: false
    })

    if (!root.$store.state.baseInfo.list[0]?.value) {
      listObj.list = reactive([
        {
          value: '无',
          type: 'waitBuy'
        }
      ])
    } else {
      listObj.list = copy(root.$store.state.baseInfo.list)
    }

    function changeList (index) {
      const nowType =
        listObj.list[index].type === 'waitBuy' ? 'bought' : 'waitBuy'
      listObj.list[index].type = nowType
    }

    function backEdit () {
      root.$router.push('/page2')
    }

    const refList = ref(null)
    function upFn () {
      refList.value.$el.scrollTo(0, 0)
    }

    function moveFab (ev) {
      fabObj.draggingFab = ev.isFirst !== true && ev.isFinal !== true
      fabObj.fabPos = [
        fabObj.fabPos[0] - ev.delta.x,
        fabObj.fabPos[1] - ev.delta.y
      ]
    }

    return {
      refList,
      listObj,
      fabObj,
      changeList,
      backEdit,
      upFn,
      moveFab
    }
  }
}
</script>

<style lang="scss" scoped>
.aItem {
  margin-bottom: 10px;
}
.waitBuyItem {
  background: #4595e4;
  color: #fff;
}
.boughtItem {
  background: #009688;
  color: #fff;
}
.itemText {
  // overflow-x: auto;
  word-wrap: break-word;
  word-break: break-all;
}
</style>
