import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function AccessGarantiedModal({show, onHide}) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Conceder acesso</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Ao conceder acesso à este usuário, ele receberá uma senha provisória por email e poderá logar no sistema com o seguinte cargo:
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary">Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}
