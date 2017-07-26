<template>
  <div>
    <div class="chart-dashboard">

      <div class="line-month">
        <template v-for="month, key in lineMonth">
          <div class="month" :style="{left: `${46 * key}px`}">
            {{ month.name }}
          </div>
        </template>
      </div>

      <div class="line-day">
        <div v-for="day in 6" class="day">
          <template v-if="(day) % 2">
            {{ getNameDayOfNumber(day) }}

          </template>
          <template v-else>
            <pre></pre>
          </template>
        </div>
      </div>

      <svg width="92%" style="padding: 6px" height="100%" xmlns="http://www.w3.org/2000/svg">
        <template v-for="week in weeks">

          <template v-for="day in countDays(week)">
            <!-- {{ lineMonth.push({}) }} -->
            <rect v-tooltip.top-center="getDataTooltip(day,week)" :x="distanceRect(week, rect.width)" :y="distanceRect(day, rect.height)" :width="rect.width" :height="rect.height" :style="rectStyle(getPoint(day,week))"></rect>
          </template>
        </template>
      </svg>
    </div>
  </div>
</template>

<script>
import '../assets/style.css'
import mixin from './chart.js'
export default {
  mixins: [mixin],
}

// @TODO Линия дней, начинать с сегоднешнего дня.
</script>
