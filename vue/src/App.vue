<template>
  <div id="main">
    <LOGIN></LOGIN>
  </div>
</template>

<script>

import TEST from './components/TEST(vue--express)'
import LOGIN from './components/LOGIN'

export default {
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    TEST,
    // eslint-disable-next-line vue/no-unused-components
    LOGIN
  }
}
</script>

<style lang="less">

</style>
