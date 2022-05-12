<template>
  <div id="container">

    <div class="top">
      <TOP_BAR></TOP_BAR>
    </div>

    <div class="center-div part2">

      <div class="part2-1">

        <div class="menu-box">

          <el-menu v-if="is_user" class="menu" default-active="1">

            <el-menu-item index="1" style=" border-radius:40% 40% 0 0"
                          @click="this.$router.push({name:'my_plan',params:{user_plan:['#']}})">
              <el-icon>
                <checked/>
              </el-icon>
              <template #title>
                <span>MY PLAN</span>
              </template>
            </el-menu-item>

            <el-menu-item index="2" @click="this.$router.push({name:'public_plan',params:{public_plan:['#']}})">
              <el-icon>
                <list/>
              </el-icon>
              <template #title>
                <span>PUBLIC PLAN</span>
              </template>
            </el-menu-item>

            <el-menu-item index="4" style=" border-radius:0 0 40% 40%"
                          @click="this.$router.push({name:'my_detail',params:{user_detail:['#']}})">
              <el-icon>
                <setting/>
              </el-icon>
              <template #title>
                <span>SETTING</span>
              </template>
            </el-menu-item>

          </el-menu>

          <el-menu v-else class="menu" default-active="1">

            <el-menu-item index="1" style=" border-radius:40% 40% 0 0"
                          @click="this.$router.push({name:'my_plan',params:{user_plan:['#']}})">
              <el-icon>
                <Menu/>
              </el-icon>
              <template #title>
                <span>ADMIN PLAN</span>
              </template>
            </el-menu-item>

            <el-menu-item index="3" style="" @click="this.$router.push({name:'management',params:{user_list:['#']}})">
              <el-icon>
                <avatar/>
              </el-icon>
              <template #title>
                <span>MANAGE</span>
              </template>
            </el-menu-item>

            <el-menu-item index="4" style=" border-radius:0 0 40% 40%"
                          @click="this.$router.push({name:'my_detail',params:{user_detail:['#']}})">
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

          <router-view></router-view>

        </div>

      </div>

    </div>
  </div>
</template>

<script>
import ADD_EVENT from "./user-components/ADD_EVENT"
import MY_GROUP from "./user-components/MANAGEMENT"
import MY_PLAN from "./user-components/MY_PLAN"
import SETTING from "./user-components/SETTING"
import TOP_BAR from './TOP_BAR'
import {Avatar, Checked, Menu, Setting} from "@element-plus/icons-vue";

// import { useRoute } from 'vue-router'

export default {
  name: "USER",
  mounted()
  {
    //请求后端关于 user 的所有数据


    //个人信息
    //日常安排
    // /get_information post


    console.log('USER')
    console.log('username: ', this.data)

    let permissions = window.sessionStorage.getItem('permissions')

    //验证权限
    if (permissions === '2')
    {
      this.is_user = false
    }
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
        Checked,
        Menu
      },
  data()
  {
    return {
      isCollapse: false,
      choose: 1,
      //用于向后端请求数据
      data: window.sessionStorage.getItem('username'),
      is_user: true
    }
  }
}
</script>

<style lang="less" scoped>


#user-container {
  background-color: #B4E197;
  background-image: url('../assets/cross.png');
  height: 100%;
  min-height: 1287px;
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