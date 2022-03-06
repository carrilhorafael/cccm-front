import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function RevokeAccessModal({show, onHide, onConfirm}) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Revogar acesso</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className='description'>Você tem certeza? Ao clicar em Confirmar, o usuário perderá completamente o acesso ao sistema, mas seu registro não será apagado da tabela de membros da igreja.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={onConfirm}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}
