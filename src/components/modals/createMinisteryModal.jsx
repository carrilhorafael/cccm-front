import React, { useContext, useRef, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { ChurchContext } from '../../context/ChurchContext'
import { postMinistery } from '../../services/Api.service'
import './styles.css'

export default function CreateMinisteryModal({show, onHide}) {
  const { church, handleCreateResource } = useContext(ChurchContext)
  const name = useRef()
  const description = useRef()

  const handleSubmit = () => {
    const ministeryParams = {
      ministery: {
        name: name.current.value,
        description: description.current.value
      }
    }
    postMinistery(church.id, ministeryParams)
      .then((data) => {
        handleCreateResource(data, 'ministery')
        onHide()
      })
  }

  const handleHide = () => {
    onHide()
  }

  return (
    <Modal show={show} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Criar ministério</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='ministeryManagement'>
          <fieldset>
            <label>Nome do ministério: </label>
            <input type="text" ref={name}/>
          </fieldset>
          <fieldset>
            <label>Descrição do ministério: </label>
            <textarea ref={description}/>
          </fieldset>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}
