<template>
  <div id="user-container">

    <div class="top">
      <TOP_BAR></TOP_BAR>
    </div>

    <div class="center-div part2">

      <div class="part2-1">

        <div class="menu-box">

          <el-menu class="menu" default-active="1">

            <el-menu-item index="1" style=" border-radius:40% 40% 0 0" @click="choose=1">
              <el-icon>
                <list/>
              </el-icon>
              <template #title>
                <span>MY PLAN</span>
              </template>
            </el-menu-item>

            <el-menu-item index="2" style="" @click="choose=2">
              <el-icon>
                <avatar/>
              </el-icon>
              <template #title>
                <span>MY GROUP</span>
              </template>
            </el-menu-item>

            <el-menu-item index="3" style=" border-radius:0 0 40% 40%" @click="choose=3">
              <el-icon>
                <setting/>
              </el-icon>
              <template #title>
                <span>SETTING</span>
              </template>
            </el-menu-item>

          </el-menu>

        </div>

      </div>

      <div class="part2-2">

        <div class="main-box">

          <span v-show="choose === 1">
            <MY_PLAN :user="data"></MY_PLAN>
          </span>

          <span v-show="choose === 2">
            <MY_GROUP :user="data"></MY_GROUP>
          </span>

          <span v-show="choose === 3">
            <SETTING :user="data"></SETTING>
          </span>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import ADD_EVENT from "./user-components/ADD_EVENT"
import MY_GROUP from "./user-components/MY_GROUP"
import MY_PLAN from "./user-components/MY_PLAN"
import SETTING from "./user-components/SETTING"
import TOP_BAR from './TOP_BAR'
import {Setting, Avatar} from "@element-plus/icons-vue";

// import { useRoute } from 'vue-router'

export default {
  name: "USER",
  mounted()
  {
    console.log('USER')
    console.log('username: ', this.data)
  },
  components:
      {
        // eslint-disable-next-line vue/no-unused-components
        Avatar,
        // eslint-disable-next-line vue/no-unused-components
        Setting,
        // eslint-disable-next-line vue/no-unused-components
        TOP_BAR,


        // eslint-disable-next-line vue/no-unused-components
        ADD_EVENT,
        // eslint-disable-next-line vue/no-unused-components
        MY_GROUP,
        // eslint-disable-next-line vue/no-unused-components
        MY_PLAN,
        // eslint-disable-next-line vue/no-unused-components
        SETTING,
      },
  data()
  {
    return {
      isCollapse: false,
      choose: 1,
      //用于向后端请求数据
      data: window.sessionStorage.getItem('username')
    }
  }
}
</script>

<style lang="less" scoped>


#user-container {
  background-color: #B4E197;
  background-image: url('../assets/cross.png');
  height: 1287px;
}


.top {
  height: 80px;
  background-color: #333333;
}


.center-div {
  margin: 0 auto;
}

.part2 {
  position: relative;

  width: 100%;
  min-width: 1200px;
  height: 1207px;
  //background-color: green;
}


.part2-1 {
  position: absolute;

  width: 30%;
  height: 100%;
  //background-color: #ffa500;

  float: left;
}

.part2-2 {
  position: absolute;

  left: 30%;

  width: 70%;
  height: 100%;
  //background-color: #87ceeb;

  float: left;
}


.menu-box {
  position: absolute;
  width: 300px;
  height: 300px;
  //background: red;
  left: 28%;
  top: 30%;
}

.menu {
  margin: 0 auto;

  width: 160px;

  min-width: 160px;

  border-radius: 20px;

  top: 20%;
}

.main-box {
  position: absolute;
  width: 800px;
  height: 800px;
  //background: red;
  left: 5%;
  top: 10%;
}


</style>