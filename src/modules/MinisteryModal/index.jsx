import React, { useState } from 'react'
import Button from '../../atomics/Button'
import { useChurchContext } from '../../context/ChurchContext'
import Modal from '../../atomics/Modal'
import { Footer, Header, HeaderTitle } from '../../atomics/Modal/styles'
import { useOverlayContext } from '../../context/OverlayContext'
import TextInput from '../../atomics/TextInput'
import { Container } from './styles'

export default function MinisteryModal({ resource }) {
  const { createMinistery, updateMinistery } = useChurchContext()
  const { closeModal, fireToast } = useOverlayContext()
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

    if (resource) {
      updateMinistery(resource.id, ministeryParams)
      .then(() => closeModal())
      .catch(({response}) => {
        if (response.status > 500) {
          fireToast('negative', 'Ops, algo deu errado em nosso servidor.')
        }
        else {
          setErrors(response.data)
        }
      })
    }
    else {
      createMinistery(ministeryParams)
      .then(() => closeModal())
      .catch(({response}) => {
        console.log(response)
        if (response.status >= 500) {
          fireToast('negative', 'Ops, algo deu errado em nosso servidor.')
        }
        else {
          setErrors(response.data)
        }
      })
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
