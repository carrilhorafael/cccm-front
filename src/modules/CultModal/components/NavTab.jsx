import React from 'react'
import { NavItem, TabWrapper } from '../styles'

export function NavTab ({ tabs }) {

  return (
    <TabWrapper>
      {tabs.map((tab) => (
        <NavItem active={tab.active} onClick={() => tab.onNavigate()}>{tab.label}</NavItem>
      ))}
    </TabWrapper>
  )
}
