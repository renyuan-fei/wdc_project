<template>
  <el-container class="user-container">
    <el-header style="height:80px">
      <TOP_BAR></TOP_BAR>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color:red; text-align: center ;">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px; margin-top: 20px;">
          <el-radio-button :label="false">expand</el-radio-button>
          <el-radio-button :label="true">collapse</el-radio-button>
        </el-radio-group>
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
        >
          <el-menu-item index="1">
            <template #title>
              <el-icon>
                <location/>
              </el-icon>
              <span>ADD EVENT</span>
            </template>
          </el-menu-item>

          <el-menu-item index="2">
            <template #title>
              <el-icon>
                <avatar/>
              </el-icon>
              <span>MY GROUP</span>
            </template>
          </el-menu-item>

          <el-menu-item index="3">
            <template #title>
              <el-icon>
                <setting/>
              </el-icon>
              <span>SETTING</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="background-color:blue;">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import TOP_BAR from './TOP_BAR'
import {Setting, Avatar, Location} from "@element-plus/icons-vue";

export default {
  name: "USER",
  components:
      {
        Location,
        Avatar,
        Setting,
        // eslint-disable-next-line vue/no-unused-components
        TOP_BAR,
      },
  data()
  {
    return {
      isCollapse: true,
      data: 'USER',
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
  height: 100%
}

</style>