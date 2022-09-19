import React, { useState } from 'react'
import Button from 'atomics/Button'
import Modal from 'atomics/Modal'
import { Footer, Header, HeaderTitle } from 'atomics/Modal/styles'
import TextInput from 'atomics/TextInput'
import { Container, Description } from './DeleteChurchModal.styles'


export default function DeleteChurchModal({resource, onConfirm}) {
  const [name, setName] = useState("")

  const onDelete = async () => {
    await onConfirm()
    setName("")
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
            onClick={onDelete}
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
