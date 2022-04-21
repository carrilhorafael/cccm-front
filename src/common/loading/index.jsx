import React from 'react'
import { Spinner } from 'react-bootstrap'
import './styles.css'

export default function Loading({ message }) {
  return (
    <div className='absoluteLoadingBackground'>
      <div className='spinnerDiv'>
        <Spinner animation='grow' variant='light' size='sm'/>
        <Spinner animation='grow' variant='light' size='sm'/>
        <Spinner animation='grow' variant='light' size='sm'/>
      </div>
      {!!message && (
          <div className='infoDiv'>
            <p>{message}</p>
          </div>
        )
      }
    </div>
  )
}
