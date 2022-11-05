import React from 'react'
import Modal from 'atomics/Modal'
import Button from 'atomics/Button'
import { Footer, Header, HeaderTitle } from 'atomics/Modal/styles'
import { Container, Description } from './Modal.styles'

export default function RevokeAccessModal({ user, onConfirm }) {
  return (
    <Modal
      size='sm'
      Header={
        <Header>
          <HeaderTitle>Revogar acesso</HeaderTitle>
        </Header>
      }
      Footer={
        <Footer>
          <Button
            theme="negative"
            onClick={() => onConfirm({ user: { should_have_access: false } })}
            title='Excluir'
          />
        </Footer>
      }
    >
      <Container>
        <Description>
          Você tem certeza? Ao clicar em Confirmar, o usuário <b>{user.name}</b> perderá completamente o acesso ao sistema, mas seu registro não será apagado da tabela de membros da igreja.
        </Description>
      </Container>
    </Modal>
  )
}
