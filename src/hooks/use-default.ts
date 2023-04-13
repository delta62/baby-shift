import { useEffect, useState } from 'react'

export let useDefault = <T>(generator: () => T) => {
  let [val, setVal] = useState<T>()
  useEffect(() => {
    setVal(generator()), [setVal]
  }, [])

  return val
}
