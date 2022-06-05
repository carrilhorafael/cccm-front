import React, { useRef } from 'react'
import Button from '../../atomics/Button'
import Modal from '../../atomics/Modal'
import { Footer } from '../../atomics/Modal/styles'
import { useOverlayContext } from '../../context/OverlayContext'

export default function ChurchModal({resource, onUpdate, onCreate}) {
  const { closeModal } = useOverlayContext()

  const name = useRef()
  const location = useRef()

  const handleSubmit = async () => {
    const churchParams = {
      church: {
        name: name.current.value,
        location: location.current.value
      }
    }

    if (resource) await onUpdate(churchParams)
    else await onCreate(churchParams)

    closeModal()
  }

  return (
    <Modal
      title={resource ? "Editar uma sede" : "Criar uma nova sede"}
      Footer={
        <Footer>
          <Button theme="primary" onClick={handleSubmit} title='Confirmar'/>
        </Footer>
      }
    >
        <div className='churchManagement'>
          <fieldset>
            <label>Nome da sede: </label>
            <input type="text" ref={name} defaultValue={resource && resource.name}/>
          </fieldset>
          <fieldset>
            <label>Endereço da nova sede: </label>
            <textarea ref={location} defaultValue={resource && resource.location}/>
          </fieldset>
        </div>

    </Modal>
  )
}
