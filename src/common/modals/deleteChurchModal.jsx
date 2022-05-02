import React, { useContext, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function DeleteChurchModal({resource, show, onDelete, onHide}) {
  const [name, setName] = useState("")

  const onConfirm = async () => {
    await onDelete()
    setName("")
    onHide()
  }

  return (
    <Modal size='lg' show={show} onHide={() => {
      onHide()
      setName("")
    }}>
      <Modal.Header closeButton>
        <Modal.Title>Excluir igreja</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='churchManagement'>
          <p className='description'>
            Tem certeza que deseja deletar essa igreja? Todas os usuários e ministérios serão apagados e essa ação <b>não</b> é reversível.
          </p>
          <fieldset>
            <label>Digite o nome da igreja para confirmar: </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
          </fieldset>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={onConfirm} disabled={resource && name !== resource.name}>Excluir</Button>
      </Modal.Footer>
    </Modal>
  )
}
