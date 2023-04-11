import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import {
  useAddLogMutation,
  useGetHistoryState,
  useUpdateLogMutation,
} from '@clients'
import { getUserId, getIsAsleep, getMostRecentLog } from '@store'
import { getRandomEmoji } from '../emoji'
import styles from './toggle.module.scss'

export let Toggle = () => {
  let [addLog, addState] = useAddLogMutation()
  let [updateLog, updateState] = useUpdateLogMutation()
  let { data: logs = [] } = useGetHistoryState(undefined)
  let isAsleep = getIsAsleep(logs)
  let isLoading = addState.isLoading || updateState.isLoading
  let userId = useSelector(getUserId)
  let recentLogId = getMostRecentLog(logs)?.id

  let onClick = useCallback(() => {
    if (isAsleep) {
      addLog({
        id: `${Date.now()}`,
        whom: userId,
        up: Date.now(),
        down: null,
        emoji: getRandomEmoji(),
      })
    } else {
      updateLog({
        id: recentLogId!,
        down: Date.now(),
      })
    }
  }, [addLog, updateLog, recentLogId, userId, isAsleep])

  return (
    <button
      className={styles.button}
      type="button"
      onClick={onClick}
      disabled={isLoading}
    >
      {isAsleep ? 'Wake up' : 'Go to sleep'}
    </button>
  )
}
