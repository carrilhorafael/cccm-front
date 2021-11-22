
import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function TitheModal({show, onHide}) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Cadastrar dizimo</Modal.Title>
      </Modal.Header>

      <Modal.Body>
          <fieldset>
            <label htmlFor="money">Valor: </label>
            <input />
          </fieldset>

          <fieldset>
            <label htmlFor="year">Ano: </label>
            <select>
              <option>2019</option>
              <option>2020</option>
              <option>2021</option>
            </select>
          </fieldset>

          <fieldset>
            <label htmlFor="month">Mês: </label>
            <select>
              <option>Janeiro</option>
              <option>Fevereiro</option>
              <option>Março</option>
            </select>
          </fieldset>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="success">Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}
