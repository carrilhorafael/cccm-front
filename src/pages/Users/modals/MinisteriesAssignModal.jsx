import React, { useState } from 'react'
import Modal from 'atomics/Modal'
import Button from 'atomics/Button'
import { useChurchContext } from 'context/ChurchContext'
import MultiSelect from 'atomics/MultiSelect'
import { Footer, Header, HeaderTitle } from 'atomics/Modal/styles'
import { Container, Description } from './Modal.styles'
import { closeModal } from 'global'


export default function MinisteriesAssignModal ({ user, onConfirm }) {
  const { ministeries } = useChurchContext()
  const ministeriesItems = ministeries.map(ministery => ({ label: ministery.name, value: ministery.id }))

  const [ministeriesIds, setMinisteriesIds] = useState([])
  const onChangeMinisteries = ministeryId => {
    if (ministeriesIds.includes(ministeryId))
      setMinisteriesIds(ministeriesIds.filter(ministeriesIds => ministeriesIds !== ministeryId))
    else
      setMinisteriesIds([...ministeriesIds, ministeryId])
  }

  const assignMinisteries = () => {
    onConfirm()
    closeModal()
  }

  return (
    <Modal
      Header={
        <Header>
          <HeaderTitle>Alocar membro em ministério</HeaderTitle>
        </Header>
      }
      Footer={
        <Footer>
          <Button theme="primary" onClick={assignMinisteries} title='Confirmar'/>
        </Footer>
      }
    >
      <Container>
        <Description>
          Adicione o membro <b>{user.name}</b> em seus ministérios:
        </Description>
        <MultiSelect label="Selecione os ministérios:" initialOptions={ministeriesItems} clearValues={() => setMinisteriesIds([])} onChange={onChangeMinisteries}/>
      </Container>
    </Modal>
  )
}
