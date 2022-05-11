<template>
    <router-view></router-view>
</template>

<script>

import INDEX from '../components/HOME'
import TESTVueExpress from "@/components/TEST(vue--express)";

export default {
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    INDEX,
    // eslint-disable-next-line vue/no-unused-components
    TESTVueExpress
  }
}
</script>

<style lang="less">

</style>
