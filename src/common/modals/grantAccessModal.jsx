import React, { useContext, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { ChurchContext } from '../../context/ChurchContext'
import Checkbox from '../checkbox'
import './styles.css'

export default function GrantAccessModal({user, show, onHide}) {
  const { updateUser } = useContext(ChurchContext)
  const [isLeader, setIsLeader] = useState(false)

  const grantAccess = async () => {
    const accessParams = { user: { should_have_access: true, is_leader: isLeader } }
    await updateUser(user.id, accessParams)
    onHide()
  }

  return (
    <Modal size='lg' show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Conceder acesso</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className='description'>Ao clicar em Confirmar você irá conceder acesso ao sistema para o usuário <b>{user.name}</b>. Selecione se deseja que o usuário seja administrador do sistema: </p>
        <div className='checkboxGrantAccess'>
          <Checkbox id="isLeader" checked={isLeader} handleToggle={() => setIsLeader(!isLeader)}/>
          <label for="isLeader">Este usuário é administrador do sistema?</label>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={grantAccess}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}
