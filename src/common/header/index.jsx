import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import ChurchHeader from '../churchHeader'
import IconButton from '../iconButton'
import './styles.css'

export default function Header ({churchProvided, resetChurchProvided}) {
  const location = useLocation()
  const history = useHistory()
  const { user, authenticated, handleLogout } = useContext(AuthContext)

  const onClick = () => {
    resetChurchProvided()
    history.push('/churches')
  }

  return (
    <header>
      <div className='nameContent'>
        <h1>CCCM</h1>
        {authenticated && churchProvided && (
          <div className='buttonsWrapper'>
            {user.president_pastor && churchProvided && <IconButton icon='fa-solid fa-house' onClick={onClick}/>}
            <IconButton icon='fa-solid fa-right-from-bracket' onClick={handleLogout}/>
          </div>
        )}
      </div>
      {location.pathname !== '/churches' && authenticated && churchProvided && <ChurchHeader churchProvided={churchProvided}/>}
    </header>
  )
}
