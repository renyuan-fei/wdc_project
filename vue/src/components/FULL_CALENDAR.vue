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

        <full-calendar ref="fullCalendar" :options="calendarOptions" style="height: 800px"></full-calendar>

      </el-card>

    </div>
  </div>

</template>

<script>
// eslint-disable-next-line no-unused-vars
import TOP_BAR from './TOP_BAR'

// 
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import tippy from "tippy.js";
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/scale.css';

export default {
  name: "CALENDAR",
  mounted()
  {
    this.calendarApi = this.$refs.fullCalendar.getApi();

    let that = this

    console.log('CALENDAR')

    //axios

    that.axios({
      method: 'get',
      url: '/get_event',
      params: {
        username: window.localStorage.getItem('username'),
        permissions: window.localStorage.getItem('permissions')
        // token: window.sessionStorage.getItem('token')
      }
    }).then(function (response)
    {
      console.log('request successful')
      console.log(response)

      //table data
      if (response.data.status !== 0)
      {
        that.getReservationList(response.data)
      }
    })
  },
  components:
      {
        // eslint-disable-next-line vue/no-unused-components
        TOP_BAR,
        FullCalendar,
        // eslint-disable-next-line vue/no-unused-components
        dayGridPlugin,
        // eslint-disable-next-line vue/no-unused-components
        interactionPlugin
      },
  data()
  {
    return {
      COLOR: [' #f89898', ' #95d475', '  #eebe77'],
      TYPE: ['[PERSONAL]', '[PUBLIC]'],

      calendarOptions: {
        //   timeGridPlugin  
        height: 800,
        plugins: [dayGridPlugin, interactionPlugin],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGrid",
          // right: 'agendaWeek,dayGridWeek,dayGrid'
        },
        buttonText: {
          // 
          today: "TODAY",
          month: "MONTH",
          week: "WEEK",
          dayGrid: "DAY",
        },
        // allDaySlot: false,
        editable: true,
        selectable: true,
        navLinks: true,
        // displayEventEnd: true,//
        initialView: "dayGridMonth", // ，、
        dateClick: this.handleDateClick,
        // eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        // select: this.handleDateSelect,
        eventMouseEnter: this.mouseover,
        // timezone
        // 
        events: [],
        eventColor: "#f08f00", // 
        locale: "fr", // 
        weekNumberCalculation: "ISO", // 
        customButtons: {
          prev: { // this overrides the prev button
            text: "PREV",
            click: () =>
            {
              this.prev();
            }
          },
          next: { // this overrides the next button
            text: "PREV",
            click: () =>
            {
              this.next();
            }
          },
          today: {
            text: "TODAY",
            click: () =>
            {
              this.today();
            }
          }
        }
      },
    }
  },
  methods:
      {
        prev()
        {
          this.calendarApi.prev();
        },
        // 
        next()
        {
          this.calendarApi.next();
        },
        // 
        today()
        {
          this.calendarApi.today();
        },

        handleDateClick: function (arg)
        {
          this.$forceUpdate();
          console.log(arg, '1')
        },
        getShowTime(beginDate, endDate)
        {
          this.form.startDate = this.dealWithTime(beginDate);
          this.form.startTime = this.getHoursMin(beginDate);
          this.form.endDate = this.dealWithTime(endDate);
          this.form.endTime = this.getHoursMin(endDate);
        },
        getHoursMin(value)
        {
          return value.substring(11, 16);
        },
        dealWithTime(date)
        {
          console.log(/\d{4}-\d{1,2}-\d{1,2}/g.exec(date))

          return /\d{4}-\d{1,2}-\d{1,2}/g.exec(date)[0];

        },
        handleEvents(events)
        {
          console.log(events);
        },
        addDate(date, days)
        {
          var d = new Date(date);
          d.setDate(d.getDate() + days);
          var mon = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
          let endD = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
          return `${d.getFullYear()}-${mon}-${endD}`;
        },
        getTitle(date1, date2)
        {
          let start = date1.substring(11, 16);
          let end = date2.substring(11, 16);
          return `${start}~${end}`;
        },

        getReservationList(arrayData)
        {
          let newArr = [];
          this.subList = arrayData;
          arrayData.forEach((item) =>
          {
            newArr.push({
              start: this.dealWithTime(item.begin_time),
              end: this.addDate(this.dealWithTime(item.end_time), 1),
              color: this.COLOR[item.state],
              id: item.event_id,
              title: `${item.title}`,
              type: `${this.TYPE[item.type]}`,
              time: `${this.getTitle(item.begin_time, item.end_time)}`,
              Color: this.COLOR[item.state]
            })
          });
          this.calendarOptions.events = newArr;
        },

        mouseover(info)
        {
          let color = info.event._def.extendedProps.Color;
          console.log(color)
          let event = info.event._def
          console.log(event)
          console.log(event)
          tippy(info.el, {
            content: "<div style='width: 200px; border-radius: 1px'>" +
                "<div style='border-bottom: 1px solid #CCCCCC;line-height: 20px; color:" + color + "; padding:5px 10px;'>"
                + info.event.title + "</div>" +
                "<div style='color: #666666; padding:5px 10px 0px 10px'>TYPE:" + event.extendedProps.type + "</div>" +
                "<div style='color: #666666; padding:5px 10px;'>TIME:" + event.extendedProps.time + "</div>" +

                "</div>",
            theme: 'light',
            // trigger: 'click',
            interactive: true,
            placement: 'right-end',
            allowHTML: true,
          });
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