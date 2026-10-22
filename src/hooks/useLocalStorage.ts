import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  const resetValue = () => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.error(`Error resetting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setStoredValue, resetValue]
}

