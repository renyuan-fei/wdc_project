<template>
  <span id="setting">
    <el-card v-show="!is_reset" class="add_event">

    <template #header>
      ACCOUNT DETAIL
    </template>

    <el-descriptions
        :column="1"
        border
        direction="horizontal"
        style="margin-top:60px; margin-bottom:80px;"
    >
      <el-descriptions-item align="center" label="Username">{{ username }}</el-descriptions-item>
      <el-descriptions-item align="center" label="Password">{{ password }}</el-descriptions-item>
      <el-descriptions-item align="center" label="Email">{{ email }}</el-descriptions-item>
      <el-descriptions-item :span="2" align="center"
                            label="permission">{{ PERMISSION[this.permission] }}</el-descriptions-item>
      <el-descriptions-item align="center" label="Gender">
<!--        :type="COLOR[this.gender]"-->
        <el-tag size="small">{{ GENDER[this.gender] }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item align="center" label="First_name">{{ first_name }}</el-descriptions-item>
      <el-descriptions-item align="center" label="Last_name">{{ last_name }}</el-descriptions-item>
    </el-descriptions>

    <el-divider style="margin-bottom:80px;"/>

    <el-button round type="danger" @click="this.is_reset = true">RESET PASSWORD</el-button>
    </el-card>

    <RESET_PASSWORD v-show="is_reset" :data="is_reset" @changedata="change_data"></RESET_PASSWORD>

  </span>
</template>

<script>
import {Male, Female} from "@element-plus/icons-vue";
import RESET_PASSWORD from "@/components/user-components/RESET_PASSWORD";
// eslint-disable-next-line no-unused-vars

export default {
  name: "ADD_EVENT",
  mounted()
  {
    //向后端请求用户信息
    console.log('SETTING')
    console.log(this.$route.params.user_detail)

    if (this.user)
    {
      this.username = this.user
    }
  },
  components:
      {
        // eslint-disable-next-line vue/no-unused-components
        Male,
        // eslint-disable-next-line vue/no-unused-components
        Female,

        RESET_PASSWORD
      },
  data()
  {
    return {
      is_reset: false,

      PERMISSION: ['user', 'administrator'],
      GENDER: ['female', 'male'],

      //暂时无用
      COLOR: ["danger", "default"],

      username: '#',
      password: '#',
      //0 用户
      //1 管理员
      permission: 0,
      email: '#',
      //0 female
      //1 male
      gender: 1,
      first_name: '#',
      last_name: '#'
    }
  },
  methods:
      {
        change_data(params)
        {
          this.is_reset = params
        }
      }
}
</script>

<style lang="less" scoped>
.el-form-item {
  margin-top: 5%;
}

.add_event {
  margin-top: 5%;
  margin-left: 10%;

  padding: 0;

  width: 600px;
  height: 700px;

  border-radius: 20px;

  text-align: center;

  .card-header {
    justify-content: space-between;
    align-items: center;

    color: #E6BA95;
    font-weight: bold;
    font-size: 40px;
  }
}
</style>