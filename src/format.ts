export let formatTime = (time: Date | number): string => {
  if (typeof time === 'number') time = new Date(time)
  let hh = `${time.getHours()}`.padStart(2, '0')
  let mm = `${time.getMinutes()}`.padStart(2, '0')

  return `${hh}:${mm}`
}

export let timestampToFormTime = (timestamp: Date | number) => {
  if (typeof timestamp === 'number') {
    timestamp = new Date(timestamp)
  }

  let yyyy = timestamp.getFullYear()
  let MM = `${timestamp.getMonth() + 1}`.padStart(2, '0')
  let dd = `${timestamp.getDate()}`.padStart(2, '0')
  let hh = `${timestamp.getHours()}`.padStart(2, '0')
  let mm = `${timestamp.getMinutes()}`.padStart(2, '0')
  let ss = `${timestamp.getSeconds()}`.padStart(2, '0')

  return `${yyyy}-${MM}-${dd}T${hh}:${mm}:${ss}`
}
