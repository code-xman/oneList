<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        /> -->

        <q-toolbar-title>
          易分清单
        </q-toolbar-title>

        <div>One_List v0.0.1</div>
      </q-toolbar>
    </q-header>

    <!-- <q-drawer v-model="leftDrawerOpen" content-class="bg-grey-1">
      <q-scroll-area class="fit">
        <q-list>
          <q-expansion-item
            group="menu"
            v-for="(menu, index) in menuList"
            :key="index"
            expand-separator
            :icon="menu.icon"
            :label="menu.label"
            header-class="text-primary"
          >
            <q-item
              v-for="(item, itemIndex) in menu.children"
              :key="itemIndex"
              :to="item.route"
              :inset-level="1"
              exact
              clickable
            >
              <q-item-section>
                <q-item-label>
                  {{ item.label }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
    </q-drawer> -->

    <q-page-container>
      <q-page :style-fn="tweak" class="bg-grey-3">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  setup (props, content) {
    const menuList = [
      {
        label: '菜单',
        icon: 'school',
        children: [
          {
            label: '首页',
            route: '/home'
          },
          {
            label: '编辑页',
            route: '/page2'
          },
          {
            label: '列表页',
            route: '/page3'
          }
        ]
      }
    ]

    function tweak (offset, height) {
      return { height: `${height - offset}px` }
    }

    return {
      leftDrawerOpen: false,
      menuList,
      tweak
    }
  }
}
</script>
