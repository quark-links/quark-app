import Vue from 'vue'
import { DateTime } from 'luxon'

Vue.filter('humanDate', (date: string) => {
  return DateTime.fromISO(date).toLocaleString()
})
