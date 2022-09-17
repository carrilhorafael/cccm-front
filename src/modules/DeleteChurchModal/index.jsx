import React, { useState } from 'react'
import Button from '../../atomics/Button'
import Modal from '../../atomics/Modal'
import { Footer, Header, HeaderTitle } from '../../atomics/Modal/styles'
import TextInput from '../../atomics/TextInput'
import { useOverlayContext } from '../../context/OverlayContext'
import { Container, Description } from './styles'


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
      Header={
        <Header>
          <HeaderTitle>Excluir sede</HeaderTitle>
        </Header>
      }
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
      <Container>
        <Description>
          Tem certeza que deseja deletar essa igreja? Todas os usuários e ministérios serão apagados e essa ação <b>não</b> é reversível. <br/> Digite o nome da igreja para confirmar:
        </Description>
        <TextInput
          label='Nome da igreja:'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Container>
    </Modal>
  )
}
