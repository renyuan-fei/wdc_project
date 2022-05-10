<template>
  <span>
<!--    <el-button @click="is_add = !is_add">切换(临时)</el-button>-->
    <el-card v-show="!is_add" id="my_plan">

    <template #header>
      <div class="card-header">

        <span style="font-weight: bold;"> MY  PLAN </span>

        <el-button circle class="button" @click="is_add = !is_add">
          <el-icon><plus/></el-icon>
        </el-button>

      </div>
    </template>

      <el-table :data="tableData" style="width: 100%">

        <el-table-column label="Start" width="230">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><clock/></el-icon>
              <span style="margin-left: 10px">{{ scope.row.start_time }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="End" width="230">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><clock/></el-icon>
              <span style="margin-left: 10px">{{ scope.row.end_time }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Title" width="200">
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

        <el-table-column label="Delete">
          <template #default="scope">
            <el-popconfirm title="Are you sure to delete this?" @confirm="Delete(scope.$index, scope.row)">
              <template #reference>
                <el-button size="small" type="danger">
                  Delete
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>

      </el-table>

    </el-card>
    <ADD_EVENT v-show="is_add" :data="is_add" @changedata="change_data"></ADD_EVENT>
  </span>

</template>

<script>
import ADD_EVENT from './ADD_EVENT'

import {Clock} from "@element-plus/icons-vue";

export default {
  name: "MY_PLAN",
  component:
      {
        Clock
      },
  mounted()
  {
    console.log('页面渲染完成')

    //axios请求后端
    console.log('开始请求后端数据进行渲染')

    //将数据存入table data
  },
  data()
  {
    return {
      is_add: false,

      MY_STATE: ['work', 'rest', 'other'],
      STATE_COLOR: ["danger", "success", "warning"],

      tableData: [
        {
          event_id: 'a',
          start_time: '2016-05-03',
          end_time: '2016-05-03',
          title: 'test',
          address: 'No. 189, Grove St, Los Angeles',
          state: 0,
          note: 'my test',
        },
        {
          event_id: 'b',
          start_time: '2016-05-03',
          end_time: '2016-05-03',
          title: 'test',
          address: 'No. 189, Grove St, Los Angeles',
          state: 1,
          note: 'my test',
        },
        {
          event_id: 'c',
          start_time: '2016-05-03',
          end_time: '2016-05-03',
          title: 'test',
          address: 'No. 189, Grove St, Los Angeles',
          state: 2,
          note: 'my test',
        },
        {
          event_id: 'd',
          start_time: '2016-05-03',
          end_time: '2016-05-03',
          title: 'test',
          address: 'No. 189, Grove St, Los Angeles',
          state: 0,
          note: 'my test',
        },
        {
          event_id: 'e',
          start_time: '2016-05-03',
          end_time: '2016-05-03',
          title: 'test',
          address: 'No. 189, Grove St, Los Angeles',
          state: 2,
          note: 'my test',
        },
      ]

    }
  },
  components:
      {
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

#my_plan {
  margin: 0;
  padding: 0;

  width: 800px;
  height: 900px;

  border-radius: 20px;

  text-align: center;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

</style>