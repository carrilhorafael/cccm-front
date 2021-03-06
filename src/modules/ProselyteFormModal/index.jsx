import React, { useRef, useState } from 'react'
import Modal from '../../atomics/Modal'
import Button from '../../atomics/Button'
import { Footer } from '../../atomics/Modal/styles'
import { useChurchContext } from '../../context/ChurchContext'
import { useOverlayContext } from '../../context/OverlayContext'
import { Container } from './styles'
import TextInput from '../../atomics/TextInput'
import { Description } from '../DeleteChurchModal/styles'

export default function ProselyteFormModal ({ resource }) {
  const { createProselyte, updateProselyte } = useChurchContext()
  const { closeModal } = useOverlayContext()

  const [name, setName] = useState(resource && resource.name)
  const [phone, setPhone] = useState(resource && resource.phone)

  const handleSubmit = async () => {
    const proselyteData = {
      proselyte: {
        name: name,
        phone: phone,
      }
    }
    if (resource) await updateProselyte(resource.id, proselyteData)
    else await createProselyte(proselyteData)

    closeModal()
  }

  return (
    <Modal
      title={resource ? "Editar um convertido" : "Criar um novo convertido"}
      Footer={
        <Footer>
          <Button
            theme="primary"
            onClick={handleSubmit}
            title='Confirmar'
            disabled={!(name && phone)}
          />
        </Footer>
      }
    >
      <Container>
        <Description>Digite as informações do novo convertido</Description>
        <TextInput
          label='Nome:'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label='Telefone:'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Container>
    </Modal>
  )
}
