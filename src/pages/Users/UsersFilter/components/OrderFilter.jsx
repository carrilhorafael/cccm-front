import { sortOptions } from "../sortOptions";
import { FilterBody, FilterSubtitle, OrderBody } from "../UsersFilter.styles";
import RadioOrder from "./RadioOrder";

export default function OrderFilter({ sortable, onChange }) {
  return (
    <FilterBody>
      <FilterSubtitle>Ordenar tabela por:</FilterSubtitle>

      <OrderBody>
        {sortOptions.map(({ type, label }) => (
          <RadioOrder
            value={sortable}
            type={type}
            label={label}
            onChange={onChange}
          />
        ))}
      </OrderBody>
    </FilterBody>
)
}
