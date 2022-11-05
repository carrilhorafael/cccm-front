import React, { useState } from 'react'
import Modal from 'atomics/Modal'
import Button from 'atomics/Button'
import MultiSelect from 'atomics/MultiSelect'
import { Footer, Header, HeaderTitle } from 'atomics/Modal/styles'
import { Container, Description, LoadingWrapper } from './Modal.styles'
import useChurchMinisteries from 'pages/Users/hooks/useChurchMinisteries'
import Loading from 'atomics/Loading'

export default function MinisteriesAssignModal ({ user, onConfirm }) {
  const { ministeries, loading } = useChurchMinisteries()

  const [ministeriesIds, setMinisteriesIds] = useState(user.ministeries.map(ministery => ministery.id))
  const onChangeMinisteries = ministeryId => {
    if (ministeriesIds.includes(ministeryId))
      setMinisteriesIds(ministeriesIds.filter(ministeriesIds => ministeriesIds !== ministeryId))
    else
      setMinisteriesIds([...ministeriesIds, ministeryId])
  }

  const assignMinisteries = () => {
    onConfirm({ user: { ministeries_ids: ministeriesIds } })
  }

  return (
    <Modal
      size='sm'
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
        {loading ?
          <LoadingWrapper>
            <Loading size='md' theme='primary' />
          </LoadingWrapper>
        :
        <>
          <Description>
            Adicione o membro <b>{user.name}</b> em seus ministérios:
          </Description>
          <MultiSelect
            label="Selecione os ministérios:"
            initialOptions={ministeries.map(ministery => ({ label: ministery.name, value: ministery.id }))}
            initialValues={ministeriesIds}
            clearValues={() => setMinisteriesIds([])}
            onChange={onChangeMinisteries}
          />
        </>
      }
      </Container>
    </Modal>
  )
}
