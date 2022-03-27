import React, { useEffect, useState } from 'react'
import { Accordion, Card, useAccordionButton} from 'react-bootstrap'
import MainMenu from '../mainMenu';
import './styles.css'

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <div onClick={decoratedOnClick} className="cardHeader">
      {children}
    </div>
  );
}

export default function ResourcesAccordion({ resources, resourceName, CardBody, CardHeader, hasMenu, getMenuConfigs }) {
  const [resourcesOnPage, setResourcesOnPage] = useState([])
  const [page, setPage] = useState(0)
  const [resourcesPerPage, setResourcesPerPage] = useState(8)

  useEffect(() => {
    setResourcesOnPage(resources.slice(page * resourcesPerPage, (page + 1) * resourcesPerPage))
  }, [resources, page, resourcesPerPage])

  return (
    <>
      <Accordion defaultActiveKey="0">
        {resourcesOnPage.map(resource => (
          <Card key={resource.id}>
            <Card.Header>
              <CustomToggle eventKey={resource.id}>
                <CardHeader resource={resource}/>
              </CustomToggle>
              {hasMenu && <MainMenu menuConfigs={getMenuConfigs(resource)} />}
            </Card.Header>
            <Accordion.Collapse eventKey={resource.id}>
              <Card.Body>
                <CardBody resource={resource} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
      <div className="pagination">
        <div className="configResourcesPerPage">
          <p>Exibir {resourceName.toLowerCase()}:</p>
          <select onChange={e => setResourcesPerPage(e.target.value)}>
            <option value={8}>8</option>
            <option value={10}>10</option>
            <option value={13}>13</option>
          </select>
        </div>
        <div className="configPage">
          <button onClick={() => setPage( page - 1 )} disabled={ page <= 0}>{"<"}</button>
          <button onClick={() => setPage( page + 1 )} disabled={ page >= (resources.length / resourcesPerPage)-1 }>{">"}</button>
        </div>
      </div>
    </>
  )
}
