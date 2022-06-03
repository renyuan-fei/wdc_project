<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
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
    TESTVueExpress,
  },
  data()
  {
    return {

    }
  },
  methods:
      {

      }
}
</script>

<style lang="less">

#container {
  position: fixed;

  background-color: #B4E197;
  background-image: url('../assets/cross.png');

  height: 100%;
  min-height: 1287px;

  width: 100%;
  min-width: 1400px;
}

.center-div {
  margin: 0 auto;
}

</style>
