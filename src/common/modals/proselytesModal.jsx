import React, { useContext, useEffect, useState, useRef } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap'
import getFormattedDate from '../../actions/getFormattedDate'
import { ChurchesContext } from '../../context/ChurchesContext'
import ResourcesAccordion from '../accordionTable'
import IconButton from '../iconButton'

function CardBody ({ resource }) {
  return (
    <div className="accordionRowProselyte">
      <p>{resource.name}</p>
      <p>Telefone: {resource.phone}</p>
      <p>Convertido em: {getFormattedDate(resource.proselytized_at)}</p>
    </div>
  )
}

function CardHeader ({ resource }) {
  return (
    <p className='name'>{resource.name}</p>
  )
}

export default function ProselyteModal ({ show, onHide }) {
  const { church, proselytes, getProselytes } = useContext(ChurchesContext)
  const [loading, setLoading] = useState(false)
  const [showCreateProselyte, setShowCreateProselyte] = useState(false)

  const name = useRef(null)
  const phone = useRef(null)
  const proselyted_at = useRef(null)

  useEffect(() => {
    setLoading(true)
    getProselytes(church.id)
    setTimeout(() => {
      setLoading(false)
    }, 500);
  }, [])

  const getMenuConfigs = (resource) => {
    return [
      {
        icon: "fa-solid fa-user-plus",
        title: "Tornar membro",
        onClick: () => {
          console.log('criar usuário')
        }
      },
      {
        icon: "fa-solid fa-trash",
        title: "Apagar",
        isDanger: true,
        onClick: () => {
          console.log('apagar')
        }
      }
    ]
  }

  return (
    <Modal size="xl" show={show} onHide={onHide} >
      <Modal.Header closeButton>
        <Modal.Title>Novos convertidos</Modal.Title>
        <IconButton icon={`fa-solid ${showCreateProselyte ? 'fa-xmark' : 'fa-user-plus'}`} onClick={() => setShowCreateProselyte(!showCreateProselyte)}/>
      </Modal.Header>

      <Modal.Body>
        <>
          {loading ?
            <Spinner animation='border' />
          :
            <div className='mainModalProselyte'>
              {showCreateProselyte &&
                <div className='addProselyteForm'>
                  <fieldset>
                    <label>Nome:</label>
                    <input ref={name}/>
                  </fieldset>
                  <fieldset>
                    <label>Telefone:</label>
                    <input ref={name}/>
                  </fieldset>
                  <fieldset>
                    <label>Convertido em:</label>
                    <input ref={name}/>
                  </fieldset>
                </div>
              }
              <ResourcesAccordion
                resources={proselytes}
                resourceName=""
                CardBody={CardBody}
                CardHeader={CardHeader}
                getMenuConfigs={getMenuConfigs}
                hasMenu
                hideSelectPagination
              />
            </div>
          }
        </>
      </Modal.Body>
    </Modal>
  )
}
