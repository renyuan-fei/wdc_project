<template>
  <vue-google-calendar :data="calendarData" class="calendar"/>
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
      calendarData: []
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