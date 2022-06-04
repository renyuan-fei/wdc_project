<template>
  <el-card v-show="!is_add" class="all_plan">

    <template #header>
      <div class="card-header">

        <span style="font-weight: bold; font-size:20px;"> PUBLIC  PLAN </span>

        <img src="../../assets/像素_仙人掌.png" alt="img" class="image">

      </div>
    </template>

    <div class="table-box">
      <div class="container">
        <table class="table-ui">
          <thead>
          <tr>
            <th class="t1">Start</th>
            <th class="t2">End</th>
            <th class="t3">Title</th>
            <th class="t4">Accept</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="event in this.tableData" :key="event.event_id">

            <td>
              <el-icon>
                <clock/>
              </el-icon>
              <span style="margin-left: 10px">{{ event.begin_time }}</span>
            </td>

            <td>
              <el-icon>
                <clock/>
              </el-icon>
              <span style="margin-left: 10px">{{ event.end_time }}</span>
            </td>

            <td>
              <el-popover effect="light" placement="top" trigger="hover" width="auto">
                <template #default>
                  <div>title: {{ event.title }}</div>
                  <div>address: {{ event.address }}</div>
                  <div>note: {{ event.note }}</div>
                </template>
                <template #reference>
                  <el-tag :type="STATE_COLOR[event.state]">{{ event.title }}</el-tag>
                </template>
              </el-popover>
            </td>

            <td>
              <el-popconfirm title="Are you sure to Add this?" @confirm="Add(event.event_id)">
                <template #reference>
                  <el-button circle size="default">
                    <el-icon size="default">
                      <circle-plus-filled/>
                    </el-icon>
                  </el-button>
                </template>
              </el-popconfirm>
            </td>
          </tr>
          </tbody>
        </table>

        <div v-if="this.tableData.length === 0" class="NO_DATA">
          NO DATA
        </div>

      </div>

      <!--      <el-table :data="tableData" style="width: 100%">-->

      <!--        <el-table-column label="Start" width="230">-->
      <!--          <template #default="scope">-->
      <!--            <div style="display: flex; align-items: center">-->
      <!--              <el-icon>-->
      <!--                <clock/>-->
      <!--              </el-icon>-->
      <!--              <span style="margin-left: 10px">{{ scope.row.start_time }}</span>-->
      <!--            </div>-->
      <!--          </template>-->
      <!--        </el-table-column>-->

      <!--        <el-table-column label="End" width="230">-->
      <!--          <template #default="scope">-->
      <!--            <div style="display: flex; align-items: center">-->
      <!--              <el-icon>-->
      <!--                <clock/>-->
      <!--              </el-icon>-->
      <!--              <span style="margin-left: 10px">{{ scope.row.end_time }}</span>-->
      <!--            </div>-->
      <!--          </template>-->
      <!--        </el-table-column>-->

      <!--        <el-table-column label="Title" width="200">-->
      <!--          <template #default="scope">-->
      <!--            <el-popover effect="light" placement="top" trigger="hover" width="auto">-->
      <!--              <template #default>-->
      <!--                <div>title: {{ scope.row.title }}</div>-->
      <!--                <div>address: {{ scope.row.address }}</div>-->
      <!--                <div>note: {{ scope.row.note }}</div>-->
      <!--              </template>-->
      <!--              <template #reference>-->
      <!--                <el-tag :type="STATE_COLOR[scope.row.state]">{{ scope.row.title }}</el-tag>-->
      <!--              </template>-->
      <!--            </el-popover>-->
      <!--          </template>-->
      <!--        </el-table-column>-->

      <!--        <el-table-column label="Accept">-->
      <!--          <template #default="scope">-->
      <!--            <el-popconfirm title="Are you sure to Add this?" @confirm="Add(scope.$index)">-->
      <!--              <template #reference>-->
      <!--                <el-button circle size="default">-->
      <!--                  <el-icon size="default">-->
      <!--                    <circle-plus-filled/>-->
      <!--                  </el-icon>-->
      <!--                </el-button>-->
      <!--              </template>-->
      <!--            </el-popconfirm>-->
      <!--          </template>-->
      <!--        </el-table-column>-->

      <!--      </el-table>-->
    </div>

  </el-card>
</template>

<script>
import {Check, CirclePlusFilled, Clock} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

export default {
  name: "ALL_PLAN",
  mounted()
  {
    let that = this;

    that.axios({
      method: 'get',
      url: '/get_public_event',
      params: {
        username: window.localStorage.getItem('username'),
        permissions: window.localStorage.getItem('permissions')
        // token: window.sessionStorage.getItem('token')
      }
    }).then(function (response)
    {
      console.log('请求成功')
      console.log(response)

      //将数据存入table data
      if (response.data.status !== 0)
      {
        that.tableData = []
        for (let i in response.data)
        {
          let temp = {}

          temp.event_id = response.data[i].event_id
          temp.begin_time = response.data[i].begin_time
          temp.end_time = response.data[i].end_time
          temp.title = response.data[i].title
          temp.address = response.data[i].address
          temp.state = response.data[i].state
          temp.type = response.data[i].type
          temp.note = response.data[i].note

          that.tableData.push(temp)
        }
      }

      console.log(that.tableData)

    }).catch(function (error)
    {
      console.log('请求失败')
      console.log(error.message)
    })
  },
  components:
      {
        // eslint-disable-next-line vue/no-unused-components
        Clock,
        // eslint-disable-next-line vue/no-unused-components
        Check,
        CirclePlusFilled
      },
  data()
  {
    return {
      is_add: false,

      MY_STATE: ['work', 'rest', 'other'],
      STATE_COLOR: ["danger", "success", "warning"],

      //临时用(temp)
      tableData: [
        // {
        //   event_id: 'a',
        //   begin_time: '2016-05-03',
        //   end_time: '2016-05-03',
        //   title: 'test',
        //   address: 'No. 189, Grove St, Los Angeles',
        //   state: 0,
        //   note: 'my test',
        // },
        // {
        //   event_id: 'b',
        //   begin_time: '2016-05-03',
        //   end_time: '2016-05-03',
        //   title: 'test',
        //   address: 'No. 189, Grove St, Los Angeles',
        //   state: 1,
        //   note: 'my test',
        // },
        // {
        //   event_id: 'c',
        //   begin_time: '2016-05-03',
        //   end_time: '2016-05-03',
        //   title: 'test',
        //   address: 'No. 189, Grove St, Los Angeles',
        //   state: 2,
        //   note: 'my test',
        // }
      ]
    }
  },
  methods:
      {
        Add(id)
        {
          let that = this

          console.log(id)

          //弹窗确认是否添加

          //将event_id发向后端，然后添加该事件
          that.axios({
            method: 'get',
            url: '/check_time',
            params: {
              username: window.localStorage.getItem('username'),
              event_id: id,
              // token: window.sessionStorage.getItem('token')
            }
          }).then(function (response)
          {
            console.log(response.data)
            //时间可用
            if (response.data === 1)
            {
              that.axios({
                method: 'post',
                url: '/add_public_event',
                data: {
                  username: window.localStorage.getItem('username'),
                  event_id: id,
                  // token: window.sessionStorage.getItem('token')
                },
                headers: {
                  'Content-Type': 'application/json'
                },
              }).then(function (response)
              {
                //后端返回添加成功后
                console.log('请求成功')
                console.log(response)

                //将新的数据存入table data
                if (response.data.status !== 0)
                {
                  that.tableData = []
                  for (let i in response.data)
                  {
                    let temp = {}

                    temp.event_id = response.data[i].event_id
                    temp.begin_time = response.data[i].begin_time
                    temp.end_time = response.data[i].end_time
                    temp.title = response.data[i].title
                    temp.address = response.data[i].address
                    temp.state = response.data[i].state
                    temp.type = response.data[i].type
                    temp.note = response.data[i].note

                    that.tableData.push(temp)
                  }

                  ElMessage({
                    message: 'public event added successfully',
                    type: 'success',
                  })
                } else
                {
                  ElMessage({
                    message: 'drop event fail',
                    type: 'warning',
                  })
                }
              }).catch(function (error)
              {
                console.log('请求失败/add_public_event')
                console.log(error.message)
              })
            }
            //时间不可用
            else
            {
              ElMessage({
                message: 'Time Conflict',
                type: 'warning',
              })
            }

          }).catch(function (error)
          {
            console.log('请求失败/check')
            console.log(error.message)
          })

          console.log(this.tableData)
        }
      }
}
</script>

<style lang="less" scoped>

.all_plan {
  margin: 0;
  padding: 0;

  width: 800px;
  height: 900px;

  border-radius: 20px;

  text-align: center;

  position: absolute;

  .table-box {
    width: 95%;
    height: 88%;
    display: flex;
    flex-direction: column;
    position: absolute;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 45px;
  }

  .el-table {
    flex: 1;
    overflow-y: auto;
  }
}

.image {
  position: absolute;

  width: 60px;
  height: 60px;

  transform: translate(-50%, 0);
  left: 50%;
}

.table-box {
  width: 97%;
  height: 88%;
  display: flex;
  flex-direction: column;
  position: absolute;

  flex: 1;
  overflow-y: auto;
}

.container {
  background: #fff;
  padding: 0 5px 50px;
}

.table-ui {
  width: 99%;
  border-collapse: collapse;
}

.table-ui tr th {
  height: 30px;
  padding: 0 12px;
  font-size: 14px;
  color: #909399;

  text-align: left;
  transform: translate(2%, 0);

  border-bottom: 1px solid #ebeef5;
}

.table-ui tr td {
  height: 30px;
  padding: 8px 0;
  font-size: 14px;
  color: #606266;

  text-align: left;
  transform: translate(10%, 0);

  border-bottom: 1px solid #ebeef5;
}

.table-ui .t1 {
  width: 30%;
  height: 40px;
}

.table-ui .t2 {
  width: 30%;
  height: 40px;
}

.table-ui .t3 {
  width: 30%;
  height: 40px;
}

.table-ui .t4 {
  width: 10%;
  height: 40px;
}

.table-ui tbody tr:hover {
  background: #f5f5f5;
  -webkit-transition: all .3s linear;
  -moz-transition: all .3s linear;
  -o-transition: all .3s linear;
  -ms-transition: all .3s linear;
  transition: all .3s linear;
}

.NO_DATA {
  box-sizing: border-box;

  width: 100%;
  height: 60px;

  line-height: 60px;
  font-size: 12px;

  color: #909399;

  border-bottom: 1px solid #ebeef5;
}

</style>