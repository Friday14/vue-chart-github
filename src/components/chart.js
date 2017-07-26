import moment from 'moment'

export default {
  mounted() {
    this.initfakeData();

    console.log(this.points)

    this.lastDate = moment();
    let days = moment().diff(this.firstDate, 'days');
    this.weeks = this.range(days / 7);

    //  depth
    this.average = this.points.reduce(function (sum, current) {
      return sum + current.data;
    }, 0) / this.points.length;


    this.initLineMonth();
  },
  data() {
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
      lineMonth: [],
      firstDate: null,
      lastDate: null,
    }
  },
  methods: {
    getDataTooltip(day, week) {
      let point = this.getPoint(day, week);
      let currentDay = this.getSelectDay(day, week);
      let str = '';
      str = point ? point.data : 0;
      return `
      <span style="font-size:15px;"> ${currentDay.format('YY-MM-DD')}</span> <br> Чего-то там: ${str}
      `;
    },

    getPoint(day, week) {
      let currentDay = this.getSelectDay(day, week);
      let point = this.points.filter(item => item.date.format('YMD') == currentDay.format('YMD'));
      return (point[0]) ? point[0] : null
    },

    getSelectDay(day, week) {
      return moment(this.firstDate).add((week) * 7 + day, 'days');
    },
    initfakeData() {
      this.firstDate = moment().subtract(1, 'year');
      for (let i = 1; i <= 32; i++) {
        let date = moment(this.firstDate).add(i, 'days');
        let obj = {
          date: date,
          data: Math.round(Math.random() * 215)
        };
        this.points.push(obj)
      }
    },
    rectStyle(point) {
      if (!point)
        return { fill: 'rgb(235, 237, 240)' };
      if (point.data > this.average)
        return {
          fill: 'rgb(25, 97, 39)'
        };
      if (point.data < this.average)
        return {
          fill: 'rgb(198, 228, 139)'
        }
    },
    range(x) {
      x = parseInt(x);
      let arr = [];
      for (let i = 1; i <= x; i++)
        arr.push(i)
      return arr;
    },
    countDays(weekNumber) {
      if (weekNumber !== this.weeks[this.weeks.length - 1])
        return 7;
      else
        return moment().weekday() + 1
    },
    distanceRect(i, wh) {
      return (wh + 1) * i;
    },
    log(text) {
      console.log(text)
    },

    initLineMonth() {
      let dayNext = this.firstDate.clone();
      console.log(dayNext.unix(), this.lastDate.unix())
      while (dayNext.unix() < this.lastDate.unix()) {
        dayNext.add(1, 'month');
        this.lineMonth.push({
          name: dayNext.format('MMM')
        });
      }
      console.log(this.lineMonth)
    },
    getNameDayOfNumber(day) {
      return moment().weekday(day).format('ddd')
    }
  }
}
