import React, { useContext, useEffect, useState } from 'react'
import Button from '../../atomics/Button'
import { ChurchContext } from '../../context/ChurchContext'
import IconButton from '../../atomics/IconButton'
import MinisteryModal from '../../modules/MinisteryModal'
import { ActionWrapper, Card, Description, Header, List, LoadingWrapper, Title } from './styles'
import { getChurchMinisteries } from '../../services/Api.service'
import Loading from '../../atomics/Loading'
import { showModal, showToast } from 'global'

export default function ChurchMinisteriesPage () {
  const { church, destroyMinistery } = useContext(ChurchContext)

  const [ministeries, setMinisteries] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (!church) return
    getChurchMinisteries(church.id)
      .then(({ data }) => setMinisteries(data))
      .catch(() => showToast('negative', 'Ops, algo deu errado em nosso servidor.'))
      .finally(() => setLoading(false))
  }, [church])

  return (
    <>
      <Header>
          <Button theme="primary" onClick={() => showModal(MinisteryModal)} title='Criar um ministério' />
      </Header>
      {isLoading ?
        <LoadingWrapper>
          <Loading size='md' theme='primary'/>
        </LoadingWrapper>
        :
        <List>
          {ministeries.map((ministery) => (
            <Card>
              <ActionWrapper>
                <IconButton theme='primary' icon="fa-solid fa-pen" onClick={() => showModal(MinisteryModal, {resource: ministery})}/>
                <IconButton theme='negative' icon="fa-solid fa-trash" onClick={() => destroyMinistery(ministery.id)}/>
              </ActionWrapper>
              <Title>{ministery.name}</Title>
              <Description>{ministery.description}</Description>
            </Card>
          ))}
        </List>
      }
    </>
  )
}
