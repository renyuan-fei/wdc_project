<template>
  <TEST></TEST>
  <GOOGLE_CALENDAR :data="this.data"></GOOGLE_CALENDAR>
</template>

<script>
import GOOGLE_CALENDAR from "./google_calendar"
import TEST from "./TEST(vue--express)"

export default {
  name: "TEST_PAGE",
  components:
      {
        // eslint-disable-next-line vue/no-unused-components
        TEST,
        // eslint-disable-next-line vue/no-unused-components
        GOOGLE_CALENDAR,
      },
  data()
  {
    return {
      data: [
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
  }
}
</script>

<style scoped>

</style>