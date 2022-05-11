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
        />
      </el-form-item>

      <el-form-item label="End" prop="end_time">
        <el-date-picker
            v-model="form_data.end_time"
            placeholder="Select date and time"
            type="datetime"
        />
      </el-form-item>



      <el-form-item label="Repeat">
        <el-switch v-model="form_data.repeat"/>
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
        <el-input v-model="form_data.Note" :rows="5" placeholder="note..." resize="none" type="textarea"/>
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
import {Food, UploadFilled, School, CoffeeCup, More} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

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
  data()
  {
    let that = this;

    return {

      form_data:
          {
            title: '',
            address: '',
            All_day: false,
            // begin_date: '',
            begin_time: '',
            // end_date: '',
            end_time: '',
            repeat: false,
            state: 1,
            Note: '',
          },
      form_rules:
          {
            title: [{required: true, message: "please enter title", trigger: "blur"},
              {min: 0, max: 20, message: "title is invalid", trigger: "blur"}],

            address: [{required: true, message: "please enter address", trigger: "blur"}],

            //begin大于当前日期 //发送到后端验证时间是否冲突
            begin_time: [{required: true, message: "Please select a start time", trigger: "blur"},
              {
                validator: function (rule, value, callback)
                {
                  console.log(value)

                  let date = new Date();

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

            //end大于当前日期，end大于begin //发送到后端验证时间是否冲突
            end_time: [{required: true, message: "Please choose a end time", trigger: "blur"},
              {
                validator: function (rule, value, callback)
                {
                  let date = new Date();

                  if (value < date || value < that.form_data.begin_time)
                  {
                    callback(new Error('the time is invalid'));
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
          // let that = this;

          this.$refs.form.validate((valid) =>
          {
            if (!valid)
            {
              //账号或密码没有填写，或填写格式错误
              ElMessage({
                message: 'Please fill in all information',
                type: 'warning',
              })
            } else
            {
              // 添加事件
              // /add_event get

              // that.axios({
              //   methods: 'get',
              //   url: 'http://localhost:3000/',
              //   params: this.form
              // }).then(function (response)
              // {
              //   //请求成功清空表单
              //   that.$refs.form.resetFields()
              //
              //   console.log('请求成功')
              //   console.log(response)
              //
              //   ElMessage({
              //     message: 'Submitted successfully',
              //     type: 'success',
              //   })
              // }).catch(function (error)
              // {
              //   console.log('请求失败')
              //   console.log(error.message)
              // })
              console.log('表单验证成功')
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