<template>
  <div id="main">
<!--用于显示页面 默认：index组件-->
    <router-view></router-view>
  </div>
</template>

<script>

import INDEX from '../../components/HOME'

export default {
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    INDEX
  }
}
</script>

<style lang="less">

</style>
