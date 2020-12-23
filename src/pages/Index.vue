<template>
  <div class="fit q-pa-md">
    <q-card class="fit q-pa-md">
      <!-- <q-card-section class="fit flex flex-center">
        <img alt="Quasar logo" src="~assets/quasar-logo-full.svg" />
      </q-card-section> -->
      <q-card-section class="fit flex flex-center">
        <q-btn color="primary" label="开始使用 one list" @click="startFn" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'PageIndex',
  setup (props, { root }) {
    function startFn () {
      root.$router.push('/page2')
    }
    return {
      startFn
    }
  }
}
</script>
