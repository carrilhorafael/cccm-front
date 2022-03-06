import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function DeleteUserModal({show, onHide, onConfirm}) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Excluir usuário</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className='description'>
          Tem certeza que deseja deletar o membro? Essa ação <b>não</b> é reversível.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={onConfirm}>Excluir</Button>
      </Modal.Footer>
    </Modal>
  )
}
