<template>
  <TEST></TEST>

  <div>

    <a class="twitter-share-button"
       data-size="Default"
       href=" ">
      Twitter
    </a>
    <div class="fb-login-button" data-auto-logout-link="false" data-button-type="login_with" data-layout="rounded"
         data-size="small" data-use-continue-as="false" data-width=""></div>

  </div>

  <!--  <vue-google-calendar :data="calendarData"/>-->
</template>

<script>

window.twttr = (function (d, s, id)
{
  var js, fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function (f)
  {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"));


import VueGoogleCalendar from "vue-google-calendar/src/vue-google-calendar"
import TEST from "./TEST(vue--express)"

export default {
  name: "TEST_PAGE",
  components:
      {
        // eslint-disable-next-line vue/no-unused-components
        TEST,
        // eslint-disable-next-line vue/no-unused-components
        VueGoogleCalendar,
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
      choose_date: '',
      Precision: 30,
    }
  },
  methods:
      {
        select()
        {
          this.date = new Date()
        }
      }
}
</script>

<style scoped>

</style>