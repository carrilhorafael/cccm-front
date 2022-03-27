import React, { useContext, useRef, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { ChurchesContext } from '../../context/ChurchesContext'
import './styles.css'

export default function MinisteryModal({resource, show, onHide}) {
  const { createMinistery, updateMinistery } = useContext(ChurchesContext)
  const name = useRef()
  const description = useRef()

  const handleSubmit = async () => {
    const ministeryParams = {
      ministery: {
        name: name.current.value,
        description: description.current.value
      }
    }

    if (resource) await updateMinistery(ministeryParams)
    else await createMinistery(ministeryParams)
    onHide()
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Criar ministério</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='ministeryManagement'>
          <fieldset>
            <label>Nome do ministério: </label>
            <input type="text" ref={name} defaultValue={resource && resource.name}/>
          </fieldset>
          <fieldset>
            <label>Descrição do ministério: </label>
            <textarea ref={description} defaultValue={resource && resource.description}/>
          </fieldset>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}