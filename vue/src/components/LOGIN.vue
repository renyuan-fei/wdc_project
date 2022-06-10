<template>
  <div id="container">

    <div class="top">
      <TOP_BAR></TOP_BAR>
    </div>

    <div class="center-div part2">

      <div id="login_box">
        <div v-bind:class="{'login_box':is_login,'register_box':!is_login}">
          <!--            -->

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

              <!--          -->
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
                  <button :disabled="!Vue3GoogleOauth.isInit || Vue3GoogleOauth.isAuthorized" class="google_button"
                          @click="handleClickSignIn">Google
                  </button>
                </div>
              </el-form-item>


            </el-form>
          </div>

          <!--            -->

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
import {inject, toRefs} from "vue";


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
  setup(props)
  {
    const {isSignIn} = toRefs(props);
    const Vue3GoogleOauth = inject("Vue3GoogleOauth");

    const handleClickLogin = () =>
    {
    };
    return {
      Vue3GoogleOauth,
      handleClickLogin,
      isSignIn,
    };
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
              //
              if (/^\w{1,64}@[a-z\d\\-]{1,256}(\.[a-z]{2,6}){1,2}$/i.test(value) === true)
              {
                console.log('login by email')
                that.is_username = false
                console.log(that.is_username)
                callback();
              } else
              {
                console.log('login by username')
                that.is_username = true
                console.log(that.is_username)
                callback();
              }
            }
          }],

        password: [{required: true, message: "please input your password", trigger: "blur"},
          {min: 3, max: 20, message: "invalid password", trigger: "blur"},
          {
            trigger: 'blur',
            validator: (rule, value, callback) =>
            {
              let testrule = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{3,20}/
              if (!testrule.test(value))
              {
                callback(new Error('wrong password format'))
              } else
              {
                callback()
              }
            }
          }]

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

                //
                if (response.data.status === 0)
                {
                  console.log('username is available')

                  callback()
                } else
                {
                  console.log('username is unavailable')

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
            //
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
            //
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
                  console.log('Email is available')

                  callback()
                } else
                {
                  console.log('Email is unavailable')

                  callback(new Error('the email has been registered'))
                }

              }).catch(function (error)
              {
                console.log(error.message)
              })
            }, trigger: 'blur'
          }]
      },

      //  / 
      is_username: true,

      //
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

      //
      this.$refs.login_form.validate((valid) =>
      {
        console.log(valid ? 'pass' : 'fail')

        if (!valid)
        {
          //，
          ElMessage({
            message: 'Incomplete username or password',
            type: 'warning',
          })
        } else
        {
          //
          if (that.is_username)
          {
            console.log('username and password', that.is_username)
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

              //
              if (response.data.permissions === 0)
              {

                //
                ElMessage({
                  message: 'login successful',
                  type: 'success',
                })

                //token
                // window.localStorage.setItem("token", response.data.token)

                console.log(response.data.token)

                //
                window.localStorage.setItem("username", that.login_data.username)

                console.log(that.login_data.username)

                //
                window.localStorage.setItem("permissions", response.data.permissions)

                console.log('common user')

                //
                return that.$router.push({path: '/user'})

                // console.log(that.$route)
              }
              //
              else if (response.data.permissions === 1)
              {
                //
                ElMessage({
                  message: 'login successful',
                  type: 'success',
                })

                //token
                // window.localStorage.setItem("token", response.data.token)
                //
                // console.log(response.data.token)

                //
                window.localStorage.setItem("username", that.login_data.username)

                console.log(that.login_data.username)

                //
                window.localStorage.setItem("permissions", response.data.permissions)

                console.log('admin')

                //
                return that.$router.push({path: '/user'})
              } else
              {
                console.log('login failed')
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
            console.log('email and password')

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

              //
              if (response.data.permissions === 0)
              {

                //
                ElMessage({
                  message: 'login successful',
                  type: 'success',
                })

                //token
                // window.localStorage.setItem("token", response.data.token)
                //
                // console.log(response.data.token)

                //
                window.localStorage.setItem("username", response.data.username)

                console.log(response.data.username)

                //
                window.localStorage.setItem("permissions", response.data.permissions)

                //
                return that.$router.push({path: '/user'})

                // console.log(that.$route)
              }
              //
              else if (response.data.permissions === 1)
              {
                //
                ElMessage({
                  message: 'login successful',
                  type: 'success',
                })

                //token
                // window.localStorage.setItem("token", response.data.token)

                console.log(response.data.token)

                //
                window.localStorage.setItem("username", response.data.username)

                console.log(response.data.username)

                //
                window.localStorage.setItem("permissions", response.data.permissions)

                console.log('')

                //
                return that.$router.push({path: '/user'})
              } else
              {
                console.log('login failed')

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
          //
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
              console.log('')

              //
              ElMessage({
                message: 'registration success',
                type: 'success',
              })

              //
              that.is_login = true

              //
              that.login_data.username = that.register_data.username

              //
              that.login_data.password = ''

              //
              that.register_data.username = ''
              that.register_data.password = ''
              that.register_data.confirm_password = ''
              that.register_data.first_name = ''
              that.register_data.last_name = ''
              that.register_data.email = ''
              that.register_data.gender = 1
            } else
            {
              console.log('')

              //
              ElMessage({
                message: 'registration failed, please try again later',
                type: 'warning',
              })
            }
          }).catch(function (error)
          {
            console.log(error.message)

            console.log('')
            //
          })
        }
      })
    },
    async handleClickSignIn()
    {
      try
      {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser)
        {
          return null;
        }
        console.log("googleUser", googleUser);
        this.user = googleUser.getBasicProfile().getEmail();
        console.log("getId", this.user);
        console.log("getBasicProfile", googleUser.getBasicProfile());
        console.log("getAuthResponse", googleUser.getAuthResponse());
        console.log(
            "getAuthResponse",
            this.$gAuth.instance.currentUser.get().getAuthResponse()
        );

      } catch (error)
      {
        //on fail do something
        console.error(error);
        return null;
      }
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

.google_button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin-left: 4px;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 6px 10px;
  font-size: 12px;
  border-radius: 4px;
  margin-right: 1em;
}

</style>
