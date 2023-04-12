import { useCallback, useEffect, useState } from 'react'

export type GetDuration = () => number

export let useDuration = (pollInterval = 1_000): GetDuration => {
  let [startTime] = useState(Date.now())
  let [duration, setDuration] = useState(0)
  let getDuration = useCallback(() => duration, [duration])

  useEffect(() => {
    let id = setInterval(() => {
      let duration = Date.now() - startTime
      setDuration(duration)
    }, pollInterval)

    return () => clearInterval(id)
  }, [setDuration, startTime])

  return getDuration
}
