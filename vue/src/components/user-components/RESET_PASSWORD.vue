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
                trigger: 'blur',
                validator: (rule, value, callback) =>
                {
                  let testrule = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{3,20}/
                  if (!testrule.test(value))
                  {
                    callback(new Error('Password must be a combination of numbers, letters and special characters, please enter 3-20 digits'))
                  } else
                  {
                    callback()
                  }
                }
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
            console.log(1111)
            //
            // /rest_password get

            that.axios({
              method: 'post',
              url: '/reset_password',
              data: {
                username: window.localStorage.getItem('username'),
                password: that.reset_data.new_password
              },
              headers: {
                'Content-Type': 'application/json'
              },
            }).then(function (response)
            {
              // console.log('222')
              if (response.data.status !== 0)
              {
                console.log(response)

                that.reset_data.new_password = ''
                that.reset_data.confirm_new_password = ''

                //
                ElMessage({
                  type: 'success',
                  message: 'reset password completed',
                })
              } else
              {
                ElMessage({
                  type: 'warning',
                  message: 'reset password failed',
                })
              }

            }).catch(function (error)
            {
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