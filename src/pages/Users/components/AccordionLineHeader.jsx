import { Icon, ItemHeader, ItemTitle } from "./Accordion.styles";

export default function AccordionLineHeader ({resource}) {
  return (
    <ItemHeader>
      <div>
        <ItemTitle>{resource.name}</ItemTitle>
        {resource.has_access && resource.is_leader && <Icon className="fa-solid fa-star"/>}
      </div>
    </ItemHeader>
  )
}
