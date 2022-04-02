import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ChurchesContext } from '../../context/ChurchesContext'
import ChurchHeader from '../churchHeader'
import IconButton from '../iconButton'
import './styles.css'

export default function Header () {
  const history = useHistory()
  const { church, setChurch } = useContext(ChurchesContext)
  const { user, authenticated, handleLogout } = useContext(AuthContext)

  return (
    <header>
      <div className='nameContent'>
        <h1>CCCM</h1>
        {authenticated && (
          <div className='buttonsWrapper'>
            {user.president_pastor && <IconButton icon='fa-solid fa-house' onClick={() => {
              setChurch(null)
              history.push("/churches")
            }}/>}
            <IconButton icon='fa-solid fa-right-from-bracket' onClick={handleLogout}/>
          </div>
        )}
      </div>
      {church && <ChurchHeader/>}
    </header>
  )
}
