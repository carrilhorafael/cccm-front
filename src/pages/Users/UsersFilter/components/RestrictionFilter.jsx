import { FilterBody, FilterSubtitle } from "../UsersFilter.styles";
import BaptismFilter from "./BaptismFilter";
import MinisteriesFilter from "./MinisteriesFilter";
import NameFilter from "./NameFilter";
import SystemAccessFilter from "./SystemAccessFilter";
import TitleFilter from "./TitleFilter";

export default function RestrictionFilter({ restriction, onCheck, onChange }) {
  return (
    <FilterBody>
      <FilterSubtitle>Filtrar tabela por:</FilterSubtitle>
      <NameFilter
        value={restriction.name}
        onChange={onChange('name')}
        onCheck={onCheck('name')}
      />
      <TitleFilter
        value={restriction.titles}
        onChange={onChange('titles')}
        onCheck={onCheck('titles')}
      />
      <BaptismFilter
        value={restriction.is_baptized}
        onChange={onChange('is_baptized')}
        onCheck={onCheck('is_baptized')}
      />
      <MinisteriesFilter
        value={restriction.ministeries}
        onChange={onChange('ministeries')}
        onCheck={onCheck('ministeries')}
      />
      <SystemAccessFilter
        value={restriction.system_access}
        onCheck={onCheck('system_access')}
      />
    </FilterBody>
  )

}
