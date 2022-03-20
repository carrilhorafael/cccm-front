import React, { useContext, useRef, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { ChurchContext } from '../../context/ChurchContext'
import { updateMinistery } from '../../services/Api.service'
import './styles.css'

export default function UpdateMinisteryModal({show, onHide}) {
  const { resource, setResource, handleUpdateResource } = useContext(ChurchContext)
  const name = useRef()
  const description = useRef()

  const handleSubmit = () => {
    const ministeryParams = {
      ministery: {
        name: name.current.value,
        description: description.current.value
      }
    }
    updateMinistery(resource.id, ministeryParams)
      .then((data) => {
        handleUpdateResource(data, 'church')
        setResource({})
        onHide()
      })
  }

  const handleHide = () => {
    setResource({})
    onHide()
  }

  return (
    <Modal show={show} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar ministério</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='ministeryManagement'>
          <fieldset>
            <label>Nome do ministério: </label>
            <input type="text" defaultValue={!!resource && resource.name} ref={name}/>
          </fieldset>
          <fieldset>
            <label>Descrição do ministério: </label>
            <textarea ref={description} defaultValue={!!resource && resource.description}/>
          </fieldset>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}
