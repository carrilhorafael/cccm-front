import React from 'react'
import getFormattedDate from '../../../actions/getFormattedDate'
import getFormattedTimestamp from '../../../actions/getFormattedTimestamp'

export function CardHeader ({ resource }) {
  return (
    <>
      <div>
        <p className='name'>{resource.name}</p>
        {resource.is_leader && <p className='isLeader'>Administrador</p>}
      </div>
      <p>Membro desde {getFormattedDate(resource.member_since)}</p>
    </>
  )
}

export function CardBody ({ resource }) {
  return (
    <>
      <div className="accordionRow">
        <p>{resource.title}</p>
        <p>Estado civil: {resource.marital_status}</p>
        <p>{resource.is_baptized ? "Batizado(a)" : "Não batizado(a)"}</p>
        <p>Nascimento: {getFormattedDate(resource.birthdate)} ({resource.age} anos)</p>
      </div>

      <div className="accordionRow">
        <p>Endereço: {resource.location}</p>
      </div>

      <div className="accordionRow">
        {resource.has_access ?
          <>
            <p className='has-access'>Tem acesso ao sistema</p>
            <div>
              <p>Acesso{resource.is_leader ? " de administrador": ""} garatido por {resource.access_garantied_by} em {getFormattedTimestamp(resource.access_garantied_at)}</p>
              {resource.last_time_logged_at && (<p>Ultimo acesso em {(resource.last_time_logged_at)}</p>) }
            </div>
          </>
          :
          <p className='no-access'>Não tem acesso ao sistema</p>
        }
      </div>
    </>
  )
}
