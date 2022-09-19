import getFormattedDate from "actions/getFormattedDate";
import getFormattedTimestamp from "actions/getFormattedTimestamp";
import { AccessTitle, AccessWrapper, AccordionRow, NoAccessTitle } from "../Accordion.styles";

export default function LineBody ({resource}) {
  const ministeriesTxt = resource.ministeries.map(m => m.name).join(', ')
  return (
  <>
    <AccordionRow displayGrid>
      <p><b>{resource.title}</b></p>
      <p>Gênero: <b>{resource.gender}</b></p>
      <p>Estado civil: <b>{resource.marital_status}</b></p>
      <p><b>{resource.is_baptized ? "Batizado(a)" : "Não batizado(a)"}</b></p>
    </AccordionRow>

    <AccordionRow displayGrid>
      <p>Email: <b>{resource.email}</b></p>
      <p>Telefone: <b>{resource.phone}</b></p>
      <p>Membro desde: <b>{getFormattedDate(resource.member_since)}</b></p>
      <p>Nascimento: <b>{getFormattedDate(resource.birthdate)} ({resource.age} anos)</b></p>
    </AccordionRow>

    {resource.ministeries.length !== 0 && (
      <AccordionRow>
        <p>Participa dos ministérios: <b>{ministeriesTxt}</b></p>
      </AccordionRow>
    )}

    <AccordionRow>
      <p>Endereço: <b>{resource.location}</b></p>
    </AccordionRow>


    {!!resource.notes && (
      <AccordionRow>
        <p>Observações: <b>{resource.notes}</b></p>
      </AccordionRow>
    )}

    <AccordionRow>
      {resource.has_access ?
        <AccessWrapper>
          <AccessTitle>Tem acesso ao sistema</AccessTitle>
          <div>
            <p>Acesso{resource.is_leader ? " de administrador": ""} garatido por {resource.access_garantied_by} em {getFormattedTimestamp(resource.access_garantied_at)}</p>
            {resource.last_time_logged_at && (<p>Ultimo acesso em {getFormattedTimestamp(resource.last_time_logged_at)}</p>) }
          </div>
        </AccessWrapper>
        :
        <NoAccessTitle>Não tem acesso ao sistema</NoAccessTitle>
      }
    </AccordionRow>
  </>
  )
}
