import React, { useEffect, useState } from 'react'
import ResourcesAccordion from 'modules/AccordionTable'
import { useChurchContext } from 'context/ChurchContext'
import {
  GeneralLayout,
  Header,
  Item,
  ItemHeader,
  ItemTitle,
  AccordionRow,
  LoadingWrapper
} from './Cults.styles'
import IconButton from 'atomics/IconButton'
import getFormattedTimestamp from 'utils/getFormattedTimestamp'
import Button from 'atomics/Button'
import CultModal from 'modules/CultModal'
import { getChurchCults } from 'services/Api.service'
import Loading from 'atomics/Loading'
import { showModal, showToast } from 'global'

export default function ChurchCults () {
  const { church } = useChurchContext()
  const [isLoading, setLoading] = useState([])
  const [cults, setCults] = useState([])

  useEffect(() => {
    if (!church) return
    getChurchCults(church.id)
      .then(({ data }) => setCults(data))
      .catch(() => showToast('negative', 'Ops, algo deu errado em nosso servidor.'))
      .finally(() => setLoading(false))
  }, [church])

  const CardHeader = ({resource}) => (
    <ItemHeader>
      <ItemTitle>{resource.title}</ItemTitle>
      <Button theme='primary' title='Abrir' onClick={() => console.log('abrir ' + resource.title)}/>
    </ItemHeader>
  )

  const CardBody = ({resource}) => (
    <AccordionRow displayGrid>
      <p>Pastor responsável: <b>{resource.pastor.name}</b></p>
      <p>Horário: <b>{getFormattedTimestamp(resource.date_of)}</b></p>
      <p><b>{resource.proselytes.length}</b> convertidos</p>
    </AccordionRow>
  )

  return (
    <GeneralLayout>
      <Item>
        <Header>
          <span/>
          <div>
            <IconButton
              theme='primary'
              icon="fa-solid fa-filter"
              onClick={() => {}}
            />
            <IconButton
              theme='primary'
              icon="fa-solid fa-square-plus"
              onClick={() => showModal(CultModal)}
            />
          </div>
        </Header>
        {isLoading ?
          <LoadingWrapper>
            <Loading size='md' theme='primary'/>
          </LoadingWrapper>
        :
        <ResourcesAccordion
          resources={cults}
          resourceName="Cultos"
          CardHeader={CardHeader}
          CardBody={CardBody}
          getBodyHeight={() => 52}
          // getMenuConfigs={getMenuConfigs}
          // hasMenu
        />
      }
    </Item>
    </GeneralLayout>
  )
}
