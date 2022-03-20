import React, { useContext } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { ChurchContext } from '../../context/ChurchContext'
import { revokeUserAccess } from '../../services/Api.service'

export default function RevokeAccessModal({show, onHide}) {
  const { resource, setResource, handleUpdateResource } = useContext(ChurchContext)

  const revokeAccess = () => {
    revokeUserAccess(resource.id)
      .then(({data}) => {
        handleUpdateResource(data)
        setResource({})
        onHide()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Revogar acesso</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className='description'>Você tem certeza? Ao clicar em Confirmar, o usuário perderá completamente o acesso ao sistema, mas seu registro não será apagado da tabela de membros da igreja.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={revokeAccess}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}
