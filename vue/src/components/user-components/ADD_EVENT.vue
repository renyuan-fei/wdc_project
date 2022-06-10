<template>
  <el-card id="add_event">

    <template #header>
      <el-page-header content="NEW EVENT" @click="back"/>
      <!--      <div class="card-header">-->
      <!--        NEW EVENT-->
      <!--      </div>-->
    </template>

    <el-form ref="form" :model="form_data" :rules="form_rules" label-width="120px"
             style="padding-left:10px; padding-right:60px;">

      <el-form-item label="Title" prop="title">
        <el-input v-model="form_data.title" placeholder="Please input"/>
      </el-form-item>

      <el-form-item label="Address" prop="address">
        <el-input v-model="form_data.address" placeholder="Please input"/>
      </el-form-item>

      <el-form-item label="Begin" prop="begin_time">
        <el-date-picker
            v-model="form_data.begin_time"
            placeholder="Select date and time"
            type="datetime"
            value-format="YYYY-MM-DD-HH:mm"
        />
      </el-form-item>

      <el-form-item label="End" prop="end_time">
        <el-date-picker
            v-model="form_data.end_time"
            placeholder="Select date and time"
            type="datetime"
            value-format="YYYY-MM-DD-HH:mm"
        />
      </el-form-item>


      <el-form-item label="Notice">
        <el-switch v-model="form_data.notice"/>
      </el-form-item>

      <el-form-item label="Calendar state">
        <el-radio-group v-model="form_data.state">
          <el-radio :label="0">work &nbsp;<el-icon>
            <school/>
          </el-icon>
          </el-radio>
          <el-radio :label="1">rest &nbsp;<el-icon>
            <coffee-cup/>
          </el-icon>
          </el-radio>
          <el-radio :label="2">other &nbsp;<el-icon>
            <more/>
          </el-icon>
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Note">
        <el-input v-model="form_data.note" :rows="5" placeholder="note..." resize="none" type="textarea"/>
      </el-form-item>

    </el-form>

    <div style="margin-top:6%">
      <el-button @click="submit">
        <el-icon>
          <upload-filled/>
        </el-icon>
        submit
      </el-button>
    </div>

  </el-card>
</template>

<script>
import {CoffeeCup, Food, More, School, UploadFilled} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {format} from 'date-fns';

export default {
  name: "ADD_EVENT",
  components:
      {
        // eslint-disable-next-line vue/no-unused-components
        Food,
        UploadFilled,
        School,
        CoffeeCup,
        More
      },
  props:
      {
        back_value: Boolean
      },
  mounted()
  {
    let permissions = window.localStorage.getItem('permissions')

    if (permissions === '1')
    {
      this.is_user = false
    }
  },
  data()
  {
    let that = this;

    return {

      form_data:
          {
            permissions: window.localStorage.getItem('permissions'),
            username: window.localStorage.getItem('username'),

            title: '',
            address: '',
            notice: true,
            // begin_date: '',
            begin_time: '',
            // end_date: '',
            end_time: '',
            // repeat: false,
            state: 1,
            note: '',
          },
      form_rules:
          {
            title: [{required: true, message: "please enter title", trigger: "blur"},
              {min: 0, max: 20, message: "title is invalid", trigger: "blur"}],

            address: [{required: true, message: "please enter address", trigger: "blur"}],

            //begin //
            begin_time: [{required: true, message: "Please select a start time", trigger: "blur"},
              {
                validator: function (rule, value, callback)
                {
                  console.log(value)

                  let date = new Date();
                  date = format(date, "yyyy-MM-dd-hh:mm")
                  console.log(date)

                  if (value < date)
                  {
                    callback(new Error('the time is invalid'));
                  } else
                  {
                    callback();
                  }
                },
                trigger: "blur"
              }],

            //end，endbegin //
            end_time: [{required: true, message: "Please choose a end time", trigger: "blur"},
              {
                validator: function (rule, value, callback)
                {
                  let date = new Date();

                  date = format(date, "yyyy-MM-dd-hh:mm")

                  if (value < date || value < that.form_data.begin_time)
                  {
                    callback(new Error('the time is invalid'));
                  } else
                  {
                    that.axios({
                      method: 'get',
                      url: '/check_time',
                      params: {
                        username: window.localStorage.getItem('username'),
                        begin_time: that.form_data.begin_time,
                        end_time: value,
                        // token: window.sessionStorage.getItem('token')
                      }
                    }).then(function (response)
                    {
                      console.log(response.data)
                      if (response.data.status !== 0)
                      {
                        callback();
                      } else
                      {
                        callback(new Error('Time Conflict'));
                      }

                    }).catch(function (error)
                    {
                      console.log('/check')
                      console.log(error.message)
                    })
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

          this.$refs.form.validate((valid) =>
          {
            if (!valid)
            {
              //
              ElMessage({
                message: 'Please fill in all information',
                type: 'warning',
              })
            } else
            {
              console.log('Form validation succeeded')

              // 
              // /add_event post
              that.axios({
                method: 'post',
                url: '/add_event',
                data: that.form_data,
                headers: {
                  'Content-Type': 'application/json'
                },
              }).then(function (response)
              {
                if (response.data.status !== 0)
                {
                  //
                  that.$refs.form.resetFields()
                  that.form_data.note = ''

                  console.log('request successful')
                  console.log(response)

                  ElMessage({
                    message: 'Submitted successfully',
                    type: 'success',
                  })

                  that.$emit("changedata", false)

                } else
                {
                  ElMessage({
                    message: 'Submitted failed',
                    type: 'warning',
                  })
                }
              }).catch(function (error)
              {
                console.log('request failed')
                console.log(error.message)
              })
            }
          })
        }
      }
}
</script>

<style lang="less" scoped>
.el-form-item {
  margin-top: 5%;
}

#add_event {
  margin-top: 5%;
  margin-left: 5%;

  padding: 0;

  width: 600px;
  height: 650px;

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