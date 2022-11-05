import React, { useState } from 'react'
import Modal from 'atomics/Modal'
import Button from 'atomics/Button'
import Checkbox from 'atomics/Checkbox'
import { Footer, Header, HeaderTitle } from 'atomics/Modal/styles'
import { CheckboxWrapper, Container, Description } from './Modal.styles'

export default function GrantAccessModal({ user, onConfirm }) {
  const [isLeader, setIsLeader] = useState(false)

  return (
    <Modal
      size='sm'
      Header={
        <Header>
          <HeaderTitle>Conceder acesso</HeaderTitle>
        </Header>
      }
      Footer={
        <Footer>
          <Button
            theme="primary"
            onClick={() => onConfirm({ user: { should_have_access: true, is_leader: isLeader } })}
            title='Confirmar'
          />
        </Footer>
      }
    >
      <Container>
        <Description>
          Ao clicar em Confirmar você irá conceder acesso ao sistema para o usuário <b>{user.name}</b>. Selecione se deseja que o usuário seja administrador do sistema:
        </Description>
        <CheckboxWrapper>
          <Checkbox id="isLeader" checked={isLeader} onChange={() => setIsLeader(!isLeader)}/>
          <label for="isLeader">Este usuário é administrador do sistema?</label>
        </CheckboxWrapper>
      </Container>
    </Modal>
  )
}
