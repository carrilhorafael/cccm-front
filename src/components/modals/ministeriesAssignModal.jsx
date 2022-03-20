import React, { useContext, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { ChurchContext } from '../../context/ChurchContext'
import MultiSelect from '../multiSelect'


export default function MinisteriesAssignModal ({show, onHide}) {
  const { resource, setResource, getMinisteriesItems } = useContext(ChurchContext)
  const [ministeriesIds, setMinisteriesIds] = useState([])
  const onChangeMinisteries = ministeryId => {
    if (ministeriesIds.includes(ministeryId))
      setMinisteriesIds(ministeriesIds.filter(ministeriesIds => ministeriesIds !== ministeryId))
    else
      setMinisteriesIds([...ministeriesIds, ministeryId])
  }

  const assignMinisteries = () => {
    console.log('teste')
    onHide()
  }

  const handleHide = () => {
    setResource({})
    onHide()
  }

  return (
    <Modal show={show} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Alocar membro em ministério</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className='description'>
          Adicione o membro {resource.name} em seus ministérios:
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
