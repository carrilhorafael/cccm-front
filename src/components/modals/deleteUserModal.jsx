import React, { useContext } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { ChurchContext } from '../../context/ChurchContext'
import { deleteUser } from '../../services/Api.service'

export default function DeleteUserModal({show, onHide, onConfirm}) {
  const { resource, setResource, handleDestroyResource } = useContext(ChurchContext)

  const deleteMember = () => {
    deleteUser(resource.id)
      .then(() => {
        handleDestroyResource()
        setResource({})
        onHide()
      })
  }

  const handleHide = () => {
    setResource({})
    onHide()
  }

  return (
    <Modal show={show} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Excluir usuário</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className='description'>
          Tem certeza que deseja deletar o membro? Essa ação <b>não</b> é reversível.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={deleteMember}>Excluir</Button>
      </Modal.Footer>
    </Modal>
  )
}
