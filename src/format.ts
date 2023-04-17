export let formatTime = (time: Date | number): string => {
  if (typeof time === 'number') time = new Date(time)
  let hh = `${time.getHours()}`.padStart(2, '0')
  let mm = `${time.getMinutes()}`.padStart(2, '0')

  return `${hh}:${mm}`
}
