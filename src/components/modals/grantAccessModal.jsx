import React, { useContext, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { ChurchContext } from '../../context/ChurchContext'
import { grantUserAccess } from '../../services/Api.service'
import Checkbox from '../checkbox'
import './styles.css'

export default function GrantAccessModal({show, onHide}) {
  const { resource, setResource, handleUpdateResource } = useContext(ChurchContext)
  const [isLeader, setIsLeader] = useState(false)

  const grantAccess = (accessParams) => {
    grantUserAccess(resource.id, accessParams)
      .then(({data}) => {
        handleUpdateResource(data)
        setResource({})
        onHide()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleHide = () => {
    setResource({})
    onHide()
  }

  return (
    <Modal show={show} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Conceder acesso</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className='description'>Ao clicar em Confirmar você irá conceder acesso ao sistema para o usuário <b>{resource.name}</b>. Selecione se deseja que o usuário seja administrador do sistema: </p>
        <div className='checkboxGrantAccess'>
          <Checkbox id="isLeader" checked={isLeader} handleToggle={() => setIsLeader(!isLeader)}/>
          <label for="isLeader">Este usuário é administrador do sistema?</label>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={() => grantAccess({is_leader: isLeader})}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}
