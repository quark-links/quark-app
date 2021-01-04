import Vue from 'vue'
import { DateTime } from 'luxon'

Vue.filter('humanDate', (date: string, relative = false) => {
  const dt = DateTime.fromISO(date)

  if (relative) {
    return `${dt.toRelative()} (${dt.toLocaleString()})`
  }

  return dt.toLocaleString()
})
