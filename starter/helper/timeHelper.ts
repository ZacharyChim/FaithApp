import moment from 'moment'

type ITimeFormat = 'YYYY-MM-DD HH:mm' | 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' | 'HH:mm'

export const convertTimeString = (time: string | Date, format: ITimeFormat) => {
  return moment(time).format(format)
}

export const getMonthDateRange = (year: number, month: number) => {
  // month in moment is 0 based, so 9 is actually october, subtract 1 to compensate
  // array is 'year', 'month', 'day', etc
  var startDate = moment([year, month - 1])

  // Clone the value before .endOf()
  var endDate = moment(startDate).endOf('month')

  // make sure to call toDate() for plain JavaScript date type
  return { start: startDate.toDate(), end: endDate.toDate() }
}

export const getHorsDiff = (start: string | Date, end: string | Date) => {
  const duration = moment.duration(moment(end).diff(start))
  return duration.asHours()
}