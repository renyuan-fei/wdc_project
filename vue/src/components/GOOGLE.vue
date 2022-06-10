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

        <vue-google-calendar :data="calendarData" class="calendar_size"/>

      </el-card>

    </div>
  </div>
</template>

<script>
import TOP_BAR from './TOP_BAR'
import VueGoogleCalendar from "vue-google-calendar/src/vue-google-calendar"

export default {
  name: "GOOGLE",
  components:
      {
        // eslint-disable-next-line vue/no-unused-components
        VueGoogleCalendar,
        // eslint-disable-next-line vue/no-unused-components
        TOP_BAR
      },
  mounted()
  {
    let that = this;

    that.axios({
      method: 'get',
      url: '/calendar_event',
      params: {
        username: window.sessionStorage.getItem('username'),
        token: window.sessionStorage.getItem('token')
      }
    }).then(function (response)
    {
      console.log('')
      console.log(response)

      //table data
      this.calendarData = response.data

    }).catch(function (error)
    {
      console.log('')
      console.log(error.message)
    })
  },
  data()
  {
    return {
      calendarData: [
        {
          id: "test-user2e@test-email.ai",
          summary: "description ....",
          color: "#a5e9e1",
          dates: [
            {
              id: "7413lef3g1hip8hvk6tbipkqrq_20200917T140000Z",
              summary: "test\n2020-09-17T10:00:00-04:40",
              start: {dateTime: "2020-09-17T10:00:00-05:40"},
              end: {dateTime: "2020-09-17T11:00:00-07:40"}
            }
          ]
        },
        {
          id: "test-user2e@test-email.ai",
          summary: "description ....",
          color: "#cd74e6",
          dates: [
            {
              id: "7413lef3g1hip8hvk6tbipkqrq_20200917T140000Z",
              summary: "test\n2020-09-17T10:00:00-04:40",
              start: {dateTime: "2020-09-17T10:00:00-05:40"},
              end: {dateTime: "2020-09-17T11:00:00-07:40"}
            }
          ]
        },
        {
          id: "test-user2e@test-email.ai",
          summary: "description ....",
          color: "#cd7",
          dates: [
            {
              id: "7413lef3g1hip8hvk6tbipkqrq_20200917T140000Z",
              summary: "test\n2020-09-16T10:03:00-08:37",
              start: {dateTime: "2020-09-16T10:03:00-07:37"},
              end: {dateTime: "2020-09-16T11:03:00-08:37"}
            }
          ]
        },
        {
          id: "test-user2e@test-email.ai",
          summary: "description ....",
          color: "#388186",
          dates: [
            {
              id: "7413lef3g1hip8hvk6tbipkqrq_20200917T140000Z",
              summary: "test\n2020-09-18T10:04:00-06:30",
              start: {dateTime: "2020-09-18T10:04:00-04:30"},
              end: {dateTime: "2020-09-18T11:04:00-06:30"}
            }
          ]
        }
      ],
    }
  }
}
</script>

<style lang="less" scoped>

* {
  margin: 0;
  padding: 0;
}

.card-header {
  justify-content: space-between;
  align-items: center;

  color: #E6BA95;
  font-weight: bold;
  font-size: 40px;
}

.calendar {

  width: 80%;
  height: 900px;

  max-width: 1450px;
  min-width: 1050px;

  position: absolute;

  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);

  border-radius: 20px;

  text-align: center;
}

.calendar_size {
  position: absolute;
  left: 0;
  transform: translate(0, -3%);

  width: 100%;
  height: 850px;
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