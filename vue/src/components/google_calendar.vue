<template>
  <vue-google-calendar :data="calendarData" :precision="Precision" :selected="choose_date" class="calendar"/>
</template>

<script>
import VueGoogleCalendar from "vue-google-calendar/src/vue-google-calendar"

export default {
  name: "google_calendar",
  components: {VueGoogleCalendar},
  props: {
    precision: {type: Number, default: 30},
    data: Array,
    selected: Date
  },
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
              start: {dateTime: "2022-05-31T10:00:00-04:00"},
              end: {dateTime: "2022-05-31T11:00:00-04:00"}
            }
          ]
        }
      ],
      choose_date: this.props.selected,
      Precision: this.props.precision
    }
  },
}
</script>

<style scoped>

.calendar
{
  width: 1200px;
  height: 1000px;
}

</style>