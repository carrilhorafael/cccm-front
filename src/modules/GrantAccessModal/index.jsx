import React, { useState } from 'react'
import Modal from '../../atomics/Modal'
import Button from '../../atomics/Button'
import { useChurchContext } from '../../context/ChurchContext'
import Checkbox from '../../atomics/Checkbox'
// import './styles.css'
import { Footer, Header, HeaderTitle } from '../../atomics/Modal/styles'
import { CheckboxWrapper, Container, Description } from './styles'
import { closeModal } from 'global'

export default function GrantAccessModal({ user }) {
  const { updateUser } = useChurchContext()
  const [isLeader, setIsLeader] = useState(false)

  const grantAccess = async () => {
    const accessParams = { user: { should_have_access: true, is_leader: isLeader } }
    await updateUser(user.id, accessParams)
    closeModal()
  }

  return (
    <Modal
      Header={
        <Header>
          <HeaderTitle>Conceder acesso</HeaderTitle>
        </Header>
      }
      Footer={
        <Footer>
          <Button theme="primary" onClick={grantAccess} title='Confirmar'/>
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
