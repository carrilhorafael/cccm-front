import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { ChurchesContext } from '../../../context/ChurchesContext'

export default function ChurchCard ({church}) {
  const { setChurch } = useContext(ChurchesContext)
  const history = useHistory()
  const getLeadersNames = () => {
    return "Ronaldo, Jorge"
  }

  const goToPage = () => {
    setChurch(church)
    history.push(`church/general?church_id=${church.id}`)
  }

  return (
    <div className="churchCard">
      <h2>{church.name}</h2>
      {/* <h3>{getLeadersNames()}</h3> */}
      <p>{church.users_count} membros</p>
      <p>{church.ministeries_count} ministérios</p>
      <Button variant='primary' onClick={goToPage}> Ver mais </Button>
    </div>
  )

}
