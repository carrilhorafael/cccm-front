import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { grantUserAccess } from '../../services/Api.service'
import Checkbox from '../checkbox'
import './styles.css'

export default function GrantAccessModal({show, onHide, resource, onConfirm}) {
  const [isLeader, setIsLeader] = useState(false)

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Conceder acesso</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className='description'>Ao clicar em Confirmar você irá conceder acesso ao sistema para o usuário <b>{resource.name}</b>. Selecione se deseja que o usuário seja administrador do sistema: </p>
        <div>
          <Checkbox id="isLeader" checked={isLeader} handleToggle={() => setIsLeader(!isLeader)}/>
          <label for="isLeader">Este usuário é administrador do sistema?</label>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={() => onConfirm({is_leader: isLeader})}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}
