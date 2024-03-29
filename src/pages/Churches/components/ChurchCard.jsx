import React from 'react'
import Button from 'atomics/Button'
import IconButton from 'atomics/IconButton'
import { ButtonWrapper, ChurchCardContainer } from '../Churches.styles'

export default function ChurchCard ({church, onNavigate, onEditClick, onDeleteClick}) {
  // const getLeadersNames = () => {
  //   return "Ronaldo, Jorge"
  // }

  return (
    <ChurchCardContainer>
      <ButtonWrapper>
        <IconButton theme='primary' icon="fa-solid fa-pen" onClick={onEditClick}/>
        <IconButton theme='negative' icon="fa-solid fa-trash" onClick={onDeleteClick}/>
      </ButtonWrapper>
      <h2>{church.name}</h2>
      <p>{church.users_count} membro{church.users_count === 1 ? '' : 's'}</p>
      <p>{church.ministeries_count} ministério{church.ministeries_count === 1 ? '' : 's'}</p>
      <Button theme='secondary' onClick={onNavigate} title='Ver mais'/>
    </ChurchCardContainer>
  )

}
