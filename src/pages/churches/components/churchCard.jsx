import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import IconButton from '../../../common/iconButton'
import { ChurchesContext } from '../../../context/ChurchesContext'

export default function ChurchCard ({church, onEdit, onDelete}) {
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
      <div className='buttonsWrapper'>
        <IconButton icon="fa-solid fa-pen" onClick={onEdit}/>
        <IconButton icon="fa-solid fa-trash" onClick={onDelete}/>
      </div>
      <h2>{church.name}</h2>
      {/* <h3>{getLeadersNames()}</h3> */}
      <p>{church.users_count} membro{church.users_count === 1 ? '' : 's'}</p>
      <p>{church.ministeries_count} ministério{church.ministeries_count === 1 ? '' : 's'}</p>
      <Button variant='primary' onClick={goToPage}> Ver mais </Button>
    </div>
  )

}
