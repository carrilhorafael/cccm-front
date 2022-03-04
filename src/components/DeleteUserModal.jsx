import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function DeleteUserModal({show, onHide}) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Excluir usuário</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Tem certeza que deseja deletar o membro?

          Caso este membro tenha acesso ao sistema, o acesso será revogado!
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary">Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}
