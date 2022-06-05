import React, { useState } from 'react'
import Button from '../../atomics/Button'
import { useChurchContext } from '../../context/ChurchContext'
import Modal from '../../atomics/Modal'
import { Footer } from '../../atomics/Modal/styles'
import { useOverlayContext } from '../../context/OverlayContext'
import TextInput from '../../atomics/TextInput'
import { Container } from './styles'

export default function MinisteryModal({ resource }) {
  const { createMinistery, updateMinistery } = useChurchContext()
  const { closeModal } = useOverlayContext()
  const [name, setName] = useState(resource && resource.name)
  const [description, setDescription] = useState(resource && resource.description)

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
          <Button
            theme="primary"
            onClick={handleSubmit}
            title='Confirmar'
            disabled={!name || !description}
          />
        </Footer>
      }
    >
      <Container>
        <TextInput
          label='Nome do ministério:'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label='Descrição do ministério:'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Container>
    </Modal>
  )
}
