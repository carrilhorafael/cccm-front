import { RadioFieldset } from "../Header.styles";

export default function RadioOrder ({ type, label, value, onChange }) {

  return (
    <RadioFieldset>
      <input
        type="radio"
        name="orderRadio"
        id={`order_by_${type}`}
        defaultChecked={value === type}
        onClick={() => onChange(type)}
      />
      <label htmlFor={`order_by_${type}`}>{label}</label>
    </RadioFieldset>
  )
}
