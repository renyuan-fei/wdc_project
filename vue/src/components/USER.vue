<template>
  <el-container class="user-container">
    <el-header style="height:80px">
      <TOP_BAR></TOP_BAR>
    </el-header>
    <el-container style="margin-top:20px;">

      <el-row style="width:37%">
        <el-col :span="5"></el-col>
        <el-col :span="10">
          <el-aside style="text-align: center; border-radius:30px;" width="200px">
            <el-menu
                class="el-menu-vertical-demo"
                default-active="1"
                style="border-radius:20%; margin-top:100%"
            >

              <el-menu-item index="1" style="height:80px; border-radius:40% 40% 0 0" @click="choose=1">
                <el-icon>
                  <list/>
                </el-icon>
                <template #title>
                  <span>MY PLAN</span>
                </template>
              </el-menu-item>

              <el-menu-item index="2" style="height:80px" @click="choose=2">
                <el-icon>
                  <avatar/>
                </el-icon>
                <template #title>
                  <span>MY GROUP</span>
                </template>
              </el-menu-item>

              <el-menu-item index="3" style="height:80px; border-radius:0 0 40% 40%" @click="choose=3">
                <el-icon>
                  <setting/>
                </el-icon>
                <template #title>
                  <span>SETTING</span>
                </template>
              </el-menu-item>

            </el-menu>
          </el-aside>
        </el-col>
        <el-col :span="9"></el-col>
      </el-row>

      <el-main style="width:63%">
        <el-row style="margin-top:10%">
          <el-col :span="14">

            <span v-show="choose === 1">
            <MY_PLAN></MY_PLAN>
            </span>

            <span v-show="choose === 2">
            <MY_GROUP></MY_GROUP>
            </span>

            <span v-show="choose === 3">
            <SETTING></SETTING>
            </span>

          </el-col>
          <el-col :span="10"></el-col>
        </el-row>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
import ADD_EVENT from "./user-components/ADD_EVENT"
import MY_GROUP from "./user-components/MY_GROUP"
import MY_PLAN from "./user-components/MY_PLAN"
import SETTING from "./user-components/SETTING"
import TOP_BAR from './TOP_BAR'
import {Setting, Avatar} from "@element-plus/icons-vue";

export default {
  name: "USER",
  components:
      {
        Avatar,
        Setting,
        TOP_BAR,


        // eslint-disable-next-line vue/no-unused-components
        ADD_EVENT,
        MY_GROUP,
        MY_PLAN,
        SETTING,
      },
  data()
  {
    return {
      isCollapse: false,
      choose: 1,
    }
  }
}
</script>

<style lang="less" scoped>

* {
  margin: 0;
  padding: 0;
}

.user-container {
  background-color: #B4E197;
  background-image: url('../assets/cross.png');
  height: 100%
}

</style>