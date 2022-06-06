import styled from 'styled-components'
import colors from '../../styles/colors'

export const GradientLayout = styled.div`
  background: linear-gradient(115deg, ${colors.gray.lightest}, ${colors.blue.light}, ${colors.gray.lightest});
  width: 100%;
  height: calc(100vh - 42px);
  display: flex;
  align-items: center;
  justify-content: center;
`
export const ChangePasswordForm = styled.div`
background-color: ${colors.gray.lightest};
width: 100%;
padding: 40px 32px;
border-radius: 30px;
`
export const Container = styled.div`
	width: 100%;
	max-width: 1024px;
	margin: auto;
`
export const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  padding-bottom: 40px;
`
export const Fieldset = styled.div`
  margin-bottom: 16px;
`
export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 32px;
  justify-content: center;
`
