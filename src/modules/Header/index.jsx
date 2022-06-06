import React, { useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import ChurchHeader from '../ChurchHeader'
import IconButton from '../../atomics/IconButton'
import { ButtonWrapper, Container, HeaderName, Title } from './styles'
import { useChurchContext } from '../../context/ChurchContext'

export default function Header () {
  const { setChurch } = useChurchContext()
  const location = useLocation()
  const history = useHistory()
  const { user, authenticated, handleLogout } = useContext(AuthContext)

  const onClick = () => {
    setChurch(null)
    history.push('/churches')
  }

  return (
    <Container>
      <HeaderName>
        <Title>CCCM</Title>
        {authenticated && (
          <ButtonWrapper>
            {user.president_pastor && <IconButton theme='secondary' icon='fa-solid fa-grip' onClick={onClick}/>}
            <IconButton theme='primary' icon='fa-solid fa-right-from-bracket' onClick={handleLogout}/>
          </ButtonWrapper>
        )}
      </HeaderName>
      {location.pathname !== '/churches'
        && authenticated
        && <ChurchHeader/>
      }
    </Container>
  )
}
