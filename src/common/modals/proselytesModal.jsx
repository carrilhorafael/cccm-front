import React, { useContext, useState } from 'react'
import { Modal } from 'react-bootstrap'
import getFormattedDate from '../../actions/getFormattedDate'
import { ChurchContext } from '../../context/ChurchContext'
import ResourcesAccordion from '../AccordionTable'

function CardBody({resource}){
  return (
    <div className="accordionRow">
      <p>{resource.name}</p>
      <p>Telefone: {resource.phone}</p>
      <p>Data de conversão: {getFormattedDate(resource.proselytized_at)}</p>
    </div>
  )
}

function CardHeader({resource}){
  return <p className='name'>{resource.name}</p>
}

export default function ProselytesModal ({ show, onHide, openEditModal }) {
  const { proselytes, destroyProselyte } = useContext(ChurchContext)

  const getMenuConfigs = (resource) => {
    return [
      {
        icon: "fa-solid fa-user-pen",
        title: "Editar convertido",
        hasIcon: true,
        onClick: () => openEditModal(resource)
      },
      {
        icon: "fa-solid fa-trash",
        title: "Deletar convertido",
        isDanger: true,
        hasIcon: true,
        onClick: () => destroyProselyte(resource.id)
      }
    ]
  }

  return (
    <Modal size="xl" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Novos convertidos</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* <ResourcesAccordion
          resources={proselytes}
          resourceName="Convertidos"
          getMenuConfigs={getMenuConfigs}
          hasMenu
        /> */}
      </Modal.Body>
    </Modal>
  )
}
