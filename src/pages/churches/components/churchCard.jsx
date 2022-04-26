import React from 'react'
import { Button } from 'react-bootstrap'
import IconButton from '../../../common/iconButton'

export default function ChurchCard ({church, onNavigate, onEdit, onDelete}) {
  const getLeadersNames = () => {
    return "Ronaldo, Jorge"
  }

  return (
    <div className="churchCard">
      <div className='buttonsWrapper'>
        <IconButton icon="fa-solid fa-pen" onClick={onEdit}/>
        <IconButton icon="fa-solid fa-trash" onClick={onDelete}/>
      </div>
      <h2>{church.name}</h2>
      {/* <h3>{getLeadersNames()}</h3> */}
      <p>{church.users_count} membro{church.users_count === 1 ? '' : 's'}</p>
      <p>{church.ministeries_count} ministério{church.ministeries_count === 1 ? '' : 's'}</p>
      <Button variant='primary' onClick={onNavigate}> Ver mais </Button>
    </div>
  )

}
