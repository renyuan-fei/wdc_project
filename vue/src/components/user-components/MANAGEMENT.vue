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
            label="permissions"
            prop="permissions"
            width="130"
        >
          <template #default="scope">
            <el-tag
                :type="scope.row.permissions === 'Admin' ? 'warning' : 'success'"
                disable-transitions
            >{{ scope.row.permissions }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="Option">
          <template #default="scope">

            <el-popconfirm v-if="scope.row.permissions === 'Admin'" title="common user?"
                           @confirm="Drop(scope.row.username)">
              <template #reference>
                <el-button circle size="default" type="danger">
                  <el-icon>
                    <delete/>
                  </el-icon>
                </el-button>
              </template>
            </el-popconfirm>

            <el-popconfirm v-else title="admin?" @confirm="Add(scope.row.username)">
              <template #reference>
                <el-button circle size="default" type="success">
                  <el-icon>
                    <Check/>
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
import {ElMessage} from "element-plus";

export default {
  name: "ALL_PLAN",
  mounted()
  {
    let that = this;

    that.axios({
      method: 'get',
      url: '/get_user_list',
      params: {
        permissions: window.localStorage.getItem('permissions'),
        username: window.localStorage.getItem('username')
        // token: window.sessionStorage.getItem('token')
      }
    }).then(function (response)
    {
      console.log('request successful')
      console.log(response)

      for (let i in response.data)
      {
        //转换
        response.data[i].gender = that.GENDER[response.data[i].gender]

        response.data[i].permissions = that.PERMISSION[response.data[i].permissions]
        console.log(that.PERMISSION[response.data[i].permissions])
      }

      //将数据存入table data
      that.tableData = response.data

    }).catch(function (error)
    {
      console.log('request failed')
      console.log(error.message)
    })
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

      // 临时用(temp)
      tableData: [
        // {
        //   username: 'user',
        //   //0 用户
        //   //1 管理员
        //   permissions: 0,
        //   email: '2313131@gmail.com',
        //   //0 female
        //   //1 male
        //   gender: 1,
        // },
        // {
        //   username: 'admin',
        //   //0 用户
        //   //1 管理员
        //   permissions: 1,
        //   email: '2313131@gmail.com',
        //   //0 female
        //   //1 male
        //   gender: 0,
        // },
        // {
        //   username: 'user',
        //   //0 用户
        //   //1 管理员
        //   permission: 0,
        //   email: '2313131@gmail.com',
        //   //0 female
        //   //1 male
        //   gender: 1,
        // }, {
        //   username: 'user',
        //   //0 用户
        //   //1 管理员
        //   permission: 0,
        //   email: '2313131@gmail.com',
        //   //0 female
        //   //1 male
        //   gender: 1,
        // }, {
        //   username: 'user',
        //   //0 用户
        //   //1 管理员
        //   permission: 0,
        //   email: '2313131@gmail.com',
        //   //0 female
        //   //1 male
        //   gender: 1,
        // },
        // {
        //   username: 'admin',
        //   //0 用户
        //   //1 管理员
        //   permission: 1,
        //   email: '2313131@gmail.com',
        //   //0 female
        //   //1 male
        //   gender: 0,
        // }, {
        //   username: 'admin',
        //   //0 用户
        //   //1 管理员
        //   permission: 1,
        //   email: '2313131@gmail.com',
        //   //0 female
        //   //1 male
        //   gender: 0,
        // }, {
        //   username: 'admin',
        //   //0 用户
        //   //1 管理员
        //   permission: 1,
        //   email: '2313131@gmail.com',
        //   //0 female
        //   //1 male
        //   gender: 0,
        // }, {
        //   username: 'admin',
        //   //0 用户
        //   //1 管理员
        //   permission: 1,
        //   email: '2313131@gmail.com',
        //   //0 female
        //   //1 male
        //   gender: 0,
        // },
      ]

    }
  },
  methods:
      {
        Add(username)
        {
          let that = this;

          console.log(username)

          //弹窗确认是否添加

          //将username发向后端
          that.axios({
            method: 'post',
            url: '/modify_permission',
            data: {
              username: username,
              admin_name: window.localStorage.getItem('username'),
              // token: window.sessionStorage.getItem('token')
            }
          }).then(function (response)
          {
            //后端返回添加成功后,赋值新的数据
            console.log('request successful')
            console.log(response)

            //将数据存入table data
            if (response.data.status !== 0)
            {
              that.tableData = []
              for (let i in response.data)
              {
                let temp = {}

                temp.username = response.data[i].username
                temp.email = response.data[i].email
                temp.gender = that.GENDER[response.data[i].gender]
                temp.permissions = that.PERMISSION[response.data[i].permissions]

                that.tableData.push(temp)
              }
            } else
            {
              ElMessage({
                message: 'drop event fail',
                type: 'warning',
              })
            }

          }).catch(function (error)
          {
            console.log('request failed')
            console.log(error.message)
          })

          console.log(this.tableData)
        },

        // eslint-disable-next-line no-unused-vars
        Drop(username)
        {
          let that = this;

          console.log(username)

          //弹窗确认是否添加

          //将username发向后端
          that.axios({
            method: 'post',
            url: '/modify_permission',
            data: {
              username: username,
              admin_name: window.localStorage.getItem('username'),
              // token: window.sessionStorage.getItem('token')
            },
            headers: {
              'Content-Type': 'application/json'
            },
          }).then(function (response)
          {
            //后端返回添加成功后,赋值新的数据
            console.log('request successful')
            console.log(response)

            //将数据存入table data
            if (response.data.status !== 0)
            {
              that.tableData = []
              for (let i in response.data)
              {
                let temp = {}

                temp.username = response.data[i].username
                temp.email = response.data[i].email
                temp.gender = that.GENDER[response.data[i].gender]
                temp.permissions = that.PERMISSION[response.data[i].permissions]

                that.tableData.push(temp)
              }
            } else
            {
              ElMessage({
                message: 'drop event fail',
                type: 'warning',
              })
            }

          }).catch(function (error)
          {
            console.log('request failed')
            console.log(error.message)
          })

          console.log(this.tableData)
        },

        filterTag(value, row)
        {
          console.log(row.tag, value)

          return row.permissions === value
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