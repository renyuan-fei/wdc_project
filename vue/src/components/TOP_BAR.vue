<template>
  <div id="top_bar">
    <span class="logo">
        <img src="./tree.png" width="80" height="80" alt="tree">
      </span>
    <ul>
      <li class="home Pointer" @click="this.$router.push('/home')">
        <el-icon>
          <home-filled/>
        </el-icon>
        HOME
      </li>

      <li class="plan Pointer" @click="this.$router.push('/calendar')">
        <el-icon>
          <calendar/>
        </el-icon>
        CALENDAR
      </li>

      <li class="account Pointer" @click="this.$router.push('/user')">
        <el-icon>
          <user-filled/>
        </el-icon>
        MY ACCOUNT

        <el-dropdown>

          <!--存在token则显示用户名-->
          <span v-if="this.username !== 'no-user-loging-so-here-is-empty'" class="avatar" @mouseout="!is_show"
                @mouseover="!is_show">
          {{ username }}
          </span>

          <!--否则显示临时头像-->
          <span v-else class="avatar" @mouseout="!is_show" @mouseover="!is_show">
            <el-icon><Avatar/></el-icon>
          </span>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-if="is_login" @click="this.$router.push('/login')">login account</el-dropdown-item>
              <el-dropdown-item v-else @click="sign_out">sign out</el-dropdown-item>
            </el-dropdown-menu>
          </template>

        </el-dropdown>
      </li>
    </ul>
  </div>
</template>

<script>
import {ElMessage, ElMessageBox} from 'element-plus'
import cookies from "vue-cookies";

import {Avatar, Calendar, HomeFilled, UserFilled} from '@element-plus/icons-vue';
// import {ArrowDown} from '@element-plus/icons-vue';

export default {
  name: "top_bar",
  props:
      {
        user: String
      },
  mounted()
  {
    //向前端请求用户数据
    console.log('TOP_BAR')
    let temp = window.localStorage.getItem('username')

    if (temp)
    {
      this.username = temp
    }
  },
  components:
      {
        // eslint-disable-next-line vue/no-unused-components
        HomeFilled,
        // eslint-disable-next-line vue/no-unused-components
        Calendar,
        // eslint-disable-next-line vue/no-unused-components
        UserFilled,
        // ArrowDown,
        Avatar
      },
  data()
  {
    return {
      username: 'no-user-loging-so-here-is-empty',
      is_login: !window.localStorage.getItem('username'),
      is_show: false,
    }
  },
  methods:
      {
        sign_out()
        {
          const cookie = cookies.get("Tree")

          let that = this;

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
            if (cookie)
            {
              that.axios({
                url: '/Logout',
                method: 'get',
              }).then(function (response)
              {
                if (response.data.status === 1)
                {
                  //清空本地的数据
                  window.localStorage.clear()

                  cookies.remove("Tree")

                  //跳转到主页面
                  that.$router.push('/home')

                  //提示退出登录的信息
                  ElMessage({
                    message: 'successfully logged out',
                    type: 'warning',
                  })
                }
              })
            } else
            {
              that.$router.push('/home')
              window.localStorage.clear()
              ElMessage({
                message: 'successfully logged out',
                type: 'warning',
              })
            }
          })
        },
      }
}
</script>

<style lang="less" scoped>

* {
  margin: 0;
  padding: 0;
}

#top_bar {
  background-color: #A2B38B;
  //background-image: linear-gradient(#E9EFC0,#B4E197);
  height: 80px;
  width: 100%;
  min-width: 1200px;

  position: relative;
}

ul {
  list-style: none;
}

#top_bar li {
  float: left;

  text-align: center;
  line-height: 80px;
}


#top_bar li:hover {
  background-color: #FCFFE7;

  border-bottom: 5px solid #E6BA95;
  border-radius: 0 0 10px 10px;
}


.Pointer {
  cursor: pointer;
}


.logo {
  text-align: center;
  width: 10%;

  float: left;

  position: relative;
}

.home {
  width: 25%;

  position: relative;
}

.plan {
  width: 25%;

  position: relative;
}

.account {
  width: 40%;

  position: relative;
}

.avatar {
  color: white;

  display: inline-block;
  margin-top: 8px;
  margin-left: 10px;
  line-height: 55px;
  height: 55px;
  width: 55px;
  border-radius: 50%;
  background-color: gray;

  border: 2px solid #E9EFC0;
}
</style>