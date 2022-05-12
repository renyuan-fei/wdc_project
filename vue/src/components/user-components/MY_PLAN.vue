<template>
  <span id="my_plan">

    <el-card v-show="!is_add" class="my_plan">

    <template #header>
      <div class="card-header">

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
        <el-table :data="tableData" style="width: 100%">

        <el-table-column label="Start" width="200">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><clock/></el-icon>
              <span style="margin-left: 10px">{{ scope.row.start_time }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="End" width="200">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><clock/></el-icon>
              <span style="margin-left: 10px">{{ scope.row.end_time }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Title" width="150">
          <template #default="scope">
            <el-popover effect="light" placement="top" trigger="hover" width="auto">
              <template #default>
                <div>title: {{ scope.row.title }}</div>
                <div>address: {{ scope.row.address }}</div>
                <div>note: {{ scope.row.note }}</div>
              </template>
              <template #reference>
                <el-tag :type="STATE_COLOR[scope.row.state]">{{ scope.row.title }}</el-tag>
              </template>
            </el-popover>
          </template>
        </el-table-column>

          <el-table-column label="Type" width="130">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon v-if="scope.row.type === 1" size="large">
                <OfficeBuilding />
              </el-icon >
              <el-icon v-else size="large">
                <star />
              </el-icon>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Drop">
          <template #default="scope">
            <el-popconfirm title="Are you sure to delete this?" @confirm="Delete(scope.$index, scope.row)">
              <template #reference>
                <el-button circle size="default" type="danger">
                  <el-icon><delete/></el-icon>
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>

      </el-table>
      </div>

    </el-card>
    <ADD_EVENT v-show="is_add" :data="is_add" @changedata="change_data"></ADD_EVENT>
  </span>

</template>

<script>
import ADD_EVENT from './ADD_EVENT'

import {Clock, Delete, OfficeBuilding, School, Star, StarFilled} from "@element-plus/icons-vue";

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
    console.log('MY_PLAN')

    //获取权限信息
    let permissions = window.sessionStorage.getItem('permissions')

    if (permissions === '2')
    {
      this.is_user = false
    }

    console.log(this.$route.params.user_plan)

    //axios请求后端

    //将数据存入table data
  },
  data()
  {
    return {
      is_add: false,
      is_user: true,

      MY_STATE: ['work', 'rest', 'other'],
      STATE_COLOR: ["danger", "success", "warning"],

      //临时用(temp)
      tableData: [
        {
          event_id: 'a',
          start_time: '2016-05-03',
          end_time: '2016-05-03',
          title: 'test',
          address: 'No. 189, Grove St, Los Angeles',
          type: 1,
          state: 0,
          note: 'my test',
        },
        {
          event_id: 'a',
          start_time: '2016-05-03',
          end_time: '2016-05-03',
          title: 'test',
          address: 'No. 189, Grove St, Los Angeles',
          type: 2,
          state: 1,
          note: 'my test',
        },
        {
          event_id: 'a',
          start_time: '2016-05-03',
          end_time: '2016-05-03',
          title: 'test',
          address: 'No. 189, Grove St, Los Angeles',
          type: 1,
          state: 2,
          note: 'my test',
        }
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
          console.log(params)
          console.log(this.is_add)
          this.is_add = params
        },
        Delete(index, row)
        {
          console.log(index, row.event_id)

          //弹窗确认是否删除

          //将event_id发向后端，然后删除该事件

          //后端返回删除成功后，在本地删除
          this.tableData.splice(index, 1);

          //刷新页面
          // this.$router.go(0)

          console.log(this.tableData)
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

</style>