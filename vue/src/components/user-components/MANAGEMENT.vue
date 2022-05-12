<template>
  <el-card class="manage">

    <template #header>
      <div class="card-header">

        <span style="font-weight: bold; font-size:20px;"> USER LIST </span>

        <img alt="img" class="image" src="../../assets/像素_金币.png">

      </div>
    </template>

    <div class="table-box">
      <el-table :data="tableData" style="width: 100%">


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
    console.log(this.$route.params.user_list)
  },
  components:
      {
        // eslint-disable-next-line vue/no-unused-components
        Clock,
        // eslint-disable-next-line vue/no-unused-components
        Check,
        // eslint-disable-next-line vue/no-unused-components
        CirclePlusFilled
      },
  data()
  {
    return {

      PERMISSION: ['user', 'administrator'],
      GENDER: ['female', 'male'],

      //临时用(temp)
      tableData: [
        {
          username: '#',
          password: '#',
          //0 用户
          //1 管理员
          permission: 0,
          email: '#',
          //0 female
          //1 male
          gender: 1,
        }


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

.manage {
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