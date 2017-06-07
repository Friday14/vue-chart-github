<template>
  <div>
    <div class="chart-dashboard">
      <svg width="100%" height="100%"
           xmlns="http://www.w3.org/2000/svg">
        <svg v-for="week in weeks">
          <rect
            v-for="day in countDays(week)"
            v-tooltip.top-center="getDataTooltip(day,week)"
            :x="distanceRect(week, rect.width)"
            :y="distanceRect(day, rect.height)"
            :width="rect.width"
            :height="rect.height"
            :style="rectStyle(getPoint(day,week))"
          ></rect>
        </svg>
      </svg>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    mounted(){
      this.firstDate = moment().subtract(1, 'year');
      for (let i = 1; i <= 280; i++) {
        let date = moment(this.firstDate).add(i, 'days');
        let obj = {
          date: date,
          data: Math.round(Math.random() * 215)
        };
        this.points.push(obj)
      }
      console.log(this.points)
      this.lastDate = moment();
      let days = moment().diff(this.firstDate, 'days');
      this.weeks = this.range(days / 7);

      this.average = this.points.reduce(function (sum, current) {
          return sum + current.data;
        }, 0) / this.points.length;



    },
    data(){
      return {
        points: [
          {
            date: moment(),
            data: 5
          },
          {
            date: moment().subtract(1, 'day'),
            data: 2,
          },
          {
            date: moment().subtract(12, 'day'),
            data: 12,
          }
        ],
        average: null,
        rect: {
          width: 10,
          height: 10,
        },
        days: [1, 2, 3, 4, 5, 6, 7],
        weeks: [0, 1, 2],
        firstDate: null,
        lastDate: null,
      }
    },
    methods: {
      getDataTooltip(day, week){
        let point = this.getPoint(day, week);
        let currentDay = this.getSelectDay(day, week);
        let str = '';
        str = point ? point.data : 0;
        return currentDay.format('YY-MM-DD') + ' data: <b>' + str + '</b>';
      },
      getPoint(day, week) {
        let currentDay = this.getSelectDay(day, week);
        let point = this.points.filter(item => item.date.format('YMD') == currentDay.format('YMD'));
        return (point[0]) ? point[0] : null
      },
      getSelectDay(day, week)
      {
        return moment(this.firstDate).add((week) * 7 + day, 'days');
      },
      rectStyle(point){
        if (!point)
          return {fill: 'rgb(235, 237, 240)'};
        if (point.data > this.average)
          return {
            fill: 'rgb(25, 97, 39)'
          };
        if (point.data < this.average)
          return {
            fill: 'rgb(198, 228, 139)'
          }
      },
      range(x){
        x = parseInt(x);
        let arr = [];
        for (let i = 1; i <= x; i++)
          arr.push(i)
        return arr;
      },
      countDays(weekNumber)
      {
        if (weekNumber !== this.weeks[this.weeks.length - 1])
          return 7;
        else
          return moment().weekday() + 1
      },
      distanceRect(i, wh)
      {
        return (wh + 1) * i;
      }
    }
  }
</script>

<style>
  .chart-dashboard {
    width: 100%;
    height: 300px;
    background: black;
    text-align: left;
  }

  rect {
    fill: rgb(235, 237, 240);
  }

  .tooltip {
    font-size: 12px;
    display: block !important;
    pointer-events: none;
    padding: 14px;
    z-index: 10000;
  }

  .tooltip .tooltip-inner {
    background: black;
    color: white;
    padding: 10px 4px 10px;
  }

  .tooltip tooltip-arrow {
    display: none;
  }

  .tooltip[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  .tooltip[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
</style>
