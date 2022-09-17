import styled from 'styled-components'
import colors from '../../styles/colors'

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  i {
    color: ${colors.blue.base};
  }
`
export const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
`
export const YearWrapper = styled.h2`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`
export const MonthWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`
export const SelectedMonth = styled.div`
  color: 18px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-weight: 800;
`
export const Popover = styled.div`
  border-radius: 8px;
  border: 1px solid ${colors.gray.darkest};
  box-shadow: 1px 1px 1em ${colors.gray.light};
  background: ${colors.gray.lightest};
  padding: 8px 16px;
  width: fit-content;
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 20000;

`
export const DaysWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`

export const CalendarDay = styled.div`
  font-size: 18px;
  color: ${({outMonth}) => outMonth ? `${colors.gray.base}` : `${colors.gray.darkest}`};
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  ${({ selected }) => selected && `
    background: ${colors.blue.light};
    color: ${colors.gray.lightest};
  `}
  &:hover {
    cursor: pointer;
    background: ${colors.blue.lighter};
    color: ${({outMonth}) => outMonth ? `${colors.gray.base}` : `${colors.gray.darkest}`};
  }
`
export const SelectWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 18px;
  font-weight: 800;
  margin-top: 8px;
  color: ${colors.gray.dark};
`
