import React, { useEffect, useState } from 'react'
import Button from 'atomics/Button'
// import { EditInline } from 'atomics/EditInline'
import Modal from 'atomics/Modal'
import { Footer, Header, HeaderTitle } from 'atomics/Modal/styles'
import { NavTab } from './components/NavTab'
import { Wrapper } from './styles'
import Description from './tabs/Description'
import { Info } from './tabs/Info'

export default function CultModal ({ resource }) {
  const [name, setName] = useState('Teste 123')

  const [tabs, setTabs] = useState([])

  // useEffect(() => {
  //   navigateTo(0)

  // })

  // const navigateTo = (index) => {
  //   let newTabs = [
  //     {
  //       label: 'Informações',
  //       active: false,
  //       onNavigate: () => navigateTo(0)
  //     },
  //     {
  //       label: 'Descrição',
  //       active: false,
  //       onNavigate: () => navigateTo(1)
  //     },
  //     {
  //       label: 'Convertidos',
  //       active: false,
  //       onNavigate: () => navigateTo(2)
  //     }
  //   ]

  //   newTabs[index].active = true
  //   setTabs(newTabs)
  // }

  return (
    <Modal
      size='extraLarge'
      Header={
        <Header>
          <HeaderTitle>Criar novo culto</HeaderTitle>
        </Header>
      }
    >
      <Wrapper>
        <Info />
        <Description/>
      </Wrapper>
    </Modal>
  )
}
