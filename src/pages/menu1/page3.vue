<!-- Created by xj on 2020-11-30. page3 list -->
<template>
  <div class="fit q-pa-md">
    <q-card class="fit q-pa-md column">
      <!-- position 原点位置，offset 距原点位置 [x，y] -->
      <q-page-sticky
        ref="fabRef"
        class="z-top"
        position="bottom-right"
        :offset="fabObj.fabPos"
      >
        <!-- direction 展开项 up/down -->
        <q-fab
          padding="sm"
          color="accent"
          icon="keyboard_arrow_up"
          :direction="fabObj.dir"
          v-touch-pan.prevent.mouse="moveFab"
        >
          <!-- label-position label在 left/right -->
          <q-fab-action
            color="accent"
            @click="backEdit"
            icon="menu"
            label="编辑"
            external-label
            :label-position="fabObj.again"
          />
          <q-fab-action
            color="accent"
            @click="classify"
            icon="send"
            label="分类"
            external-label
            :label-position="fabObj.again"
          />
          <q-fab-action
            color="accent"
            @click="upFn"
            icon="keyboard_arrow_up"
            label="至顶"
            external-label
            :label-position="fabObj.again"
          />
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
            {{
              item.type === 'bought' ? listObj.smallTip.name1 : listObj.smallTip.name2
            }}
          </q-chip>
        </q-item>
        <!-- <q-separator spaced /> -->
      </q-list>
    </q-card>
  </div>
</template>

<script>
import { dom } from 'quasar'
import { copy } from 'src/utils/index'
import { reactive, ref } from '@vue/composition-api'
export default {
  name: 'page3',
  setup (props, { root }) {
    const { offset } = dom
    // ref fabRef
    const fabRef = ref(null)
    // 清单数据
    const listObj = reactive({
      list: [],
      // 小标签
      smallTip: {
        name1: root.$store.state.baseInfo.setting.smallTip.name1,
        name2: root.$store.state.baseInfo.setting.smallTip.name2
      }
    })
    // 可拖动按钮数据
    const fabObj = reactive({
      fabPos: [30, 30],
      draggingFab: false,
      dir: 'up',
      again: 'left'
    })

    if (!root.$store.state.baseInfo.list[0]?.value) {
      listObj.list = reactive([
        {
          value: '',
          type: 'waitBuy'
        }
      ])
    } else {
      listObj.list = copy(root.$store.state.baseInfo.list)
    }

    // 点击触发 改变状态
    function changeList (index) {
      const nowType =
        listObj.list[index].type === 'waitBuy' ? 'bought' : 'waitBuy'
      listObj.list[index].type = nowType
    }

    // 分类
    function classify () {
      const boughtArr = listObj.list.filter(item => item.type === 'bought')
      const waitBuyArr = listObj.list.filter(item => item.type === 'waitBuy')
      listObj.list = waitBuyArr.concat(boughtArr)
    }

    function backEdit () {
      root.$store.commit('setList', listObj.list)
      root.$router.push('/page2')
    }

    const refList = ref(null)
    function upFn () {
      refList.value.$el.scrollTo(0, 0)
    }

    function moveFab (ev) {
      fabObj.draggingFab = ev.isFirst !== true && ev.isFinal !== true
      // x y 为fab距原点的x/y方向的距离
      let x = fabObj.fabPos[0] - ev.delta.x
      let y = fabObj.fabPos[1] - ev.delta.y
      if (ev.isFinal) {
        // top/left 为fab在页面上距 上/左边的距离
        const { top, left } = offset(fabRef.value.$el)
        // console.log(top, left)
        // console.log('fabObj.fabPos :>> ', fabObj.fabPos)

        // 根据情况改变 展开项的展开方向
        if (y > top) {
          fabObj.dir = 'down'
        } else {
          fabObj.dir = 'up'
        }
        if (x > left) {
          fabObj.again = 'right'
        } else {
          fabObj.again = 'left'
        }

        // 处理fab被拖入不可见区域
        if (top < 0) {
          y = top + y - 9
        } else if (y < 0) {
          y = 9
        }
        if (left < 0) {
          x = left + x - 9
        } else if (x < 0) {
          x = 9
        }
      }

      fabObj.fabPos = [x, y]
    }

    return {
      fabRef,
      refList,
      listObj,
      fabObj,
      changeList,
      backEdit,
      classify,
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
