<template>
  <div id="container">

    <div class="top">
      <TOP_BAR></TOP_BAR>
    </div>

    <div class="center-div part2">

      <div id="login_box">
        <div v-bind:class="{'login_box':is_login,'register_box':!is_login}">
          <!--            登录页面-->

          <div v-show="is_login" class="login_box">
            <img alt="tree" src="../assets/像素_玫瑰花.png"><br>
            <el-form ref="login_form" :model="login_data" :rules="login_rule">

              <el-form-item prop="username">
                <el-input v-model="login_data.username" placeholder="username or email"
                          style="margin-top:15px"></el-input>
              </el-form-item>

              <el-form-item prop="password">
                <el-input v-model="login_data.password" placeholder="password" show-password
                          style="margin-top:15px"></el-input>
              </el-form-item>

              <!--          第三方登录按钮-->
              <el-form-item class="circle_button_box">
              </el-form-item>

              <el-form-item>
                <div>
                  No account?
                  <el-button type="text" @click="is_login = false">Signup</el-button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <el-button class="login_button" type="primary" @click="login_account">login</el-button>
                </div>
              </el-form-item>

              <el-divider> OR</el-divider>

              <el-form-item style="position:absolute; left:50%; transform:translate(-50%,0)">
                <div>
                  login with &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <el-dropdown style="margin-top:8px;">
                    <span>
                      <el-icon><Expand/></el-icon>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item @click="Facebook">Facebook</el-dropdown-item>
                        <el-dropdown-item @click="Twitter">Twitter</el-dropdown-item>
                        <el-dropdown-item @click="Google">Google</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </el-form-item>


            </el-form>
          </div>

          <!--            注册页面-->

          <div v-show="!is_login" class="register_box">
            <img alt="tree" src="../assets/像素_玫瑰花.png"><br>
            <el-form ref="register_from" :model="register_data" :rules="register_rule">
              <el-form-item prop="first_name">
                <el-input v-model="register_data.first_name" placeholder="firstname" style="margin-top:15px"></el-input>
              </el-form-item>

              <el-form-item prop="last_name">
                <el-input v-model="register_data.last_name" placeholder="lastname" style="margin-top:15px"></el-input>
              </el-form-item>

              <el-form-item prop="username">
                <el-input v-model="register_data.username" placeholder="username" style="margin-top:15px"></el-input>
              </el-form-item>

              <el-form-item prop="email">
                <el-input v-model="register_data.email" placeholder="Email" style="margin-top:15px"></el-input>
              </el-form-item>

              <el-form-item prop="password">
                <el-input v-model="register_data.password" placeholder="password" style="margin-top:15px"></el-input>
              </el-form-item>

              <el-form-item prop="confirm_password">
                <el-input v-model="register_data.confirm_password" placeholder="confirm your password" show-password
                          style="margin-top:15px"></el-input>
              </el-form-item>

              <el-form-item>
                <div style="margin:15px 0; width:300px">
                  <el-radio-group v-model="register_data.gender">
                    <el-radio :label="1" border>Male</el-radio>
                    <el-radio :label="0" border>Female</el-radio>
                  </el-radio-group>
                </div>
              </el-form-item>

              <hr style="margin-bottom:30px;">

              <el-form-item>
                <el-button type="text" @click="is_login = true">back</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;<el-button type="primary" @click="register_account">create your account</el-button>
              </el-form-item>
            </el-form>
          </div>


        </div>
      </div>

    </div>
  </div>

</template>

<script>
import TOP_BAR from './TOP_BAR'
import {ElMessage} from "element-plus";
import {Search, StarFilled} from "@element-plus/icons-vue";

export default {
  name: "LOGIN",
  components:
      {
        TOP_BAR,
        // eslint-disable-next-line vue/no-unused-components
        StarFilled,
        // eslint-disable-next-line vue/no-unused-components
        Search
      },
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

        gender: 1,
      },
      login_rule: {

        username: [{required: true, message: "please input your username or email", trigger: "blur"},
          {min: 3, max: 20, message: "Username is invalid", trigger: "blur"},
          {
            validator: function (rule, value, callback)
            {
              //判断是否是用户名登录
              if (/^\w{1,64}@[a-z\d\\-]{1,256}(\.[a-z]{2,6}){1,2}$/i.test(value) === true)
              {
                console.log('邮箱登录')
                that.is_username = false
                console.log(that.is_username)
                callback();
              } else
              {
                console.log('用户名登录')
                that.is_username = true
                console.log(that.is_username)
                callback();
              }
            }
          }],

        password: [{required: true, message: "please input your password", trigger: "blur"},
          {min: 3, max: 20, message: "invalid password", trigger: "blur"}]

      },
      register_rule: {
        first_name: [{required: true, message: "please input your first_name", trigger: "blur"},
          {min: 1, max: 20, message: "firstname is invalid", trigger: "blur"}],

        last_name: [{required: true, message: "please input your last_name", trigger: "blur"},
          {min: 1, max: 20, message: "lastname is invalid", trigger: "blur"}],

        username: [{required: true, message: "please input your username", trigger: "blur"},
          {min: 3, max: 20, message: "Username is invalid", trigger: "blur"},
          {
            validator: function (rule, value, callback)
            {
              that.axios({
                method: 'get',
                url: '/verify_username',
                params:
                    {
                      username: value,
                    }
              }).then(function (response)
              {
                console.log(response)

                //判断是否可用
                if (response.data.status === 0)
                {
                  console.log('该用户名可用')

                  callback()
                } else
                {
                  console.log('该用名不可用')

                  callback(new Error('the username has been registered'))
                }

              }).catch(function (error)
              {
                console.log(error.message)
              })
            }, trigger: 'blur'
          }],

        // render: [{required: true, message: "please choose your render", trigger: "change"}],

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
              if (/^\w{1,64}@[a-z\d\\-]{1,256}(\.[a-z]{2,6}){1,2}$/i.test(value) === false)
              {
                callback(new Error("Email format error"));
              } else
              {
                callback();
              }
            },
            trigger: "blur"
          },
          {
            //判断是否可用
            validator: function (rule, value, callback)
            {
              that.axios({
                method: 'get',
                url: '/verify_email',
                params:
                    {
                      email: value,
                    }
              }).then(function (response)
              {
                console.log(response)

                if (response.data.status === 0)
                {
                  console.log('该邮箱可用')

                  callback()
                } else
                {
                  console.log('该邮箱不可用')

                  callback(new Error('the email has been registered'))
                }

              }).catch(function (error)
              {
                console.log(error.message)
              })
            }, trigger: 'blur'
          }]
      },

      //判断 邮箱登录 / 用户名登录
      is_username: true,

      //切换登录和注册页面
      is_login: true,
    }

  },
  methods: {
    Facebook()
    {
      console.log('Facebook')
    },
    Twitter()
    {
      console.log('Twitter')
    },
    Google()
    {
      console.log('Google')
    },


    login_account()
    {
      let that = this;

      //表单预验证
      this.$refs.login_form.validate((valid) =>
      {
        console.log(valid ? 'pass' : 'fail')

        if (!valid)
        {
          //账号或密码没有填写，或填写格式错误
          ElMessage({
            message: 'Incomplete username or password',
            type: 'warning',
          })
        } else
        {
          //当使用用户名登录时
          if (that.is_username)
          {
            console.log('用户名 and 密码', that.is_username)
            that.axios({
              method: 'get',
              url: '/login',
              params:
                  {
                    username: this.login_data.username,
                    password: this.login_data.password
                  }
            }).then(function (response)
            {
              console.log(response)

              //普通用户登录
              if (response.data.permissions === 0)
              {

                //登录成功提示
                ElMessage({
                  message: 'login successful',
                  type: 'success',
                })

                //存放token
                window.localStorage.setItem("token", response.data.token)

                console.log(response.data.token)

                //存放登录的用户名
                window.localStorage.setItem("username", that.login_data.username)

                console.log(that.login_data.username)

                //存放登录的用户权限信息
                window.localStorage.setItem("permissions", response.data.permissions)

                console.log('普通用户')

                //用户页面跳转
                return that.$router.push({path: '/user'})

                // console.log(that.$route)
              }
              //管理员登录
              else if (response.data.permissions === 1)
              {
                //登录成功提示
                ElMessage({
                  message: 'login successful',
                  type: 'success',
                })

                //存放token
                window.localStorage.setItem("token", response.data.token)

                console.log(response.data.token)

                //存放登录的用户名
                window.localStorage.setItem("username", that.login_data.username)

                console.log(that.login_data.username)

                //存放登录的用户权限信息
                window.localStorage.setItem("permissions", response.data.permissions)

                console.log('管理员')

                //管理员后台跳转
                return that.$router.push({path: '/user'})
              } else
              {
                //发送提示，用户名或密码错误
                //登录失败提示
                ElMessage({
                  message: 'Incorrect username or password',
                  type: 'error',
                })
              }

            }).catch(function (error)
            {
              console.log(error.message)
            })
          } else
          {
            console.log('邮箱 and 密码')

            that.axios({
              method: 'get',
              url: '/login_email',
              params:
                  {
                    email: this.login_data.username,
                    password: this.login_data.password
                  }
            }).then(function (response)
            {
              console.log(response)

              //普通用户登录
              if (response.data.permissions === 0)
              {

                //登录成功提示
                ElMessage({
                  message: 'login successful',
                  type: 'success',
                })

                //存放token
                window.localStorage.setItem("token", response.data.token)

                console.log(response.data.token)

                //存放登录的用户名
                window.localStorage.setItem("username", response.data.username)

                console.log(response.data.username)

                //存放登录的用户权限信息
                window.localStorage.setItem("permissions", response.data.permissions)

                console.log('普通用户')

                //用户页面跳转
                return that.$router.push({path: '/user'})

                // console.log(that.$route)
              }
              //管理员登录
              else if (response.data.permissions === 1)
              {
                //登录成功提示
                ElMessage({
                  message: 'login successful',
                  type: 'success',
                })

                //存放token
                window.localStorage.setItem("token", response.data.token)

                console.log(response.data.token)

                //存放登录的用户名
                window.localStorage.setItem("username", response.data.username)

                console.log(response.data.username)

                //存放登录的用户权限信息
                window.localStorage.setItem("permissions", response.data.permissions)

                console.log('管理员')

                //管理员后台跳转
                return that.$router.push({path: '/user'})
              } else
              {
                //发送提示，用户名或密码错误
                //登录失败提示
                ElMessage({
                  message: 'Incorrect username or password',
                  type: 'error',
                })
              }

            }).catch(function (error)
            {
              console.log(error.message)
            })
          }
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
          //有信息未填写或填写错误
          ElMessage({
            message: 'Information is missing or incorrect',
            type: 'warning',
          })
        } else
        {
          console.log(11)
          that.axios({
            method: 'post',
            url: '/register',
            headers: {
              'Content-Type': 'application/json'
            },
            data:
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
            if (response.data.status === 1)
            {
              console.log('注册成功')

              //注册成功提示
              ElMessage({
                message: 'registration success',
                type: 'success',
              })

              //跳转到登录页面
              that.is_login = true

              //自动填充账号
              that.login_data.username = that.register_data.username

              //原有密码清空
              that.login_data.password = ''

              //清空注册列表
              that.register_data.username = ''
              that.register_data.password = ''
              that.register_data.confirm_password = ''
              that.register_data.first_name = ''
              that.register_data.last_name = ''
              that.register_data.email = ''
              that.register_data.gender = 1
            } else
            {
              console.log('注册失败')

              //重新加载页面
              ElMessage({
                message: 'registration failed, please try again later',
                type: 'warning',
              })
            }
          }).catch(function (error)
          {
            console.log(error.message)

            console.log('注册失败')
            //重新加载页面
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


  img {
    width: 100px;
  }

  el-check-tag {
    width: 100px;
    height: 300px;
  }
}

.login_box {
  background-color: #ffffff;
  padding: 30px;

  width: 300px;
  height: 370px;

  //background-color:antiquewhite;

  border-radius: 20px;

  position: absolute;

  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
}

.register_box {
  background-color: #ffffff;
  padding: 40px;

  width: 300px;
  height: 660px;
  //background-color:antiquewhite;
  border-radius: 20px;

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


#container {
  position: relative;

  background-color: #B4E197;
  background-image: url('../assets/cross.png');

  height: 100%;
  min-height: 1287px;

  width: 100%;
  min-width: 1250px;
}

.center-div {
  margin: 0 auto;
}

.circle_button_box {
  text-align: center;
}

.circle_button {
  margin-left: 17%;
}

</style>
