import React, { useContext, useEffect, useRef, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { ChurchesContext } from '../../context/ChurchesContext'
import Checkbox from '../checkbox'
import './styles.css'

export default function ChurchModal({resource, show, onHide}) {
  const { createChurch, updateChurch } = useContext(ChurchesContext)
  const name = useRef()
  const location = useRef()

  const handleSubmit = async () => {
    const churchParams = {
      church: {
        name: name.current.value,
        location: location.current.value
      }
    }

    console.log(resource)
    if (resource) await updateChurch(resource.id, churchParams)
    else await createChurch(churchParams)
    onHide()
  }

  return (
    <Modal show={show} onHide={onHide}>
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
