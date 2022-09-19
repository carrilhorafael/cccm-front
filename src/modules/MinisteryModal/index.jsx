import React, { useState } from 'react'
import Button from 'atomics/Button'
import { useChurchContext } from 'context/ChurchContext'
import Modal from 'atomics/Modal'
import { Footer, Header, HeaderTitle } from 'atomics/Modal/styles'
import TextInput from 'atomics/TextInput'
import { Container } from './styles'
import { closeModal, showToast } from 'global'

export default function MinisteryModal({ resource }) {
  const { createMinistery, updateMinistery } = useChurchContext()
  const [errors, setErrors] = useState(null)
  const [name, setName] = useState(resource && resource.name)
  const [description, setDescription] = useState(resource && resource.description)

  const handleSubmit = async () => {
    const ministeryParams = {
      ministery: {
        name: name,
        description: description
      }
    }

    try{
      const { data } = resource
        ? await updateMinistery(resource.id, ministeryParams)
        : await createMinistery(ministeryParams)
      console.log(data)
      closeModal()

    } catch ({ response }) {
      if (response.status > 500) {
        showToast('negative', 'Ops, algo deu errado em nosso servidor.')
      }
      else {
        setErrors(response.data)
      }
    }
  }

  return (
    <Modal
      Header={
        <Header>
          <HeaderTitle>{resource ? "Editar um ministério" : "Criar um novo ministério"}</HeaderTitle>
        </Header>
      }
      Footer={
        <Footer>
          <Button
            theme="primary"
            onClick={handleSubmit}
            title='Confirmar'
            disabled={!name || !description}
          />
        </Footer>
      }
    >
      <Container>
        <TextInput
          label='Nome do ministério:'
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors && errors.name && errors.name[0]}
        />
        <TextInput
          label='Descrição do ministério:'
          value={description}
          error={errors && errors.description && errors.description[0]}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Container>
    </Modal>
  )
}
