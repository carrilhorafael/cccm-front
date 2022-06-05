import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap'
import Button from '../../atomics/Button'
import { ChurchContext } from '../../context/ChurchContext'

export default function DeleteUserModal({user, show, onHide}) {
  const { destroyUser } = useContext(ChurchContext)

  const onConfirm = async () => {
    await destroyUser(user.id)
    onHide()
  }

  return (
    <Modal size='lg' show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Excluir usuário</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className='description'>
          Tem certeza que deseja deletar o membro? Essa ação <b>não</b> é reversível.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button theme="negative" onClick={onConfirm} title='Excluir' />
      </Modal.Footer>
    </Modal>
  )
}
