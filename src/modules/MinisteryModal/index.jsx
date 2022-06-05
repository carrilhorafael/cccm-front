import React, { useContext, useRef } from 'react'
import Button from '../../atomics/Button'
import { ChurchContext } from '../../context/ChurchContext'
import Modal from '../../atomics/Modal'
import { Footer } from '../../atomics/Modal/styles'
import { useOverlayContext } from '../../context/OverlayContext'

export default function MinisteryModal({ resource }) {
  const { createMinistery, updateMinistery } = useContext(ChurchContext)
  const { closeModal } = useOverlayContext()
  const name = useRef()
  const description = useRef()

  const handleSubmit = async () => {
    const ministeryParams = {
      ministery: {
        name: name.current.value,
        description: description.current.value
      }
    }

    if (resource) await updateMinistery(resource.id, ministeryParams)
    else await createMinistery(ministeryParams)

    closeModal()
  }

  return (
    <Modal
      title={resource ? "Editar um ministério" : "Criar um novo ministério"}
      Footer={
        <Footer>
          <Button theme="primary" onClick={handleSubmit} title='Confirmar'/>
        </Footer>
      }
    >
      <div className='ministeryManagement'>
        <fieldset>
          <label>Nome do ministério: </label>
          <input type="text" ref={name} defaultValue={resource && resource.name}/>
        </fieldset>
        <fieldset>
          <label>Descrição do ministério: </label>
          <textarea ref={description} defaultValue={resource && resource.description}/>
        </fieldset>
      </div>
    </Modal>
  )
}
