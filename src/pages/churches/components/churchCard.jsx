import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function ChurchCard ({church}) {
  const history = useHistory()
  const getLeadersNames = () => {
    return church.users.filter(user => user.is_leader).map(leader => leader.name).join(", ")
  }

  return (
    <div className="churchCard">
      <h2>{church.name}</h2>
      <h3>{getLeadersNames()}</h3>
      <p>{church.users.length} membros</p>
      <p>{church.ministeries.length} ministérios</p>
      <Button variant='primary' onClick={() => history.push(`/church?id=${church.id}`)}> Ver mais </Button>
    </div>
  )

}
