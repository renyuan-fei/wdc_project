<template>
  <div id="top_bar">
    <el-menu mode="horizontal" class="top_bar">

      <span class="logo">
        <img src="./tree.png" width="80" height="80" alt="tree">
      </span>

      <el-menu-item class="home" index="1" @click="this.$router.push('/home')">
        <el-icon>
          <home-filled/>
        </el-icon>
        HOME
      </el-menu-item>

      <el-menu-item class="plan" index="2" @click="this.$router.push('/user')">
        <el-icon>
          <calendar/>
        </el-icon>
        CALENDAR
      </el-menu-item>

      <el-menu-item class="account" index="3" @click="this.$router.push('/user')">
        <el-icon>
          <user-filled/>
        </el-icon>
        MY ACCOUNT &nbsp;&nbsp;&nbsp;
        <el-dropdown @visible-change="menu_list">
    <span class="el-dropdown-link">
      <el-avatar :size="50"> user</el-avatar>
    </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-if="is_login" @click="this.$router.push('/login')">login account</el-dropdown-item>
              <el-dropdown-item v-else @click="sign_out">sign out</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

      </el-menu-item>

    </el-menu>
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'


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
  data()
  {
    return {
      is_login: true,
    }
  },
  methods:
      {
        sign_out()
        {
          const token = window.sessionStorage.getItem('token')

          ElMessageBox.confirm(
              'Are you sure you want to log out',
              'Warning',
              {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning',
              }
          ).then(() =>
          {
            if (token)
            {
              //清空token
              window.sessionStorage.clear()

              //跳转到主页面
              this.$router.push('/home')

              //提示退出登录的信息
              ElMessage({
                message: 'successfully logged out',
                type: 'warning',
              })
            }
          })
        },
        menu_list()
        {
          console.log('触发事件')

          const token = window.sessionStorage.getItem('token')

          if (token)
          {
            this.is_login = false;
          }
          else
          {
            this.is_login = true;
          }
        }
      }
}
</script>

<style lang="less" scoped>

*
{
  margin: 0;
  padding: 0;
}

.top_bar {
  background-color: #A2B38B;
  //background-image: linear-gradient(#E9EFC0,#B4E197);
  height: 80px;
}

.logo
{
  text-align: center;
  width:10%;
}

.home
{
  width:25%;
}

.plan
{
  width:25%;
}

.account
{
  width:40%;
}
</style>