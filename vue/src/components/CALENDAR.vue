<template>

  <div id="container">

    <div class="top">
      <TOP_BAR></TOP_BAR>
    </div>

    <div class="center-div part2">

      <el-card class="calendar">

        <template #header>
          Calendar
        </template>

        <el-calendar>
          <template #dateCell="{ data }">
            <p :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split('-').slice(1).join('-') }}
            </p>
            <template v-for="(item) in calendar_data">
              <el-row v-if="data.day === item.begin_time" :key="item.event_id">
                <el-popover
                    :content="item.note"
                    :title="item.title"
                    :width="200"
                    placement="top-start"
                    trigger="hover">
                  <template #reference>
                    <el-tag size="small">
                      {{ item.title }}
                    </el-tag>
                  </template>
                </el-popover>
              </el-row>
            </template>

          </template>
        </el-calendar>
      </el-card>

    </div>
  </div>

</template>

<script>
import {ref} from 'vue'
import TOP_BAR from './TOP_BAR'

export default {
  name: "CALENDAR",
  mounted()
  {
    // let that = this
    //
    // console.log('CALENDAR')
    //
    // //axios请求后端
    //
    // that.axios({
    //   method: 'get',
    //   url: '/get_event',
    //   params: {
    //     username: window.localStorage.getItem('username'),
    //     permissions: window.localStorage.getItem('permissions')
    //     // token: window.sessionStorage.getItem('token')
    //   }
    // }).then(function (response)
    // {
    //   console.log('请求成功')
    //   console.log(response)
    //
    //   //将数据存入table data
    //   if (response.data.status !== 0)
    //   {
    //     that.calendar_data = []
    //     for (let i in response.data)
    //     {
    //       let temp = {}
    //
    //       temp.event_id = response.data[i].event_id
    //       temp.begin_time = response.data[i].begin_time
    //       temp.end_time = response.data[i].end_time
    //       temp.title = response.data[i].title
    //       temp.address = response.data[i].address
    //       temp.state = response.data[i].state
    //       temp.type = response.data[i].type
    //       temp.note = response.data[i].note
    //
    //       that.calendar_data.push(temp)
    //     }
    //   }
    // })
  },
  components:
      {
        // eslint-disable-next-line vue/no-unused-components
        TOP_BAR,
      },
  props:
      {
        user: String
      },
  data()
  {
    return {

      calendar: ref(),

      calendar_data: [
        {
          event_id: 'a',
          begin_time: '2022-06-03',
          end_time: '2016-06-03',
          title: 'test',
          address: 'No. 189, Grove St, Los Angeles',
          state: 0,
          note: 'my test',
        },
        {
          event_id: 'a',
          begin_time: '2022-06-03',
          end_time: '2016-06-03',
          title: 'test',
          address: 'No. 189, Grove St, Los Angeles',
          state: 0,
          note: 'my test',
        },
      ]

    }
  },
  methods:
      {
        selectDate(val)
        {
          this.calendar.value.selectDate(val)
        }
      },
}
</script>

<style lang="less" scoped>

* {
  margin: 0;
  padding: 0;
}

.is-selected {
  color: #1989fa;
}

.calendar {
  width: 1000px;
  height: 900px;

  position: absolute;

  left: 50%;
  top: 650px;

  transform: translate(-50%, -50%);

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


#container {
  position: relative;

  background-color: #B4E197;
  background-image: url('../assets/cross.png');

  height: 100%;
  min-height: 1287px;

  width: 100%;
  min-width: 1250px;
}

.center-div {
  margin: 0 auto;
}

</style>