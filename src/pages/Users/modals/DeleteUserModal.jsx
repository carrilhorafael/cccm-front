import React from 'react'
import Modal from 'atomics/Modal'
import Button from 'atomics/Button'
import { useChurchContext } from 'context/ChurchContext'
import { Footer, Header, HeaderTitle } from 'atomics/Modal/styles'
import { Container, Description } from './Modal.styles'
import { closeModal } from 'global'

export default function DeleteUserModal({ user }) {
  const { destroyUser } = useChurchContext()

  const onConfirm = async () => {
    await destroyUser(user.id)
    closeModal()
  }

  return (
    <Modal
      Header={
        <Header>
          <HeaderTitle>Excluir usuário</HeaderTitle>
        </Header>
      }
      Footer={
        <Footer>
          <Button
            theme='negative'
            title='Excluir'
            onClick={onConfirm}
          />
        </Footer>
      }
    >
      <Container>
        <Description>
          Tem certeza que deseja deletar o membro? Essa ação <b>não</b> é reversível.
        </Description>
      </Container>
    </Modal>
  )
}