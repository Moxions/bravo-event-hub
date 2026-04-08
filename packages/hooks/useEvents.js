import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@bravo-event/firebase'

export function useEvents() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDocs(collection(db, 'events')).then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setEvents(data)
      setLoading(false)
    })
  }, [])

  return { events, loading }
}