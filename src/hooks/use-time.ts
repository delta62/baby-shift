import { useCallback, useEffect, useState } from 'react'

export type GetTime = () => Date

export let useTime = (pollInterval = 1_000): GetTime => {
  let [time, setTime] = useState(new Date())
  let getTime = useCallback(() => time, [time])

  useEffect(() => {
    let id = setInterval(() => {
      setTime(new Date())
    }, pollInterval)
    return () => clearInterval(id)
  }, [setTime])

  return getTime
}
