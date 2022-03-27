import React, { useContext, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { ChurchesContext } from '../../context/ChurchesContext'
import MultiSelect from '../multiSelect'


export default function MinisteriesAssignModal ({show, user, onHide}) {
  const { getMinisteriesItems } = useContext(ChurchesContext)
  const [ministeriesIds, setMinisteriesIds] = useState([])
  const onChangeMinisteries = ministeryId => {
    if (ministeriesIds.includes(ministeryId))
      setMinisteriesIds(ministeriesIds.filter(ministeriesIds => ministeriesIds !== ministeryId))
    else
      setMinisteriesIds([...ministeriesIds, ministeryId])
  }

  const assignMinisteries = () => {
    onHide()
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Alocar membro em ministério</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className='description'>
          Adicione o membro {user.name} em seus ministérios:
        </p>
        <div className='multiSelectWrapper'>
          <MultiSelect defaultOptionPlaceholder="Selecione os ministérios do usuário" initialOptions={getMinisteriesItems()} clearValues={() => setMinisteriesIds([])} onChange={onChangeMinisteries}/>
        </div>

      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={assignMinisteries}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}
