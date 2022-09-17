import React, { useRef, useState } from 'react'
import Modal from '../../atomics/Modal'
import Button from '../../atomics/Button'
import { Footer, Header, HeaderTitle } from '../../atomics/Modal/styles'
import { useChurchContext } from '../../context/ChurchContext'
import { Container, Description } from './styles'
import TextInput from '../../atomics/TextInput'
import { closeModal } from 'global'

export default function ProselyteFormModal ({ resource }) {
  const { createProselyte, updateProselyte } = useChurchContext()

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
      Header={
        <Header>
          <HeaderTitle>{resource ? "Editar um convertido" : "Criar um novo convertido"}</HeaderTitle>
        </Header>
      }
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
