<template>
  <div id="login_box">
    <TOP_BAR></TOP_BAR>
    <div v-bind:class="{'login_box':is_login,'register_box':!is_login}">
      <el-container>
        <el-header></el-header>
        <!--            登录页面-->
        <el-main v-show="is_login">
          <el-card class="login_size">
            <img src="../assets/tree.png" alt="tree"><br>
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
            <img src="../assets/tree.png" alt="tree"><br>
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

              <el-form-item>
                <div style="margin:15px 0; width:300px">
                  <el-radio-group v-model="register_data.gender">
                    <el-radio :label="1" border>Male</el-radio>
                    <el-radio :label="2" border>Female</el-radio>
                  </el-radio-group>
                </div>
              </el-form-item>

              <!--              <el-divider style="margin-bottom:30px;">-->
              <!--                <el-icon><star-filled/></el-icon>-->
              <!--              </el-divider>-->

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
import TOP_BAR from './TOP_BAR'
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

export default {
  name: "LOGIN",
  components:
      {
        TOP_BAR
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
          {min: 3, max: 20, message: "Username is invalid", trigger: "blur"},
          {
            validator: function (rule, value, callback)
            {
              that.axios({
                methods: 'get',
                url: 'http://localhost:3000/verify',
                params:
                    {
                      username: value,
                    }
              }).then(function (response)
              {
                console.log(response)

                if (response.data === 1)
                {
                  console.log('该用户名可用')

                  that.is_usable = true

                  callback()
                } else
                {
                  console.log('该用名不可用')

                  //设置为不可用
                  that.is_usable = false

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
      setup()
      {
        const router = useRouter();

        function goto(path)
        {
          router.push({
            path:path,
            params:
                {
                  data:this.login_data
                }
          });
        }

        return {
          goto  //一定要要放在return里才能在模板上面使用
        }
      },

      //判断用户名是否可用
      is_usable: false,

      //切换登录和注册页面
      is_login: true,
    }

  },
  methods: {


    login_account()
    {
      let that = this;

      //表单预验证
      this.$refs.login_from.validate((valid) =>
      {
        console.log(valid)

        if (!valid)
        {
          //账号或密码没有填写，或填写格式错误
          ElMessage({
            message: 'Incomplete username or password',
            type: 'warning',
          })
        } else
        {
          that.axios({
            methods: 'get',
            url: 'http://localhost:3000/login',
            params: this.login_data
          }).then(function (response)
          {
            console.log(response)

            if (response.data.result === "1")
            {

              //登录成功提示
              ElMessage({
                message: 'login successful',
                type: 'success',
              })

              //存放token
              window.sessionStorage.setItem("token",response.data.token)

              console.log(response.data.token)

              //用户页面跳转
              return that.$router.push('/user')

              // console.log(that.$route)
            } else if (response.data.result === "2")
            {
              //登录成功提示
              ElMessage({
                message: 'login successful',
                type: 'success',
              })

              //管理员后台跳转
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
              that.register_data.gender = ''
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
  background-color: #B4E197;
  height: 1297px;

  background-image: url('../assets/cross.png');

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

.register_box {
  width: 450px;
  height: 850px;
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
