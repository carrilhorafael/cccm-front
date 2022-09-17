import React, { useState } from 'react'
import Button from '../../atomics/Button'
import Modal from '../../atomics/Modal'
import { Footer, Header, HeaderTitle } from '../../atomics/Modal/styles'
import Textarea from '../../atomics/Textarea'
import TextInput from '../../atomics/TextInput'
import { useOverlayContext } from '../../context/OverlayContext'
import { Container } from './styles'

export default function ChurchModal({resource, onUpdate, onCreate}) {
  const { closeModal } = useOverlayContext()
  const [name, setName] = useState(resource && resource.name)
  const [location, setLocation] = useState(resource && resource.location)


  const handleSubmit = async () => {
    const churchParams = {
      church: {
        name: name,
        location: location
      }
    }

    if (resource) await onUpdate(churchParams)
    else await onCreate(churchParams)

    closeModal()
  }

  return (
    <Modal
      Header={
        <Header>
          <HeaderTitle>{resource ? "Editar uma sede" : "Criar uma nova sede"}</HeaderTitle>
        </Header>
      }
      Footer={
        <Footer>
          <Button theme="primary" onClick={handleSubmit} title='Confirmar'/>
        </Footer>
      }
    >
        <Container>
          <TextInput
            label='Nome da sede:'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            label='Endereço da sede:'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Container>

    </Modal>
  )
}
