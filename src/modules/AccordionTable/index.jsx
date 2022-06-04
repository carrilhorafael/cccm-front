import React, { useEffect, useState } from 'react'
import { AccordionItem } from './components/AccordionItem';
import {
  PaginationPage,
  PaginationResourcesConfig,
  PaginationWrapper,
  Accordion
} from './styles';
export default function ResourcesAccordion({ resources, resourceName, CardHeader, CardBody, getMenuConfigs, getBodyHeight, hasMenu}) {
  const [resourcesOnPage, setResourcesOnPage] = useState([])
  const [page, setPage] = useState(0)
  const [resourcesPerPage, setResourcesPerPage] = useState(8)

  useEffect(() => {
    setResourcesOnPage(resources.slice(page * resourcesPerPage, (page + 1) * resourcesPerPage))
  }, [resources, page, resourcesPerPage])

  return (
    <>
      <Accordion>
        {resourcesOnPage.map(resource => (
          <AccordionItem
            resource={resource}
            CardHeader={CardHeader}
            CardBody={CardBody}
            getMenuConfigs={getMenuConfigs}
            getBodyHeight={getBodyHeight}
            hasMenu={hasMenu}
          />
        ))}
      </Accordion>
      <PaginationWrapper>
        <PaginationResourcesConfig>
          <p>Exibir {resourceName.toLowerCase()}:</p>
          <select onChange={e => setResourcesPerPage(e.target.value)}>
            <option value={8}>8</option>
            <option value={10}>10</option>
            <option value={13}>13</option>
          </select>
        </PaginationResourcesConfig>
        <PaginationPage>
          <button onClick={() => setPage( page - 1 )} disabled={ page <= 0}>{"<"}</button>
          <button onClick={() => setPage( page + 1 )} disabled={ page >= (resources.length / resourcesPerPage)-1 }>{">"}</button>
        </PaginationPage>
      </PaginationWrapper>
    </>
  )
}
