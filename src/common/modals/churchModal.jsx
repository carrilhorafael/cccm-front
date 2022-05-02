import React, { useRef } from 'react'
import { Modal, Button } from 'react-bootstrap'

import './styles.css'

export default function ChurchModal({resource, show, onUpdate, onCreate, onHide}) {

  const name = useRef()
  const location = useRef()

  const handleSubmit = async () => {
    const churchParams = {
      church: {
        name: name.current.value,
        location: location.current.value
      }
    }

    if (resource) await onUpdate(churchParams)
    else await onCreate(churchParams)
    onHide()
  }

  return (
    <Modal size="lg" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{resource ? "Editar uma sede" : "Criar uma nova sede"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='churchManagement'>
          <fieldset>
            <label>Nome da sede: </label>
            <input type="text" ref={name} defaultValue={resource && resource.name}/>
          </fieldset>
          <fieldset>
            <label>Endereço da nova sede: </label>
            <textarea ref={location} defaultValue={resource && resource.location}/>
          </fieldset>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}
