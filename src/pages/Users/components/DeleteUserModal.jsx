import React from 'react'
import Modal from 'atomics/Modal'
import Button from 'atomics/Button'
import { Footer, Header, HeaderTitle } from 'atomics/Modal/styles'
import { Container, Description } from './Modal.styles'

export default function DeleteUserModal({ user, onConfirm }) {
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
