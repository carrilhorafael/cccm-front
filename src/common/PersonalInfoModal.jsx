import React from 'react'
import { Modal } from 'react-bootstrap'

export default function PersonalInfoModal({user, show, onHide}) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Informações do usuário</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>CPF: {user.cpf}</p>
        <p>RG: {user.rg}</p>
        <p>Email: {user.email}</p>
        <p>Telefone: (21)99999-9999</p>
      </Modal.Body>
    </Modal>
  )
}
