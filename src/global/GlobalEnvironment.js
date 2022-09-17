import React, { useReducer, useState } from 'react';
import { Toast } from 'atomics/Toast';
import { reducer } from './store';

const GlobalEnvironment = ({ children }) => {
  const [{ modal, toast }, dispatch] = useReducer(reducer, {
    modal: {},
    toast: {}
  })

  window.dispatch = dispatch

  return (
    <>
      {modal.visible && <modal.Component/>}
      {children}
      {toast.visible && <Toast theme={toast.theme} message={toast.message}/> }
    </>
  )
}

export default GlobalEnvironment
