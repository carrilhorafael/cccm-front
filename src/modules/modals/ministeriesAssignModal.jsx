import React, { useContext, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Button from '../../atomics/Button'
import { ChurchContext } from '../../context/ChurchContext'
import MultiSelect from '../../atomics/MultiSelect'


export default function MinisteriesAssignModal ({show, user, onHide}) {
  const { ministeries } = useContext(ChurchContext)
  const ministeriesItems = ministeries.map(ministery => ({ label: ministery.name, value: ministery.id }))

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
    <Modal size='lg' show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Alocar membro em ministério</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className='description'>
          Adicione o membro {user.name} em seus ministérios:
        </p>
        <div className='multiSelectWrapper'>
          <MultiSelect defaultOptionPlaceholder="Selecione os ministérios do usuário" initialOptions={ministeriesItems} clearValues={() => setMinisteriesIds([])} onChange={onChangeMinisteries}/>
        </div>

      </Modal.Body>

      <Modal.Footer>
        <Button theme="primary" onClick={assignMinisteries} title='Confirmar'/>
      </Modal.Footer>
    </Modal>
  )
}
