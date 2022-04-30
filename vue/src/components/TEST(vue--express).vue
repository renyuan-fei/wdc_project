<template>
  <div id="test">
    <button @click="test">测试</button>
    <div>{{ data }}</div>
  </div>
</template>

<script>
// import axios from "axios";

import axios from "axios";

export default {
  name: "TEST(vue--express)",
  data()
  {
    return {
      data: '结果'
    }
  },
  methods: {
    async test()
    {
      //获取this
      //必须通过转获取，
      let that = this

      await axios({
        methods: 'get',
        url: 'http://localhost:3000/test'
      }).then(function (response)
      {
        that.data = response.data
        console.log(response.data);
      }).catch(function (error)
      {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>