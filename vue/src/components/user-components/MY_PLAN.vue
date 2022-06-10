<template>
  <span id="my_plan">

    <el-card v-show="!is_add" class="my_plan">

    <template #header>
      <div class="card-header">

<!--      -->
        <span v-if="is_user" style="font-weight: bold; font-size:20px;"> MY  PLAN </span>
        <span v-else style="font-weight: bold; font-size:20px;"> ADMIN  PLAN </span>

        <img v-if="is_user" alt="img" class="image" src="../../assets/像素_旗帜.png">
        <img v-else alt="img" class="image" src="../../assets/像素_武器.png">

        <el-button circle class="button" @click="is_add = !is_add">
          <el-icon><plus/></el-icon>
        </el-button>

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
            <th class="t4">Type</th>
            <th class="t5">Drop</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="event in this.tableData" :key="event.event_id">

            <td>
              <el-icon><clock/></el-icon>
              <span style="margin-left: 10px">{{ event.begin_time }}</span>
            </td>

            <td>
              <el-icon><clock/></el-icon>
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
              <el-icon v-if="event.type === 1" size="large">
                <OfficeBuilding/>
              </el-icon>
              <el-icon v-else size="large">
                <star/>
              </el-icon>
            </td>

            <td>
              <el-popconfirm title="Are you sure to delete this?" @confirm="Delete(event.event_id)">
              <template #reference>
                <el-button circle size="default" type="danger">
                  <el-icon><delete/></el-icon>
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
        <!--        <el-table :data="tableData" style="width: 100%">-->

        <!--        <el-table-column label="Start" width="200">-->
        <!--          <template #default="scope">-->
        <!--            <div style="display: flex; align-items: center">-->
        <!--              <el-icon><clock/></el-icon>-->
        <!--              <span style="margin-left: 10px">{{ scope.row.start_time }}</span>-->
        <!--            </div>-->
        <!--          </template>-->
        <!--        </el-table-column>-->

        <!--        <el-table-column label="End" width="200">-->
        <!--          <template #default="scope">-->
        <!--            <div style="display: flex; align-items: center">-->
        <!--              <el-icon><clock/></el-icon>-->
        <!--              <span style="margin-left: 10px">{{ scope.row.end_time }}</span>-->
        <!--            </div>-->
        <!--          </template>-->
        <!--        </el-table-column>-->

        <!--        <el-table-column label="Title" width="150">-->
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

        <!--          <el-table-column label="Type" width="130">-->
        <!--          <template #default="scope">-->
        <!--            <div style="display: flex; align-items: center">-->
        <!--              <el-icon v-if="scope.row.type === 1" size="large">-->
        <!--                <OfficeBuilding/>-->
        <!--              </el-icon>-->
        <!--              <el-icon v-else size="large">-->
        <!--                <star/>-->
        <!--              </el-icon>-->
        <!--            </div>-->
        <!--          </template>-->
        <!--        </el-table-column>-->

        <!--        <el-table-column label="Drop">-->
        <!--          <template #default="scope">-->
        <!--            <el-popconfirm title="Are you sure to delete this?" @confirm="Delete(scope.$index, scope.row)">-->
        <!--              <template #reference>-->
        <!--                <el-button circle size="default" type="danger">-->
        <!--                  <el-icon><delete/></el-icon>-->
        <!--                </el-button>-->
        <!--              </template>-->
        <!--            </el-popconfirm>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <!--      </el-table>-->
      </div>

    </el-card>
    <ADD_EVENT v-show="is_add" :data="is_add" @changedata="change_data"></ADD_EVENT>
  </span>

</template>

<script>
import ADD_EVENT from './ADD_EVENT'

import {Clock, Delete, OfficeBuilding, School, Star, StarFilled} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

export default {
  name: "MY_PLAN",
  component:
      {
        Clock,
        Delete,
        StarFilled,
        Star,
        School,
        OfficeBuilding
      },
  mounted()
  {
    let that = this

    console.log('MY_PLAN')

    //
    let permissions = window.localStorage.getItem('permissions')

    //
    if (permissions === '1')
    {
      this.is_user = false
    }

    //axios

    that.axios({
      method: 'get',
      url: '/get_event',
      params: {
        username: window.localStorage.getItem('username'),
        permissions: window.localStorage.getItem('permissions')
        // token: window.sessionStorage.getItem('token')
      }
    }).then(function (response)
    {
      console.log('request successful')
      console.log(response)

      //table data
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
      // else
      // {
      //   ElMessage({
      //     message: 'get event fail',
      //     type: 'warning',
      //   })
      // }


      console.log(that.tableData)

    }).catch(function (error)
    {
      console.log('request failed')
      console.log(error.message)
    })
  },
  data()
  {
    return {
      is_add: false,
      is_user: true,

      MY_STATE: ['work', 'rest', 'other'],
      STATE_COLOR: ["danger", "success", "warning"],

      //(temp)
      tableData: [
        // {
        //   event_id: 'a',
        //   begin_time: '2016-05-03',
        //   end_time: '2016-05-03',
        //   title: 'test',
        //   address: 'No. 189, Grove St, Los Angeles',
        //   state: 0,
        //   type: 1,
        //   note: 'my test',
        // },
        // {
        //   event_id: 'b',
        //   begin_time: '2016-05-03',
        //   end_time: '2016-05-03',
        //   title: 'test',
        //   address: 'No. 189, Grove St, Los Angeles',
        //   state: 1,
        //   type: 0,
        //   note: 'my test',
        // },
        // {
        //   event_id: 'b',
        //   begin_time: '2016-05-03',
        //   end_time: '2016-05-03',
        //   title: 'test',
        //   address: 'No. 189, Grove St, Los Angeles',
        //   state: 2,
        //   type: 1,
        //   note: 'my test',
        // }
      ]
    }
  },
  components:
      {
        OfficeBuilding,
        ADD_EVENT
      },
  methods:
      {
        change_data(params)
        {
          let that = this;

          console.log(params)
          console.log(this.is_add)
          this.is_add = params

          that.axios({
            method: 'get',
            url: '/get_event',
            params: {
              username: window.localStorage.getItem('username'),
              permissions: window.localStorage.getItem('permissions')
              // token: window.sessionStorage.getItem('token')
            }
          }).then(function (response)
          {
            console.log('')
            console.log(response)

            //table data
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
            } else
            {
              ElMessage({
                message: 'update fail',
                type: 'warning',
              })
            }

            console.log(that.tableData)

          }).catch(function (error)
          {
            console.log('')
            console.log(error.message)
          })
        },
        Delete(id)
        {
          let that = this;
          console.log(id)

          //

          //event_id，
          that.axios({
            method: 'post',
            url: '/drop_event',
            data: {
              username: window.localStorage.getItem('username'),
              permissions: window.localStorage.getItem('permissions'),
              event_id: id
              // token: window.sessionStorage.getItem('token')
            },
            headers: {
              'Content-Type': 'application/json'
            },
          }).then(function (response)
          {
            console.log('')
            console.log(response)

            //table data
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
            } else
            {
              ElMessage({
                message: 'drop event fail',
                type: 'warning',
              })
            }

            console.log(that.tableData)

          }).catch(function (error)
          {
            console.log('')
            console.log(error.message)
          })
          //

          //
          // this.$router.go(0)

          // console.log(this.tableData)
        }
      },
}
</script>

<style lang="less" scoped>

.my_plan {
  margin: 0;
  padding: 0;

  width: 800px;
  height: 900px;

  border-radius: 20px;

  text-align: center;

  position: absolute;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 45px;
  }
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

.image {
  position: absolute;

  width: 60px;
  height: 60px;

  transform: translate(-50%, 0);
  left: 50%;
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
  width: 25%;
  height: 40px;
}

.table-ui .t2 {
  width: 25%;
  height: 40px;
}

.table-ui .t3 {
  width: 20%;
  height: 40px;
}

.table-ui .t4 {
  width: 17%;
  height: 40px;
}

.table-ui .t5 {
  width: 9%;
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