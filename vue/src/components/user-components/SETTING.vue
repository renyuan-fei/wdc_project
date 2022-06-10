<template>
  <span id="setting">
    <el-card v-show="!is_reset" class="add_event">

    <template #header>
      ACCOUNT DETAIL
    </template>

      <div class="container">
        <table class="table-ui">
          <thead></thead>
          <tbody>
          <tr>
            <td class="title">Username</td>
            <td class="information">{{ username }}</td>
          </tr>
          <tr>
            <td class="title">Email</td>
            <td class="information">{{ email }}</td>
          </tr>
          <tr>
            <td class="title">permission</td>
            <td class="information">{{ PERMISSIONS[this.permissions] }}</td>
          </tr>
          <tr>
            <td class="title">Gender</td>
            <td class="information"><el-tag size="small">{{ GENDER[this.gender] }}</el-tag></td>
          </tr>
          <tr>
            <td class="title">First_name</td>
            <td class="information">{{ first_name }}</td>
          </tr>
          <tr>
            <td class="title">Last_name</td>
            <td class="information">{{ last_name }}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <!--          <el-descriptions-->
      <!--              :column="1"-->
      <!--              border-->
      <!--              direction="horizontal"-->
      <!--              style="margin-top:60px; margin-bottom:80px;"-->
      <!--          >-->
      <!--            <el-descriptions-item align="center" label="Username">{{ username }}</el-descriptions-item>-->
      <!--            <el-descriptions-item align="center" label="Password">{{ password }}</el-descriptions-item>-->
      <!--            <el-descriptions-item align="center" label="Email">{{ email }}</el-descriptions-item>-->
      <!--            <el-descriptions-item :span="2" align="center"-->
      <!--                                  label="permission">{{ PERMISSION[this.permission] }}</el-descriptions-item>-->
      <!--            <el-descriptions-item align="center" label="Gender">-->
      <!--              :type="COLOR[this.gender]"-->
      <!--              <el-tag size="small">{{ GENDER[this.gender] }}</el-tag>-->
      <!--            </el-descriptions-item>-->
      <!--            <el-descriptions-item align="center" label="First_name">{{ first_name }}</el-descriptions-item>-->
      <!--            <el-descriptions-item align="center" label="Last_name">{{ last_name }}</el-descriptions-item>-->
      <!--          </el-descriptions>-->

    <el-divider style="margin-bottom:80px;"/>

    <el-button round type="danger" @click="this.is_reset = true">RESET PASSWORD</el-button>
    </el-card>

    <RESET_PASSWORD v-show="is_reset" :data="is_reset" @changedata="change_data"></RESET_PASSWORD>

  </span>
</template>

<script>
import {Female, Male} from "@element-plus/icons-vue";
import RESET_PASSWORD from "@/components/user-components/RESET_PASSWORD";
// eslint-disable-next-line no-unused-vars

export default {
  name: "ADD_EVENT",
  mounted()
  {
    let that = this

    //
    console.log('SETTING')

    that.axios({
      method: 'get',
      url: '/get_infor',
      params: {
        username: window.localStorage.getItem('username'),
        // token: window.localStorage.getItem('token')
      }
    }).then(function (response)
    {
      console.log('request successful')
      console.log(response)
      that.username = window.localStorage.getItem('username')

      //0 
      //1 
      that.permissions = response.data.permissions
      that.email = response.data.email
      //0 female
      //1 male
      that.gender = response.data.gender
      that.first_name = response.data.first_name
      that.last_name = response.data.last_name

    }).catch(function (error)
    {
      console.log('request failed')
      console.log(error.message)
    })
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

      PERMISSIONS: ['user', 'administrator'],
      GENDER: ['female', 'male'],

      //
      COLOR: ["danger", "default"],

      username: '#',
      password: '#',
      //0 
      //1 
      permissions: 0,
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

.container {
  margin-top: 20px;
  background: #fff;
  padding: 50px 5px 50px;
}

.table-ui {
  width: 100%;
  border-collapse: collapse;
}

.table-ui tr td {
  font-size: 14px;
  color: #606266;
}

.title {
  background: #f5f7fa;
  padding: 8px 11px;
  width: 60%;
  height: 39px;
  font-weight: bold;
}

.information {
  width: 40%;
  padding: 8px 11px;
  height: 39px;
}

.table-ui tbody tr td {
  border-left: 0.1px solid #ebeef5;
  border-right: 0.1px solid #ebeef5;
  border-bottom: 0.1px solid #ebeef5;
  border-top: 0.1px solid #ebeef5;

  box-sizing: border-box;
}

</style>