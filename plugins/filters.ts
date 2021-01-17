import Vue from 'vue'
import { DateTime } from 'luxon'
import urljoin from 'url-join'

Vue.filter('humanDate', (date: string, relative = false) => {
  if (!date) { return '' }

  const dt = DateTime.fromISO(date)

  if (relative) {
    return `${dt.toRelative()} (${dt.toLocaleString()})`
  }

  return dt.toLocaleString()
})

Vue.filter('fullUrl', (link: string) => {
  return urljoin(process.env.API_URL || 'https://vh7.uk', link)
})
