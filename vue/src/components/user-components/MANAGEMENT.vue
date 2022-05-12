<template>
  <el-card class="manage">

    <template #header>
      <div class="card-header">

        <span style="font-weight: bold; font-size:20px;"> USER LIST </span>

        <img alt="img" class="image" src="../../assets/像素_金币.png">

      </div>
    </template>

    <div class="table-box">
      <el-table ref="tableRef" :data="tableData" row-key="date" style="width: 100%">
        <el-table-column label="UserName" prop="username" width="160"/>
        <el-table-column label="Email" prop="email" width="250"/>
        <el-table-column
            label="Gender"
            prop="gender"
            width="138">
          <template #default="scope">
            <el-tag
                :type="scope.row.gender === 'Male' ? '' : 'danger'"
                disable-transitions
            >{{ scope.row.gender }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
            :filter-method="filterTag"
            :filters="[
        { text: 'USER', value: 'User' },
        { text: 'ADMIN', value: 'Admin' },
      ]"
            filter-placement="bottom-end"
            label="permission"
            prop="permission"
            width="130"
        >
          <template #default="scope">
            <el-tag
                :type="scope.row.permission === 'Admin' ? 'warning' : 'success'"
                disable-transitions
            >{{ scope.row.permission }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="Option">
          <template #default="scope">
            <el-button v-if="scope.row.permission === 'Admin'" circle size="default" type="danger" @click="Drop()">
              <el-icon>
                <delete/>
              </el-icon>
            </el-button>

            <el-button v-else circle size="default" type="success" @click="Add()">
              <el-icon>
                <Check/>
              </el-icon>
            </el-button>
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
    console.log(this.$route.params.user_list)

    for (let i in this.tableData)
    {
      //转换
      this.tableData[i].gender = this.GENDER[this.tableData[i].gender]

      this.tableData[i].permission = this.PERMISSION[this.tableData[i].permission]
    }
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

      PERMISSION: ['User', 'Admin'],
      GENDER: ['Female', 'Male'],

      // tableData: [
      //   {
      //     date: '2016-05-03',
      //     name: 'Tom',
      //     address: 'No. 189, Grove St, Los Angeles',
      //     tag: 'Home',
      //   },
      //   {
      //     date: '2016-05-02',
      //     name: 'Tom',
      //     address: 'No. 189, Grove St, Los Angeles',
      //     tag: 'Office',
      //   },
      //   {
      //     date: '2016-05-04',
      //     name: 'Tom',
      //     address: 'No. 189, Grove St, Los Angeles',
      //     tag: 'Home',
      //   },
      //   {
      //     date: '2016-05-01',
      //     name: 'Tom',
      //     address: 'No. 189, Grove St, Los Angeles',
      //     tag: 'Office',
      //   },
      // ]

      // 临时用(temp)
      tableData: [
        {
          username: 'user',
          //0 用户
          //1 管理员
          permission: 0,
          email: '2313131@gmail.com',
          //0 female
          //1 male
          gender: 1,
        },
        {
          username: 'admin',
          //0 用户
          //1 管理员
          permission: 1,
          email: '2313131@gmail.com',
          //0 female
          //1 male
          gender: 0,
        },
        {
          username: 'user',
          //0 用户
          //1 管理员
          permission: 0,
          email: '2313131@gmail.com',
          //0 female
          //1 male
          gender: 1,
        }, {
          username: 'user',
          //0 用户
          //1 管理员
          permission: 0,
          email: '2313131@gmail.com',
          //0 female
          //1 male
          gender: 1,
        }, {
          username: 'user',
          //0 用户
          //1 管理员
          permission: 0,
          email: '2313131@gmail.com',
          //0 female
          //1 male
          gender: 1,
        },
        {
          username: 'admin',
          //0 用户
          //1 管理员
          permission: 1,
          email: '2313131@gmail.com',
          //0 female
          //1 male
          gender: 0,
        }, {
          username: 'admin',
          //0 用户
          //1 管理员
          permission: 1,
          email: '2313131@gmail.com',
          //0 female
          //1 male
          gender: 0,
        }, {
          username: 'admin',
          //0 用户
          //1 管理员
          permission: 1,
          email: '2313131@gmail.com',
          //0 female
          //1 male
          gender: 0,
        }, {
          username: 'admin',
          //0 用户
          //1 管理员
          permission: 1,
          email: '2313131@gmail.com',
          //0 female
          //1 male
          gender: 0,
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
        },

        // eslint-disable-next-line no-unused-vars
        Drop(index, row)
        {

        },

        filterTag(value, row)
        {
          console.log(row.tag, value)

          return row.permission === value
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