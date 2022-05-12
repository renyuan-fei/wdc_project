<template>
  <el-card v-show="!is_add" class="all_plan">

    <template #header>
      <div class="card-header">

        <span style="font-weight: bold; font-size:20px;"> PUBLIC  PLAN </span>

        <img src="../../assets/像素_仙人掌.png" alt="img" class="image">

      </div>
    </template>

    <div class="table-box">
      <el-table :data="tableData" style="width: 100%">

        <el-table-column label="Start" width="230">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon>
                <clock/>
              </el-icon>
              <span style="margin-left: 10px">{{ scope.row.start_time }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="End" width="230">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon>
                <clock/>
              </el-icon>
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

        <el-table-column label="Accept">
          <template #default="scope">
            <el-popconfirm title="Are you sure to Add this?" @confirm="Add(scope.$index, scope.row)">
              <template #reference>
                <el-button circle size="default">
                  <el-icon size="default">
                    <circle-plus-filled/>
                  </el-icon>
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>

      </el-table>
    </div>

  </el-card>
</template>

<script>
import {Check, CirclePlusFilled, Clock} from "@element-plus/icons-vue";

export default {
  name: "ALL_PLAN",
  mounted()
  {
    console.log(this.$route.params.public_plan)
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
        {
          event_id: 'e',
          start_time: '2016-05-03',
          end_time: '2016-05-03',
          title: 'test',
          address: 'No. 189, Grove St, Los Angeles',
          state: 2,
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
        }, {
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
  methods:
      {
        Add(index, row)
        {
          console.log(index, row.event_id)

          //弹窗确认是否添加

          //将event_id发向后端，然后添加该事件

          //后端返回添加成功后，在本地添加
          this.tableData.splice(index, 1);

          //刷新页面
          // this.$router.go(0)

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

</style>