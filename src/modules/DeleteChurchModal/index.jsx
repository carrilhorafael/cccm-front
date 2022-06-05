import React, { useState } from 'react'
import Button from '../../atomics/Button'
import Modal from '../../atomics/Modal'
import { Footer } from '../../atomics/Modal/styles'
import { useOverlayContext } from '../../context/OverlayContext'


export default function DeleteChurchModal({resource, onDelete}) {
  const [name, setName] = useState("")
  const { closeModal } = useOverlayContext()

  const onConfirm = async () => {
    await onDelete()
    setName("")
    closeModal()
  }

  return (
    <Modal
      title="Excluir sede"
      Footer={
        <Footer>
          <Button
            theme="negative"
            onClick={onConfirm}
            disabled={resource && name !== resource.name}
            title='Excluir'
          />
        </Footer>
      }
    >
      <div className='churchManagement'>
        <p className='description'>
          Tem certeza que deseja deletar essa igreja? Todas os usuários e ministérios serão apagados e essa ação <b>não</b> é reversível.
        </p>
        <fieldset>
          <label>Digite o nome da igreja para confirmar: </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        </fieldset>
      </div>
    </Modal>
  )
}
