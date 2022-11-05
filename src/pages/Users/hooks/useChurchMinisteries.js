import { useChurchContext } from "context/ChurchContext";
import { useEffect, useState } from "react";
import  { getChurchMinisteries } from 'services/Ministery.service'

export default function useChurchMinisteries() {
  const { church } = useChurchContext()
  const [ministeries, setMinisteries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getChurchMinisteries(church.id)
    .then(({ data }) => {
      setMinisteries(data)
      setLoading(false)
    })
  }, [church])

  return { ministeries, loading }
}
