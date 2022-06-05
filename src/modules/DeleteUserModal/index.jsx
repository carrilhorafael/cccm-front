import React from 'react'
import Modal from '../../atomics/Modal'
import Button from '../../atomics/Button'
import { useChurchContext } from '../../context/ChurchContext'
import { Footer } from '../../atomics/Modal/styles'
import { useOverlayContext } from '../../context/OverlayContext'
import { Container, Description } from './styles'

export default function DeleteUserModal({ user }) {
  const { destroyUser } = useChurchContext()
  const { closeModal } = useOverlayContext()

  const onConfirm = async () => {
    await destroyUser(user.id)
    closeModal()
  }

  return (
    <Modal
      title='Excluir usuário'
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
