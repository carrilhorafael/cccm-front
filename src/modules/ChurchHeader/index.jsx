import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useChurchContext } from '../../context/ChurchContext'
import { Link, Nav, Title, Wrapper } from './styles'

export default function ChurchHeader ({churchProvided}) {
  const { church } = useChurchContext()
  const history = useHistory()
  const location = useLocation()

  const goToPage = (pathname) => {
    history.push(`${pathname}`)
  }

  return (
    <Wrapper>
      <Title>{church && church.name}</Title>
      <Nav>
        <Link
          className={`link ${location.pathname === '/church/general' && 'active'}`}
          onClick={() => goToPage('/church/general')}>
            Visão geral
        </Link>
        <Link
          className={`link ${location.pathname === '/church/users' && 'active'}`}
          onClick={() => goToPage('/church/users')}>
            Membros
        </Link>
        <Link
          className={`link ${location.pathname === '/church/ministeries' && 'active'}`}
          onClick={() => goToPage('/church/ministeries')}>
            Ministérios
        </Link>
        <Link
          className={`link ${location.pathname === '/church/cults' && 'active'}`}
          onClick={() => goToPage('/church/cults')}>
            Cultos
        </Link>
      </Nav>
    </Wrapper>
  )
}
