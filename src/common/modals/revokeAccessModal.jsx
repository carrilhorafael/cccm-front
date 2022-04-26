import React, { useContext } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { ChurchContext } from '../../context/ChurchContext'

export default function RevokeAccessModal({user, show, onHide}) {
  const { updateUser } = useContext(ChurchContext)

  const handleSubmit = () => updateUser(user.id, { user: { should_have_access: false } })

  return (
    <Modal size='lg' show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Revogar acesso</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className='description'>Você tem certeza? Ao clicar em Confirmar, o usuário perderá completamente o acesso ao sistema, mas seu registro não será apagado da tabela de membros da igreja.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}
