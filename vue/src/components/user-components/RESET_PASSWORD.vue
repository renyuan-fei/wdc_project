<template>
  <el-card class="login_size">
    <template #header>
      <el-page-header content="RESET PASSWORD" @click="back"/>
    </template>

    <el-form ref="reset_form" :model="reset_data" :rules="reset_rule">

      <el-form-item>
        <img src="../../assets/像素_西瓜.png" alt="img" class="image">
      </el-form-item>

      <el-form-item prop="new_password">
        <el-input v-model="reset_data.new_password" placeholder="new password" style="margin-top:80px;"></el-input>
      </el-form-item>

      <el-form-item prop="confirm_new_password">
        <el-input v-model="reset_data.confirm_new_password" placeholder="confirm your password" show-password
                  style="margin-top:20px;"></el-input>
      </el-form-item>

    </el-form>

    <el-divider style="margin-top:40px; margin-bottom:40px;"/>

    <el-row>
      <el-col :span=9></el-col>
      <el-col :span=10>
        <el-button text type="danger" @click="submit">RESET</el-button>
      </el-col>
      <el-col :span=5></el-col>
    </el-row>

  </el-card>
</template>

<script>
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "RESET_PASSWORD",
  props:
      {
        data: Boolean,
      },
  data()
  {
    let that = this;

    return {
      reset_data:
          {
            old_password: '123',
            new_password: '',
            confirm_new_password: '',
          },
      reset_rule:
          {

            new_password: [{required: true, message: "please input your new password", trigger: "blur"},
              {min: 3, max: 20, message: "invalid password", trigger: "blur"},
              {
                validator: function (rule, value, callback)
                {
                  if (value === that.reset_data.old_password)
                  {
                    callback(new Error('The same password cannot be reset'))
                  } else
                  {
                    callback();
                  }
                },
                trigger: "blur"
              }],

            confirm_new_password: [{required: true, message: "please input your new password again", trigger: "blur"},
              {
                validator: function (rule, value, callback)
                {
                  if (value !== that.reset_data.new_password)
                  {
                    callback(new Error('The two entered passwords do not match'))
                  } else
                  {
                    callback();
                  }
                },
                trigger: "blur"
              }],
          },
    }
  },
  methods:
      {
        back()
        {
          this.$emit("changedata", false)
        },
        submit()
        {
          let that = this;

          ElMessageBox.confirm(
              'Are you sure you want to change your password?',
              'Warning',
              {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning',
              }
          ).then(function ()
          {
            //向后端发送请求
            // /rest_password get

            that.axios({
              method: 'put',
              url: '/reset_password',
              params: {
                username: window.sessionStorage.getItem('username'),
                oldpassword: this.old_password,
                newpassword: this.new_password,
                token: window.sessionStorage.getItem('token')
              }
            }).then(function (response)
            {
              console.log('请求成功')
              console.log(response)

              //返回修成功则打印提示
              ElMessage({
                type: 'success',
                message: 'reset completed',
              })
            }).catch(function (error)
            {
              console.log('请求失败')
              console.log(error.message)
            })
          }).catch(function ()
          {
            ElMessage({
              type: 'info',
              message: 'reset canceled',
            })
          })

        }
      }
}
</script>

<style lang="less" scoped>

.login_size {
  height: 450px;
  width: 400px;

  margin-top: 20%;
  margin-left: 20%;

  border-radius: 20px;
}

.image
{
  position: absolute;

  height:60px;
  width:60px;

  transform: translate(-50%, 0%);

  left: 50%;
  top: 100%;
}

</style>