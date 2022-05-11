<template>
  <el-card class="login_size">
    <template #header>
      <el-page-header content="RESET PASSWORD" @click="back"/>
    </template>

    <el-form ref="reset_form" :model="reset_data" :rules="reset_rule">

      <el-form-item prop="new_password">
        <el-input v-model="reset_data.new_password" placeholder="new password" style="margin-top:30px"></el-input>
      </el-form-item>

      <el-form-item prop="confirm_new_password">
        <el-input v-model="reset_data.confirm_new_password" placeholder="confirm your password" show-password
                  style="margin-top:30px"></el-input>
      </el-form-item>

    </el-form>

    <el-divider style="margin-top:60px; margin-bottom:60px;"/>

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
          ElMessageBox.confirm(
              'proxy will permanently delete the file. Continue?',
              'Warning',
              {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning',
              }
          )

          //向后端发送请求
          // /rest_password get


          //返回修成功则打印提示
          ElMessage({
            type: 'success',
            message: 'Delete completed',
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

</style>