<template>
  <div id="login_box">
    <div class="login_box">
      <el-container>
        <el-header></el-header>
        <!--            登录页面-->
        <el-main v-show="is_login">
          <el-card class="login_size">
            <img src="../assets/tree.png"><br>
            <el-form :model="login_data" :rules="login_rule" ref="login_from">

              <el-form-item prop="username">
                <el-input style="margin-top:15px" v-model="login_data.username" placeholder="username"></el-input>
              </el-form-item>

              <el-form-item prop="password">
                <el-input style="margin:15px 0" v-model="login_data.password" show-password
                          placeholder="password"></el-input>
              </el-form-item>

              <hr style="margin-bottom:30px;">

              <el-form-item>
                <div>
                  No account?
                  <el-button type="text" @click="is_login = false">Signup</el-button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <el-button type="primary" class="login_button" @click="login_account">login</el-button>
                </div>
              </el-form-item>

            </el-form>
          </el-card>
        </el-main>
        <!--            注册页面-->
        <el-main v-show="!is_login">
          <el-card class="register_size">
            <img src="../assets/tree.png"><br>
            <el-form :model="register_data" :rules="register_rule" ref="register_from">
              <el-form-item prop="first_name">
                <el-input style="margin-top:15px" v-model="register_data.first_name" placeholder="firstname"></el-input>
              </el-form-item>

              <el-form-item prop="last_name">
                <el-input style="margin-top:15px" v-model="register_data.last_name" placeholder="lastname"></el-input>
              </el-form-item>

              <el-form-item prop="username">
                <el-input style="margin-top:15px" v-model="register_data.username" placeholder="username"></el-input>
              </el-form-item>

              <el-form-item prop="email">
                <el-input style="margin-top:15px" v-model="register_data.email" placeholder="Email"></el-input>
              </el-form-item>

              <el-form-item prop="password">
                <el-input style="margin-top:15px" v-model="register_data.password" placeholder="password"></el-input>
              </el-form-item>

              <el-form-item prop="confirm_password">
                <el-input style="margin-top:15px" v-model="register_data.confirm_password" show-password
                          placeholder="confirm your password"></el-input>
              </el-form-item>

              <el-form-item prop="render">
                <div style="margin:15px 0; width:300px">
                  <el-radio v-model="register_data.render" label="1" border>Man</el-radio>
                  <el-radio v-model="register_data.render" label="2" border>Woman</el-radio>
                </div>
              </el-form-item>

              <hr style="margin-bottom:30px;">

              <el-form-item>
                <el-button type="text" @click="is_login = true">back</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;<el-button type="primary" @click="register_account">create your account</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-main>
        <el-footer>
        </el-footer>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "LOGIN",
  data()
  {
    let that = this;

    return {
      login_data: {
        username: '',
        password: '',
      },
      register_data: {
        first_name: '',
        last_name: '',

        username: '',
        password: '',
        confirm_password: '',

        email: '',

        gender: '',
      },
      login_rule: {

        username: [{required: true, message: "please input your username", trigger: "blur"},
          {min: 3, max: 20, message: "Username is invalid", trigger: "blur"}],

        password: [{required: true, message: "please input your password", trigger: "blur"},
          {min: 3, max: 20, message: "invalid password", trigger: "blur"}]

      },
      register_rule: {
        first_name: [{required: true, message: "please input your first_name", trigger: "blur"},
          {min: 1, max: 20, message: "firstname is invalid", trigger: "blur"}],

        last_name: [{required: true, message: "please input your last_name", trigger: "blur"},
          {min: 1, max: 20, message: "lastname is invalid", trigger: "blur"}],

        username: [{required: true, message: "please input your username", trigger: "blur"},
          {min: 3, max: 20, message: "Username is invalid", trigger: "blur"}],

        render: [{required: true, message: "please choose your render", trigger: "blur"}],

        password: [{required: true, message: "please input your password", trigger: "blur"},
          {min: 3, max: 20, message: "invalid password", trigger: "blur"}],

        confirm_password: [{required: true, message: "please input your password again", trigger: "blur"},
          {
            validator: function (rule, value, callback)
            {
              console.log(that.login_data)
              console.log(that.register_data.password)
              if (value === '')
              {
                callback(new Error('Please enter the password again'))
              } else if (value !== that.register_data.password)
              {
                callback(new Error('The two entered passwords do not match'))
              } else
              {
                callback();
              }
            }
          }],

        email: [{required: true, message: "please input your email", trigger: "blur"},
          {
            //邮箱验证
            validator: function (rule, value, callback)
            {
              if (/^\w{1,64}@[a-z0-9\\-]{1,256}(\.[a-z]{2,6}){1,2}$/i.test(value) === false)
              {
                callback(new Error("Email format error"));
              } else
              {
                callback();
              }
            },
            trigger: "blur"
          }]
      },

      is_login: true,
    }

  },
  methods: {
    login_account()
    {
      //表单预验证
      this.$refs.login_from.validate((valid) =>
      {
        console.log(valid)

        if (!valid)
        {
          return;
        } else
        {
          this.axios({
            methods: 'get',
            url: 'http://localhost:3000/login',
            params: this.login_data
          }).then(function (response)
          {
            console.log(response.data)

            //跳转到内容页面
          }).catch(function (error)
          {
            console.log(error.message)

            //发送提示，用户名或密码错误
          })
        }
      })
    },
    register_account()
    {
      let that = this
      this.$refs.register_from.validate((valid) =>
      {
        console.log(valid)

        if (!valid)
        {
          return;
        } else
        {
          console.log(that.register_data)
          console.log(that.register_data.username)

          this.axios({
            methods: 'get',
            url: 'http://localhost:3000/verify',
            params:
                {
                  username: that.register_data.username,
                }
          }).then(function (response)
          {
            console.log(response)

            if (response.data !== -1)
            {
              that.axios({
                methods: 'get',
                url: 'http://localhost:3000/register',
                params:
                    {
                      first_name: that.register_data.first_name,
                      last_name: that.register_data.last_name,

                      username: that.register_data.username,
                      password: that.register_data.password,

                      email: that.register_data.email,

                      gender: that.register_data.gender,
                    }
              }).then(function (response)
              {
                if (response.data === 1)
                {
                  console.log('注册成功')

                  //跳转到登录页面
                  that.is_login = true

                  //自动填充账号
                  that.login_data.username = that.register_data.username
                } else
                {
                  console.log('注册失败')

                  //重新加载页面
                }
              }).catch(function (error)
              {
                console.log(error.message)

                console.log('注册失败')
                //重新加载页面
              })
            } else
            {
              console.log('该用名不可用')
            }

          }).catch(function (error)
          {
            console.log(error.message)
          })
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>

#login_box {
  text-align: center;
  background-color: darkseagreen;
  height: 1287px;


  img {
    width: 100px;
  }

  el-check-tag {
    width: 100px;
    height: 300px;
  }
}

.login_box {
  width: 450px;
  height: 600px;
  //background-color:antiquewhite;
  border-radius: 5px;

  position: absolute;

  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
}

.login_size {
  height: 400px;
  width: 350px;

  border-radius: 20px;
}

.register_size {
  height: 700px;
  width: 350px;

  border-radius: 20px;
}

.login_button {
  width: 80px;
  height: 35px
}

</style>
