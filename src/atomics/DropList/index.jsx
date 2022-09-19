import React from 'react'
import ClickAwayListener from 'atomics/ClickAwayListener'
import { DropListItem, Paper, Popper } from './styles'

export default function DropList ({opened, onClose, anchorRef, options }) {
  const current = anchorRef.current
  const getTopPosition = () => {
    if (current){
      const attributes = current.getBoundingClientRect()
      return attributes.top + attributes.height + 4
    }
    return 0
  }

  const getLeftPosition = () => {
    if (current){
      const attributes = current.getBoundingClientRect()
      return attributes.left + attributes.width - 300
    }
    return 0
  }

  const execute = (onClick) => {
    onClose()
    onClick()
  }

  const customAwayClickRule = (event) => {
    return !anchorRef || !anchorRef.current.contains(event.target)
  }

  if (opened){
    return (
      <ClickAwayListener onClickAway={onClose} customRule={customAwayClickRule}>
        <Popper top={getTopPosition()} left={getLeftPosition()}>
          {options.map((option, idx) =>
            !option.hidden && (
              <DropListItem key={idx} danger={option.isDanger} hasIcon={option.hasIcon} onClick={() => execute(option.onClick)}>
                {option.hasIcon && (<i className={option.icon}/>)}
                {option.title}
              </DropListItem>
            )
            )}
        </Popper>
      </ClickAwayListener>
    )
  }
  return null
}
