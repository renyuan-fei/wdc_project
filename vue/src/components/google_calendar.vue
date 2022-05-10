<template>
  <vue-google-calendar :data="calendarData"/>
</template>

<script>
import VueGoogleCalendar from "vue-google-calendar/src/vue-google-calendar"

export default {
  name: "google_calendar",
  components: {VueGoogleCalendar},
  data()
  {
    return {
      calendarData: [
        {
          id: "test-user2e@test-email.ai",
          summary: "description ....",
          color: "#cd74e6",
          dates: [
            {
              id: "7413lef3g1hip8hvk6tbipkqrq_20200917T140000Z",
              summary: "event name",
              start: {dateTime: "2020-09-17T10:00:00-04:00"},
              end: {dateTime: "2020-09-17T11:00:00-04:00"}
            }
          ]
        }
      ]
    }
  },
}
</script>

<style scoped>

</style>