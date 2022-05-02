import React, { useContext, useRef } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { ChurchContext } from '../../context/ChurchContext'

export default function ProselyteFormModal ({ resource, show, onHide }) {
  const { createProselyte, updateProselyte } = useContext(ChurchContext)

  const name = useRef(null)
  const phone = useRef(null)
  const proselytized_at = useRef(null)

  const handleSubmit = async () => {
    const proselyteData = {
      proselyte: {
        name: name.current.value,
        phone: phone.current.value,
        proselytized_at: proselytized_at.current.value
      }
    }
    if (resource) await updateProselyte(resource.id, proselyteData)
    else await createProselyte(proselyteData)

    onHide()
  }

  return (
    <Modal size="lg" show={show} onHide={onHide} >
      <Modal.Header closeButton>
        <Modal.Title>{resource ? "Editar um convertido" : "Criar um novo convertido"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='churchManagement'>
          <fieldset>
            <label>Nome:</label>
            <input ref={name} defaultValue={resource && resource.name}/>
          </fieldset>
          <fieldset>
            <label>Telefone:</label>
            <input ref={phone} defaultValue={resource && resource.phone}/>
          </fieldset>
          <fieldset>
            <label>Convertido em:</label>
            <input type='date' ref={proselytized_at} defaultValue={resource && resource.proselytized_at}/>
          </fieldset>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}
