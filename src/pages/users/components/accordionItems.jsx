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
  const getUserMinisteries = () => {
    return resource.ministeries.map(m => m.name).join(', ')
  }

  return (
    <>
      <div className="accordionRow">
        <p>{resource.title}</p>
        <p>Gênero: {resource.gender}</p>
        <p>Estado civil: {resource.marital_status}</p>
        <p>{resource.is_baptized ? "Batizado(a)" : "Não batizado(a)"}</p>
      </div>

      <div className="accordionRow">
        <p>Email: {resource.email}</p>
        <p>Telefone: {resource.phone}</p>
        <p>Nascimento: {getFormattedDate(resource.birthdate)} ({resource.age} anos)</p>
      </div>

      {resource.ministeries.length !== 0 && (
        <div className="accordionRow">
          <p>Participa dos ministérios: {getUserMinisteries()}</p>
        </div>
      )}

      <div className="accordionRow">
        <p>Endereço: {resource.location}</p>
      </div>

      {!!resource.notes && (
        <div className="accordionRow">
          <p>Observações: {resource.notes}</p>
        </div>
      )}

      <div className="accordionRow">
        {resource.has_access ?
          <>
            <p className='has-access'>Tem acesso ao sistema</p>
            <div>
              <p>Acesso{resource.is_leader ? " de administrador": ""} garatido por {resource.access_garantied_by} em {getFormattedTimestamp(resource.access_garantied_at)}</p>
              {resource.last_time_logged_at && (<p>Ultimo acesso em {getFormattedTimestamp(resource.last_time_logged_at)}</p>) }
            </div>
          </>
          :
          <p className='no-access'>Não tem acesso ao sistema</p>
        }
      </div>
    </>
  )
}
