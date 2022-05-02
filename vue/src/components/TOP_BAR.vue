<template>
  <div id="top_bar">
    <el-menu mode="horizontal" class="top_bar">

      <el-menu-item class="item" index="1">
        <img src="./tree.png" width="80" height="80" alt="tree">
      </el-menu-item>

      <el-menu-item class="item" index="2">
        <el-icon>
          <home-filled/>
        </el-icon>
        HOME
      </el-menu-item>

      <el-menu-item class="item" index="3">
        <el-icon>
          <calendar/>
        </el-icon>
        MY PLAN
      </el-menu-item>

      <el-menu-item class="item" index="4">
        <el-icon>
          <user-filled/>
        </el-icon>
        MY ACCOUNT &nbsp;&nbsp;&nbsp;
        <el-avatar :size="50"> user</el-avatar>

<!--        <el-dropdown-menu>-->
<!--          <el-dropdown-item>sign out</el-dropdown-item>-->
<!--        </el-dropdown-menu>-->

      </el-menu-item>

    </el-menu>
  </div>
</template>

<script>
import {HomeFilled} from '@element-plus/icons-vue';
import {Calendar} from '@element-plus/icons-vue';
import {UserFilled} from '@element-plus/icons-vue';
// import {ArrowDown} from '@element-plus/icons-vue';

export default {
  name: "top_bar",
  components:
      {
        HomeFilled,
        Calendar,
        UserFilled,
        // ArrowDown
      },
}
</script>

<style lang="less" scoped>

.top_bar {
  background-color: #A2B38B;
  //background-image: linear-gradient(#E9EFC0,#B4E197);
  height: 80px;
}

.item {
  width: 25%;
}

</style>