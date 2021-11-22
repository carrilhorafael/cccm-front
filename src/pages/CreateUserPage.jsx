import React from 'react'
import FormComponent from '../components/FormComponent'
import Title from '../components/Title'
import '../styles/create_user.css'

export default function CreateUserPage () {
  const handleSubmit = (userData) => {
    console.log(userData)
  }

  return(
    <main>
      <Title text="Criar um novo membro" />
      <FormComponent handleSubmit={handleSubmit}/>
    </main>
  )
}
