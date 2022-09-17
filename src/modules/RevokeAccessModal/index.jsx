import React from 'react'
import Modal from '../../atomics/Modal'
import Button from '../../atomics/Button'
import { Footer, Header, HeaderTitle } from '../../atomics/Modal/styles'
import { useChurchContext } from '../../context/ChurchContext'
import { Container, Description } from './styles'

export default function RevokeAccessModal({user, show, onHide}) {
  const { updateUser } = useChurchContext()

  const handleSubmit = () => updateUser(user.id, { user: { should_have_access: false } })

  return (
    <Modal
      Header={
        <Header>
          <HeaderTitle>Revogar acesso</HeaderTitle>
        </Header>
      }
      Footer={
        <Footer>
          <Button
            theme="negative"
            onClick={handleSubmit}
            title='Excluir'
          />
        </Footer>
      }
    >
      <Container>
        <Description>
          Você tem certeza? Ao clicar em Confirmar, o usuário perderá completamente o acesso ao sistema, mas seu registro não será apagado da tabela de membros da igreja.
        </Description>
      </Container>
    </Modal>
  )
}
